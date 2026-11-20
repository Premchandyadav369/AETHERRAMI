"""
AETHER-RAMI (ESM3 Frontier Edition): Configuration Class
Author: V. C. Premchand Yadav | SBST & SCOPE, VIT-AP University
Multimodal ESM3 All-Atom Sequence-Structure-Function Backbone with 16.4B MoE
"""

from transformers import PretrainedConfig

class AetherRamiESM3Config(PretrainedConfig):
    model_type = "aether_rami_esm3"

    def __init__(
        self,
        protein_backbone: str = "esm3-sm-open-v1",
        esm3_embedding_dim: int = 1536,
        esm3_num_heads: int = 24,
        esm3_num_layers: int = 48,
        latent_dim: int = 512,
        hidden_dim: int = 1024,
        num_experts: int = 8,
        experts_per_token: int = 2,
        router_aux_loss_coef: float = 0.01,
        expert_capacity_factor: float = 1.25,
        cross_attention_heads: int = 8,
        cross_attention_layers: int = 6,
        pocket_radius_angstrom: float = 12.0,
        molecular_graph_input_dim: int = 27,
        molecular_graph_hidden_dim: int = 512,
        induced_fit_relaxation_steps: int = 10,
        posebusters_penalty_weight: float = 0.15,
        dropout: float = 0.1,
        total_parameters: int = 16420000000,
        active_parameters: int = 4120000000,
        target_portfolio_count: int = 36,
        total_medicines_count: int = 124,
        **kwargs
    ):
        super().__init__(**kwargs)
        self.protein_backbone = protein_backbone
        self.esm3_embedding_dim = esm3_embedding_dim
        self.esm3_num_heads = esm3_num_heads
        self.esm3_num_layers = esm3_num_layers
        self.latent_dim = latent_dim
        self.hidden_dim = hidden_dim
        self.num_experts = num_experts
        self.experts_per_token = experts_per_token
        self.router_aux_loss_coef = router_aux_loss_coef
        self.expert_capacity_factor = expert_capacity_factor
        self.cross_attention_heads = cross_attention_heads
        self.cross_attention_layers = cross_attention_layers
        self.pocket_radius_angstrom = pocket_radius_angstrom
        self.molecular_graph_input_dim = molecular_graph_input_dim
        self.molecular_graph_hidden_dim = molecular_graph_hidden_dim
        self.induced_fit_relaxation_steps = induced_fit_relaxation_steps
        self.posebusters_penalty_weight = posebusters_penalty_weight
        self.dropout = dropout
        self.total_parameters = total_parameters
        self.active_parameters = active_parameters
        self.target_portfolio_count = target_portfolio_count
        self.total_medicines_count = total_medicines_count
