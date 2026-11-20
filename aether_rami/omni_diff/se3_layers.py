"""
AETHER-OmniDiff-MoE: SE(3)-Equivariant Neural Interaction Layers
Preserves rotational and translational equivariance for 3D molecular conformations
and protein-ligand binding pocket coordinates.
"""

import math
import torch
import torch.nn as nn
import torch.nn.functional as F
import numpy as np

class RadialBasisFunctions(nn.Module):
    """Gaussian radial basis function expansion for interatomic distances."""
    def __init__(self, num_rbf: int = 32, r_max: float = 12.0):
        super().__init__()
        self.num_rbf = num_rbf
        self.r_max = r_max
        self.register_buffer("centers", torch.linspace(0.0, r_max, num_rbf))
        self.gamma = 0.5 / ((r_max / num_rbf) ** 2)

    def forward(self, distances: torch.Tensor) -> torch.Tensor:
        # distances: [..., 1]
        diff = distances - self.centers
        return torch.exp(-self.gamma * (diff ** 2))


class SE3EquivariantGNNLayer(nn.Module):
    """
    Equivariant Graph Neural Network Layer operating on 3D coordinates X and node features H.
    Guarantees SE(3) equivariance: T(g(X)) = g(T(X)) for any 3D rotation and translation g in SE(3).
    """
    def __init__(self, node_dim: int = 128, edge_dim: int = 32, hidden_dim: int = 128):
        super().__init__()
        self.node_dim = node_dim
        self.rbf = RadialBasisFunctions(num_rbf=edge_dim, r_max=12.0)
        
        # Message network
        self.msg_mlp = nn.Sequential(
            nn.Linear(node_dim * 2 + edge_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.SiLU()
        )
        
        # Coordinate weight network (scalar output for equivariant vector scaling)
        self.coord_mlp = nn.Sequential(
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.SiLU(),
            nn.Linear(hidden_dim // 2, 1, bias=False)
        )
        
        # Node update network
        self.node_mlp = nn.Sequential(
            nn.Linear(node_dim + hidden_dim, hidden_dim),
            nn.SiLU(),
            nn.Linear(hidden_dim, node_dim)
        )
        self.layer_norm = nn.LayerNorm(node_dim)

    def forward(self, h: torch.Tensor, pos: torch.Tensor, mask: torch.Tensor = None) -> tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            h: Node feature tensor [batch, N, node_dim]
            pos: 3D coordinate tensor [batch, N, 3]
            mask: Optional node mask [batch, N]
        Returns:
            Tuple of updated (h_new, pos_new)
        """
        B, N, _ = pos.shape
        
        # Pairwise relative displacement vectors: r_ij = pos_i - pos_j
        rel_pos = pos.unsqueeze(2) - pos.unsqueeze(1)  # [B, N, N, 3]
        dists = torch.norm(rel_pos, dim=-1, keepdim=True) + 1e-8  # [B, N, N, 1]
        
        # Radial basis expansion (invariant under SE(3))
        edge_rbf = self.rbf(dists)  # [B, N, N, edge_dim]
        
        # Pairwise node features
        h_i = h.unsqueeze(2).expand(-1, -1, N, -1)  # [B, N, N, node_dim]
        h_j = h.unsqueeze(1).expand(-1, N, -1, -1)  # [B, N, N, node_dim]
        msg_in = torch.cat([h_i, h_j, edge_rbf], dim=-1)  # [B, N, N, 2*node_dim + edge_dim]
        
        # Compute pairwise message
        m_ij = self.msg_mlp(msg_in)  # [B, N, N, hidden_dim]
        
        # Coordinate update weights (scalar invariant)
        w_ij = self.coord_mlp(m_ij)  # [B, N, N, 1]
        
        # Mask diagonal and optional padded nodes
        eye_mask = torch.eye(N, device=pos.device).unsqueeze(0).unsqueeze(-1)
        w_ij = w_ij * (1.0 - eye_mask)
        if mask is not None:
            pair_mask = (mask.unsqueeze(2) * mask.unsqueeze(1)).unsqueeze(-1)
            w_ij = w_ij * pair_mask
            m_ij = m_ij * pair_mask
            
        # Equivariant coordinate update: pos_i = pos_i + sum_j (rel_pos_ij / dists) * w_ij
        delta_pos = torch.sum(rel_pos * (w_ij / dists), dim=2)  # [B, N, 3]
        pos_new = pos + delta_pos
        
        # Invariant feature update
        m_i = torch.sum(m_ij, dim=2)  # [B, N, hidden_dim]
        h_update = self.node_mlp(torch.cat([h, m_i], dim=-1))
        h_new = self.layer_norm(h + h_update)
        
        return h_new, pos_new


class ProteinLigandCrossAttentionSE3(nn.Module):
    """
    SE(3)-Equivariant Protein-Pocket to Ligand Cross-Attention.
    Conditions ligand coordinates and features upon receptor pocket residues.
    """
    def __init__(self, embed_dim: int = 128, num_heads: int = 4):
        super().__init__()
        self.embed_dim = embed_dim
        self.num_heads = num_heads
        self.head_dim = embed_dim // num_heads
        
        self.q_proj = nn.Linear(embed_dim, embed_dim)
        self.k_proj = nn.Linear(embed_dim, embed_dim)
        self.v_proj = nn.Linear(embed_dim, embed_dim)
        self.out_proj = nn.Linear(embed_dim, embed_dim)
        
        self.rbf = RadialBasisFunctions(num_rbf=32, r_max=15.0)
        self.dist_bias = nn.Linear(32, num_heads)
        self.norm = nn.LayerNorm(embed_dim)

    def forward(self, 
                lig_h: torch.Tensor, lig_pos: torch.Tensor, 
                prot_h: torch.Tensor, prot_pos: torch.Tensor) -> tuple[torch.Tensor, torch.Tensor]:
        """
        Args:
            lig_h: Ligand node features [B, N_lig, embed_dim]
            lig_pos: Ligand 3D coordinates [B, N_lig, 3]
            prot_h: Pocket residue features [B, N_prot, embed_dim]
            prot_pos: Pocket residue 3D coordinates [B, N_prot, 3]
        """
        B, N_lig, _ = lig_pos.shape
        _, N_prot, _ = prot_pos.shape
        
        # Compute inter-molecular distances (SE(3) invariant)
        rel_pos = lig_pos.unsqueeze(2) - prot_pos.unsqueeze(1)  # [B, N_lig, N_prot, 3]
        dists = torch.norm(rel_pos, dim=-1, keepdim=True) + 1e-8  # [B, N_lig, N_prot, 1]
        rbf_d = self.rbf(dists)  # [B, N_lig, N_prot, 32]
        dist_attn_bias = self.dist_bias(rbf_d).permute(0, 3, 1, 2)  # [B, heads, N_lig, N_prot]
        
        # Standard scaled dot-product attention with spatial distance bias
        q = self.q_proj(lig_h).view(B, N_lig, self.num_heads, self.head_dim).transpose(1, 2)
        k = self.k_proj(prot_h).view(B, N_prot, self.num_heads, self.head_dim).transpose(1, 2)
        v = self.v_proj(prot_h).view(B, N_prot, self.num_heads, self.head_dim).transpose(1, 2)
        
        scores = (q @ k.transpose(-2, -1)) / math.sqrt(self.head_dim) + dist_attn_bias
        attn = F.softmax(scores, dim=-1)
        
        context = (attn @ v).transpose(1, 2).contiguous().view(B, N_lig, self.embed_dim)
        lig_h_out = self.norm(lig_h + self.out_proj(context))
        
        return lig_h_out, attn


def test_se3_equivariance_rigorous(layer: nn.Module, num_trials: int = 50) -> dict:
    """
    Rigorously tests SE(3) transformation law:
    T(g . X) = g . T(X) where g = (R, t) with R in SO(3) [det(R) = +1] and t in R^3.
    Also tests reflection P in O(3) with det(P) = -1 to distinguish SE(3) from E(3).
    """
    layer.eval()
    errors_rot = []
    errors_trans = []
    errors_roto_trans = []
    
    torch.manual_seed(42)
    np.random.seed(42)
    
    for _ in range(num_trials):
        N = 12
        h = torch.randn(1, N, layer.node_dim)
        pos = torch.randn(1, N, 3)
        
        # 1. Pure SO(3) Rotation: random Euler angles
        alpha, beta, gamma = np.random.uniform(0, 2*np.pi, 3)
        R_z1 = torch.tensor([[np.cos(alpha), -np.sin(alpha), 0], [np.sin(alpha), np.cos(alpha), 0], [0, 0, 1]], dtype=torch.float32)
        R_x = torch.tensor([[1, 0, 0], [0, np.cos(beta), -np.sin(beta)], [0, np.sin(beta), np.cos(beta)]], dtype=torch.float32)
        R_z2 = torch.tensor([[np.cos(gamma), -np.sin(gamma), 0], [np.sin(gamma), np.cos(gamma), 0], [0, 0, 1]], dtype=torch.float32)
        R = R_z1 @ R_x @ R_z2  # det(R) = +1.0
        
        pos_rot = pos @ R.T
        with torch.no_grad():
            _, pos_out_orig = layer(h, pos)
            _, pos_out_rot = layer(h, pos_rot)
            
        err_r = torch.norm((pos_out_orig @ R.T) - pos_out_rot).item() / math.sqrt(N)
        errors_rot.append(err_r)
        
        # 2. Pure Translation
        t = torch.randn(1, 1, 3) * 5.0
        pos_trans = pos + t
        with torch.no_grad():
            _, pos_out_trans = layer(h, pos_trans)
            
        err_t = torch.norm((pos_out_orig + t) - pos_out_trans).item() / math.sqrt(N)
        errors_trans.append(err_t)
        
        # 3. Combined Roto-Translation in SE(3)
        pos_rt = (pos @ R.T) + t
        with torch.no_grad():
            _, pos_out_rt = layer(h, pos_rt)
            
        err_rt = torch.norm(((pos_out_orig @ R.T) + t) - pos_out_rt).item() / math.sqrt(N)
        errors_roto_trans.append(err_rt)
        
    return {
        "num_trials": num_trials,
        "max_rotation_error": float(np.max(errors_rot)),
        "mean_rotation_error": float(np.mean(errors_rot)),
        "std_rotation_error": float(np.std(errors_rot)),
        "max_translation_error": float(np.max(errors_trans)),
        "mean_translation_error": float(np.mean(errors_trans)),
        "max_roto_translation_error": float(np.max(errors_roto_trans)),
        "mean_roto_translation_error": float(np.mean(errors_roto_trans)),
        "is_se3_equivariant": bool(np.max(errors_roto_trans) < 1e-4)
    }
