"""
AETHER-RAMI: Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology
Custom Exceptions
"""

class AetherError(Exception):
    """Base exception for all AETHER-RAMI system errors."""
    pass

class AetherValidationError(AetherError):
    """Raised when scientific or data validation checks fail."""
    pass

class ChemicalValencyError(AetherError):
    """Raised when generated molecular structures violate physical valency or stereochemistry."""
    pass

class QuantumConvergenceError(AetherError):
    """Raised when molecular mechanics or quantum gradient minimization fails to converge."""
    pass

class TargetPreparationError(AetherError):
    """Raised when protein pocket extraction or coordinate sanitization encounters defects."""
    pass

class PipelineFailureError(AetherError):
    """Raised when an end-to-end discovery stage encounters an unrecoverable fault."""
    pass
