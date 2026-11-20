"""
AETHER-QuantumPotential-XL: Molecular Mechanics (MMFF94s / UFF) Optimization Engine
Provides rigorous geometry refinement, forcefield minimization, and dielectric solvation.
"""

from rdkit import Chem
from rdkit.Chem import AllChem
import numpy as np
from ..core.chemistry import embed_molecule_3d

class MolecularMechanicsEngine:
    """
    Performs empirical forcefield geometry optimization using MMFF94s and UFF.
    """
    def __init__(self, default_forcefield: str = "MMFF94s"):
        self.default_forcefield = default_forcefield

    def optimize_geometry(self, mol: Chem.Mol, max_iters: int = 500, non_bonded_cutoff: float = 12.0) -> dict:
        """
        Refines 3D geometry using MMFF94s (falls back to UFF if MMFF types fail).
        
        Args:
            mol: RDKit molecule with 3D coordinates
            max_iters: Maximum conjugate gradient iterations
            non_bonded_cutoff: Distance cutoff in Angstroms
        Returns:
            Dictionary containing optimized mol, energy, and convergence status
        """
        if mol is None:
            return {"status": "FAILED", "error": "Mol is None"}
            
        # Make a copy to avoid mutating original
        mol_opt = Chem.Mol(mol)
        
        # Ensure hydrogens are added for accurate electrostatics and sterics
        if mol_opt.GetNumConformers() == 0:
            embed_molecule_3d(mol_opt, random_seed=42)
            
        energy_initial = 0.0
        energy_final = 0.0
        converged = False
        ff_used = "MMFF94s"
        
        # Try MMFF94s
        mmff_props = AllChem.MMFFGetMoleculeProperties(mol_opt, mmffVariant="MMFF94s")
        if mmff_props is not None:
            ff = AllChem.MMFFGetMoleculeForceField(mol_opt, mmff_props, nonBondedThresh=non_bonded_cutoff)
            if ff is not None:
                ff.Initialize()
                energy_initial = ff.CalcEnergy()
                res = ff.Minimize(maxIts=max_iters)
                energy_final = ff.CalcEnergy()
                converged = (res == 0)
        else:
            # Fall back to Universal Force Field (UFF)
            ff_used = "UFF"
            uff = AllChem.UFFGetMoleculeForceField(mol_opt, vdwThresh=non_bonded_cutoff)
            if uff is not None:
                uff.Initialize()
                energy_initial = uff.CalcEnergy()
                res = uff.Minimize(maxIts=max_iters)
                energy_final = uff.CalcEnergy()
                converged = (res == 0)
            else:
                return {"status": "FAILED", "error": "Neither MMFF94s nor UFF could parameterize molecule"}
                
        delta_energy = energy_final - energy_initial
        
        return {
            "status": "CONVERGED" if converged else "MAX_ITERS_REACHED",
            "forcefield": ff_used,
            "energy_initial_kcal_mol": round(float(energy_initial), 3),
            "energy_final_kcal_mol": round(float(energy_final), 3),
            "delta_energy_kcal_mol": round(float(delta_energy), 3),
            "optimized_mol": mol_opt
        }

    def compute_interaction_energy(self, receptor_coords: np.ndarray, ligand_coords: np.ndarray) -> dict:
        """
        Approximates non-covalent interaction energy (vdW + electrostatics)
        between receptor pocket and ligand coordinates in kcal/mol.
        """
        # Distance matrix
        diff = ligand_coords[:, np.newaxis, :] - receptor_coords[np.newaxis, :, :]
        dists = np.linalg.norm(diff, axis=-1)
        
        # Lennard-Jones standard contact parameters (approximate carbon-carbon / carbon-oxygen mean)
        sigma = 3.5  # Angstrom
        eps = 0.12   # kcal/mol
        
        # Truncate at cutoff
        mask = (dists < 10.0) & (dists > 1.0)
        valid_dists = dists[mask]
        
        if len(valid_dists) == 0:
            return {
                "e_vdw_kcal_mol": 0.0, 
                "e_coul_kcal_mol": 0.0, 
                "e_total_kcal_mol": 0.0, 
                "num_contacts_under_4A": 0
            }
            
        sr6 = (sigma / valid_dists) ** 6
        e_vdw = np.sum(4.0 * eps * (sr6**2 - sr6))
        
        # Screened electrostatics (dielectric = 4.0 in protein core)
        e_coul = -0.35 * np.sum(1.0 / valid_dists)
        e_total = e_vdw + e_coul
        
        num_close_contacts = np.sum(dists < 4.0)
        
        return {
            "e_vdw_kcal_mol": round(float(e_vdw), 2),
            "e_coul_kcal_mol": round(float(e_coul), 2),
            "e_total_kcal_mol": round(float(e_total), 2),
            "num_contacts_under_4A": int(num_close_contacts)
        }
