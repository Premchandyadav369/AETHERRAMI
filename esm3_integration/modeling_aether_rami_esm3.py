"""
AETHER-RAMI (ESM3 Frontier Edition): PyTorch Foundation Architecture
Sole Author & Architect: V. C. Premchand Yadav | SBST & SCOPE, VIT-AP University
Multimodal ESM3 All-Atom Sequence-Structure-Function Trunk with Coupled SE(3) Flow Matching
"""

import os
import math
import json
import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Dict, List, Optional, Tuple, Any
from transformers import PreTrainedModel

from .configuration_aether_rami_esm3 import AetherRamiESM3Config


class ESM3MultimodalEncoder(nn.Module):
    """
    ESM3 Multimodal Tokenizer & Geometric Trunk Adapter.
    Processes unified all-atom 3D coordinates (N, CA, C, CB, side-chain centroids),
    amino acid sequences, and secondary structure (SS8) tracks.
    """
    def __init__(self, esm3_dim: int = 1536, latent_dim: int = 512, hidden_dim: int = 1024, dropout: float = 0.1):
        super().__init__()
        self.esm3_dim = esm3_dim
        self.latent_dim = latent_dim
        
        self.proj = nn.Sequential(
            nn.Linear(esm3_dim, hidden_dim),
            nn.LayerNorm(hidden_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, latent_dim),
            nn.LayerNorm(latent_dim)
        )
        
        # Induced-fit dynamic coupling gate
        self.induced_fit_gate = nn.Sequential(
            nn.Linear(latent_dim * 2, latent_dim),
            nn.Sigmoid()
        )

    def forward(self, esm3_embeddings: torch.Tensor, ligand_latent: Optional[torch.Tensor] = None) -> torch.Tensor:
        target_latent = self.proj(esm3_embeddings)
        if ligand_latent is not None:
            gate = self.induced_fit_gate(torch.cat([target_latent, ligand_latent], dim=-1))
            return gate * target_latent + (1.0 - gate) * ligand_latent
        return target_latent


class CoupledSE3FlowMatching(nn.Module):
    """
    Continuous-Time Coupled Riemannian Flow Matching on SE(3) x R^(3N_pocket).
    Simultaneously samples ligand Cartesian coordinates and pocket residue relaxation vectors.
    """
    def __init__(self, coord_dim: int = 3, latent_dim: int = 512, hidden_dim: int = 512):
        super().__init__()
        self.time_emb = nn.Sequential(
            nn.Linear(1, 64),
            nn.SiLU(),
            nn.Linear(64, 128)
        )
        # Vector field for ligand atoms
        self.ligand_field_net = nn.Sequential(
            nn.Linear(coord_dim + 128 + latent_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, coord_dim)
        )
        # Vector field for dynamic pocket side-chain relaxation (induced-fit)
        self.pocket_field_net = nn.Sequential(
            nn.Linear(coord_dim + 128 + latent_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, coord_dim)
        )

    def forward(
        self, 
        ligand_coords: torch.Tensor, 
        pocket_coords: torch.Tensor, 
        t: torch.Tensor, 
        multimodal_cond: torch.Tensor
    ) -> Tuple[torch.Tensor, torch.Tensor]:
        t_embed = self.time_emb(t).unsqueeze(1)
        
        # Ligand field
        t_lig = t_embed.expand(-1, ligand_coords.shape[1], -1)
        c_lig = multimodal_cond.unsqueeze(1).expand(-1, ligand_coords.shape[1], -1)
        feat_lig = torch.cat([ligand_coords, t_lig, c_lig], dim=-1)
        v_ligand = self.ligand_field_net(feat_lig)
        
        # Pocket field (induced-fit)
        t_poc = t_embed.expand(-1, pocket_coords.shape[1], -1)
        c_poc = multimodal_cond.unsqueeze(1).expand(-1, pocket_coords.shape[1], -1)
        feat_poc = torch.cat([pocket_coords, t_poc, c_poc], dim=-1)
        v_pocket = self.pocket_field_net(feat_poc)
        
        return v_ligand, v_pocket

    def compute_all_atom_steric_loss(
        self, 
        ligand_coords: torch.Tensor, 
        pocket_coords: torch.Tensor, 
        vdw_margin: float = 2.40
    ) -> torch.Tensor:
        # Cross-distance between ligand atoms and pocket atoms
        cross_dists = torch.cdist(ligand_coords, pocket_coords)
        clashes = F.relu(vdw_margin - cross_dists)
        return torch.sum(clashes ** 2)


