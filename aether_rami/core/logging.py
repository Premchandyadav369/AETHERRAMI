"""
AETHER-RAMI: Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology
Core Structured Logging Module
"""

import sys
import logging
from datetime import datetime

class AetherFormatter(logging.Formatter):
    """Custom formatter with scientific phase tagging and color accents."""
    def format(self, record):
        timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
        phase = getattr(record, "phase", "GENERAL")
        level = record.levelname
        message = record.getMessage()
        return f"[{timestamp}] [{level:<7}] [{phase:<18}] {message}"

def get_logger(name: str = "AETHER-RAMI") -> logging.Logger:
    """Configures and returns a structured logger."""
    logger = logging.getLogger(name)
    if not logger.handlers:
        logger.setLevel(logging.INFO)
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(AetherFormatter())
        logger.addHandler(handler)
    return logger
