"""
AETHER-RAMI: Robust Cheminformatics & Coordinate Utilities
Safe RDKit coordinate accessors avoiding NumPy 2.x C-API _ARRAY_API incompatibilities.
"""

import numpy as np
from rdkit import Chem
from rdkit.Chem import rdDistGeom

def get_conformer_coords(mol: Chem.Mol, conf_id: int = -1) -> np.ndarray:
    """
    Safely extracts 3D coordinates as a NumPy float64 array [N, 3]
    using individual atom point accessors, avoiding conf.GetPositions() NumPy 1.x C-API crashes.
    """
    if mol is None or mol.GetNumConformers() == 0:
        return np.zeros((0, 3), dtype=np.float64)
    conf = mol.GetConformer(conf_id)
    n = mol.GetNumAtoms()
    coords = np.zeros((n, 3), dtype=np.float64)
    for i in range(n):
        pt = conf.GetAtomPosition(i)
        coords[i, 0] = pt.x
        coords[i, 1] = pt.y
        coords[i, 2] = pt.z
    return coords

def embed_molecule_3d(mol: Chem.Mol, random_seed: int = 42) -> bool:
    """
    Embeds a 3D conformer into an RDKit molecule using Distance Geometry.
    """
    if mol is None:
        return False
    try:
        res = rdDistGeom.EmbedMolecule(mol, randomSeed=random_seed)
        return (res == 0)
    except Exception:
        return False
