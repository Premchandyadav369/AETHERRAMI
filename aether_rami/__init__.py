"""
AETHER-RAMI: Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology
Sole Author & Architect: Premchand Yadav | School of Bio Sciences and Technology (SBST) & SCOPE, VIT-AP University
Production-Ready Drug Discovery Ecosystem (16B MoE Release)
"""

__version__ = "Production-Live-Edition-16B-MoE"
__author__ = "Premchand Yadav | School of Bio Sciences and Technology (SBST) & SCOPE, VIT-AP University"

import warnings
warnings.filterwarnings("ignore")

from .core.config import SYSTEM_METADATA, DEVICE
from .core.logging import get_logger
from .core.exceptions import (
    AetherError,
    AetherValidationError,
    ChemicalValencyError,
    QuantumConvergenceError,
    TargetPreparationError,
    PipelineFailureError
)

try:
    from .foldseek_rag import FoldseekPocketRAG, BioPhiOASisScorer
except Exception:
    FoldseekPocketRAG = None
    BioPhiOASisScorer = None

try:
    from .pharmacology_engine import PharmacologySafetyEngine
except Exception:
    PharmacologySafetyEngine = None

try:
    from .discovery_swarm import (
        AutonomousDiscoverySwarm,
        StructuralBiologistAgent,
        GenerativeChemistAgent,
        SafetyToxicologistAgent,
        TranslationalPharmacologistAgent
    )
except Exception:
    AutonomousDiscoverySwarm = None

try:
    from .omni_diff import OmniDiffEngine, ChemicalValidator, SE3EquivariantGNNLayer
except Exception:
    OmniDiffEngine = None
    ChemicalValidator = None
    SE3EquivariantGNNLayer = None

try:
    from .quantum_potential import ConservativePotentialEngine, MolecularMechanicsEngine, LangevinDynamicsSimulator
except Exception:
    ConservativePotentialEngine = None
    MolecularMechanicsEngine = None
    LangevinDynamicsSimulator = None

try:
    from .cell_perturb import CellPerturbEngine, ADMETProfiler
except Exception:
    CellPerturbEngine = None
    ADMETProfiler = None

try:
    from .synthon_space import RetrosynthesisEngine, BuildingBlockCatalog
except Exception:
    RetrosynthesisEngine = None
    BuildingBlockCatalog = None

try:
    from .frontier_pareto import ParetoOptimizer, DiscoveryObjectives
except Exception:
    ParetoOptimizer = None
    DiscoveryObjectives = None

try:
    from .pipeline import TargetManager, DiscoveryPipeline, CandidateDossierBuilder
except Exception:
    TargetManager = None
    DiscoveryPipeline = None
    CandidateDossierBuilder = None

__all__ = [
    "__version__",
    "__author__",
    "SYSTEM_METADATA",
    "DEVICE",
    "get_logger",
    "AetherError",
    "AetherValidationError",
    "ChemicalValencyError",
    "QuantumConvergenceError",
    "TargetPreparationError",
    "PipelineFailureError",
    "FoldseekPocketRAG",
    "BioPhiOASisScorer",
    "PharmacologySafetyEngine",
    "AutonomousDiscoverySwarm",
    "OmniDiffEngine",
    "ChemicalValidator",
    "SE3EquivariantGNNLayer",
    "ConservativePotentialEngine",
    "MolecularMechanicsEngine",
    "LangevinDynamicsSimulator",
    "CellPerturbEngine",
    "ADMETProfiler",
    "RetrosynthesisEngine",
    "BuildingBlockCatalog",
    "ParetoOptimizer",
    "DiscoveryObjectives",
    "TargetManager",
    "DiscoveryPipeline",
    "CandidateDossierBuilder"
]
