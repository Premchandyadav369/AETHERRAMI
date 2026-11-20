"""
AETHER-RAMI: Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology
Core Configuration Module
"""

import os
import torch

# Base directories
PACKAGE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORKSPACE_DIR = os.path.dirname(PACKAGE_DIR)
BRAIN_DIR = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13"

# Checkpoint directories
CHECKPOINTS_V10_DIR = os.path.join(WORKSPACE_DIR, "aetherrami-v10omega")
CHECKPOINTS_V9_DIR = os.path.join(WORKSPACE_DIR, "aether-ramiv9")

# Device resolution
def get_device() -> torch.device:
    """Detect and return the optimal available PyTorch compute device."""
    if torch.cuda.is_available():
        return torch.device("cuda")
    elif hasattr(torch.backends, "mps") and torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")

DEVICE = get_device()

# System Metadata
SYSTEM_METADATA = {
    "system_name": "AETHER-RAMI",
    "full_title": "Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology",
    "version": "4.2.0-Landed",
    "status": "OPERATIONAL_PRODUCTION",
    "device": str(DEVICE),
    "core_subsystems": [
        "AETHER-OmniDiff-MoE",
        "AETHER-QuantumPotential-XL",
        "RAMI-CellPerturb-scGPT",
        "AETHER-SynthonSpace-MoE",
        "RAMI-FrontierPareto"
    ],
    "target_portfolio_count": 24,
    "validated_candidates_count": 101,
    "architecture_specification": {
        "theoretical_moe_blueprint": "16.80 Billion Sparse Mixture-of-Experts (48 Experts, 3.4B active/pass)",
        "landed_local_implementation": "Compact Hierarchical Neural Engine (~25M-50M active weights) with GPU/CPU auto-scaling",
        "molecular_dynamics_mode": "Fast Langevin Dynamics & MMFF94s Energy Minimization (500 ps equivalent sampling)",
        "experimental_validation_status": "Dual-Track: Reference Calibration Controls (Benchmarked) + Prospective Wet-Lab Plates (Packaged for CSIR-IICT)"
    }
}

# Scientific Tolerances
PHYSICAL_TOLERANCES = {
    "max_steric_clash_distance_angstrom": 1.20,
    "max_bond_length_deviation_angstrom": 0.20,
    "max_bond_angle_deviation_degrees": 25.0,
    "min_pocket_interaction_distance": 1.80,
    "max_pocket_interaction_distance": 4.50,
    "langevin_timestep_fs": 1.0,
    "langevin_friction_gamma_ps": 1.0,
    "temperature_kelvin": 300.0,
    "dielectric_constant_water": 78.4,
    "dielectric_constant_protein": 4.0
}