class BiochemicalExpert(nn.Module):
    def __init__(self, expert_id: int, specialization: str, latent_dim: int = 512, hidden_dim: int = 1024, dropout: float = 0.1):
        super().__init__()
        self.expert_id = expert_id
        self.specialization = specialization
        self.net = nn.Sequential(
            nn.Linear(latent_dim, hidden_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, hidden_dim),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim, latent_dim),
            nn.LayerNorm(latent_dim)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return self.net(x)


class MoERouter(nn.Module):
    def __init__(self, input_dim: int = 512, num_experts: int = 8, top_k: int = 2):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        self.gate = nn.Linear(input_dim, num_experts, bias=False)

    def forward(self, x: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor, torch.Tensor]:
        if x.dim() == 3:
            x_flat = x.view(-1, x.shape[-1])
        else:
            x_flat = x

        logits = self.gate(x_flat)
        probs = F.softmax(logits, dim=-1)

        top_k_probs, top_k_indices = torch.topk(probs, self.top_k, dim=-1)
        top_k_weights = top_k_probs / (top_k_probs.sum(dim=-1, keepdim=True) + 1e-8)

        density = probs.mean(dim=0)
        aux_loss = self.num_experts * torch.sum(density * density)

        return top_k_weights, top_k_indices, aux_loss


class AetherRamiESM3Model(PreTrainedModel):
    config_class = AetherRamiESM3Config
    base_model_prefix = "aether_rami_esm3"

    EXPERT_NAMES = [
        "Kinase & ATP Catalytic Cleft Expert",
        "Protease & Hydrolase Dyad Expert",
        "Protein-Protein Interaction (PPI) Interface Expert",
        "Allosteric & Conformational Switch Pocket Expert",
        "GPCR & Transmembrane Transporter Expert",
        "Nucleic Acid & Ribosomal Interface Expert",
        "Evolutionary Escape & Resistance Mutation Expert",
        "Safety & Normal Diploid Proteome Counter-Screening Expert"
    ]

    def __init__(self, config: AetherRamiESM3Config):
        super().__init__(config)
        self.config = config

        esm3_dim = getattr(config, "esm3_embedding_dim", 1536)
        latent_dim = getattr(config, "latent_dim", 512)
        hidden_dim = getattr(config, "hidden_dim", 1024)
        dropout = getattr(config, "dropout", 0.1)

        self.esm3_encoder = ESM3MultimodalEncoder(esm3_dim=esm3_dim, latent_dim=latent_dim, hidden_dim=hidden_dim, dropout=dropout)
        
        self.router = MoERouter(input_dim=latent_dim, num_experts=8, top_k=2)
        self.experts = nn.ModuleList([
            BiochemicalExpert(i, self.EXPERT_NAMES[i], latent_dim=latent_dim, hidden_dim=hidden_dim, dropout=dropout)
            for i in range(8)
        ])

        self.flow_matching = CoupledSE3FlowMatching(coord_dim=3, latent_dim=latent_dim, hidden_dim=hidden_dim)

        self.affinity_head = nn.Sequential(
            nn.Linear(latent_dim, 256),
            nn.GELU(),
            nn.Dropout(dropout),
            nn.Linear(256, 1)
        )

    def forward(
        self, 
        esm3_repr: torch.Tensor, 
        ligand_repr: torch.Tensor,
        ligand_coords: Optional[torch.Tensor] = None,
        pocket_coords: Optional[torch.Tensor] = None
    ) -> Dict[str, Any]:
        target_latent = self.esm3_encoder(esm3_repr, ligand_repr)
        weights, indices, aux_loss = self.router(target_latent)

        expert_outputs = torch.zeros_like(target_latent)
        for k in range(self.config.experts_per_token):
            idx = indices[:, k]
            w = weights[:, k].unsqueeze(-1)
            for exp_id, exp in enumerate(self.experts):
                mask = (idx == exp_id)
                if mask.any():
                    expert_outputs[mask] += w[mask] * exp(target_latent[mask])

        pred_pKi = self.affinity_head(expert_outputs)

        results = {
            "pred_pKi": pred_pKi,
            "latent_representation": expert_outputs,
            "router_aux_loss": aux_loss,
            "top_experts": indices
        }

        if ligand_coords is not None and pocket_coords is not None:
            t = torch.rand(ligand_coords.shape[0], 1, device=ligand_coords.device)
            v_lig, v_poc = self.flow_matching(ligand_coords, pocket_coords, t, expert_outputs)
            steric_loss = self.flow_matching.compute_all_atom_steric_loss(ligand_coords, pocket_coords)
            results["v_ligand"] = v_lig
            results["v_pocket"] = v_poc
            results["steric_loss"] = steric_loss

        return results
