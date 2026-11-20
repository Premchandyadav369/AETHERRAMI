"""
AETHER-RAMI Data Adapters Package.
"""

from .base_adapter import BaseScienceAdapter
from .chembl_adapter import ChEMBLAdapter
from .pdb_adapter import PDBAdapter
from .molecular_adapters import PubChemAdapter, UniProtAdapter, AlphaFoldAdapter
from .pathway_and_literature_adapters import PubMedAdapter, StringDBAdapter, ReactomeAdapter, ClinicalTrialsAdapter
from .benchmark_data_adapters import QCArchiveAdapter, BindingDBAdapter, LINCSDepMapAdapter
from .registry import ScienceDataRegistry

__all__ = [
    "BaseScienceAdapter",
    "ChEMBLAdapter",
    "PDBAdapter",
    "PubChemAdapter",
    "UniProtAdapter",
    "AlphaFoldAdapter",
    "PubMedAdapter",
    "StringDBAdapter",
    "ReactomeAdapter",
    "ClinicalTrialsAdapter",
    "QCArchiveAdapter",
    "BindingDBAdapter",
    "LINCSDepMapAdapter",
    "ScienceDataRegistry"
]
