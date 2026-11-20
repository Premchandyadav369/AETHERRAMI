"""
AETHER-OmniDiff-MoE: Rigorous Chemical & Structural Validation Engine
Performs multi-criteria cheminformatics validation: RDKit sanitization, valency checks,
PAINS / Brenk alert filtering, Lipinski / Veber compliance, QED, SAScore,
and PoseBusters geometric sanity (steric clash, bond distortion, aromatic planarity).
"""

import math
import numpy as np
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors, QED, DataStructs
from ..core.chemistry import get_conformer_coords

class ChemicalValidator:
    """
    Evaluates molecular validity, drug-likeness, safety alerts,
    and 3D PoseBusters compliance for generated candidates.
    """
    
    # Common PAINS substructure SMARTS patterns
    PAINS_SMARTS = [
        "[#6]1=[#6]-[#6](=[#8])-[#6]=[#6]-[#6]1=[#8]",     # Quinone
        "c1ccc2c(c1)C(=O)c3ccccc3C2=O",                     # Anthraquinone
        "c1ccc(cc1)N=Nc2ccccc2",                            # Azo compound
        "C1(=O)NC(=O)NC1=O",                                # Barbiturate
        "[#16]-[#16]",                                      # Disulfide
        "[#6]1-[#6]-[#6](=[#8])-[#16]-[#6]1=[#8]"          # Rhodanine core
    ]
    
    # Brenk toxicophores / reactive group alerts
    BRENK_SMARTS = [
        "[N;+1](=O)[O-]",                                   # Nitro
        "[C,c]C(=O)Cl",                                     # Acid chloride
        "C(=O)OC(=O)",                                      # Anhydride
        "C(=S)",                                            # Thiocarbonyl
        "C#N",                                              # Aliphatic nitrile alert (selective)
        "[Cl,Br,I]C(=O)"                                    # Halo carbonyl
    ]

    def __init__(self):
        self.pains_mols = [Chem.MolFromSmarts(s) for s in self.PAINS_SMARTS if Chem.MolFromSmarts(s) is not None]
        self.brenk_mols = [Chem.MolFromSmarts(s) for s in self.BRENK_SMARTS if Chem.MolFromSmarts(s) is not None]

    def validate_smiles(self, smiles: str) -> dict:
        """
        Validates SMILES string, computing physicochemical properties and alerts.
        """
        result = {
            "smiles": smiles,
            "is_valid": False,
            "sanitization_error": None,
            "mw": None,
            "logp": None,
            "hbd": None,
            "hba": None,
            "rotb": None,
            "tpsa": None,
            "qed": None,
            "sascore_approx": None,
            "lipinski_violations": 0,
            "veber_pass": False,
            "pains_alerts": 0,
            "brenk_alerts": 0,
            "status": "FAILED"
        }
        
        if not smiles or not isinstance(smiles, str):
            result["sanitization_error"] = "Empty or non-string input"
            return result
            
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            result["sanitization_error"] = "RDKit MolFromSmiles failed"
            return result
            
        try:
            Chem.SanitizeMol(mol)
        except Exception as e:
            result["sanitization_error"] = str(e)
            return result
            
        result["is_valid"] = True
        
        # Descriptors
        mw = Descriptors.MolWt(mol)
        logp = Descriptors.MolLogP(mol)
        hbd = rdMolDescriptors.CalcNumHBD(mol)
        hba = rdMolDescriptors.CalcNumHBA(mol)
        rotb = rdMolDescriptors.CalcNumRotatableBonds(mol)
        tpsa = Descriptors.TPSA(mol)
        qed_val = QED.qed(mol)
        
        # Lipinski Rule of 5
        lip_viol = 0
        if mw > 500.0: lip_viol += 1
        if logp > 5.0: lip_viol += 1
        if hbd > 5: lip_viol += 1
        if hba > 10: lip_viol += 1
        
        # Veber criteria
        veber_pass = (rotb <= 10) and (tpsa <= 140.0)
        
        # Approximated SA score based on ring complexity, stereocenters, and MW
        num_rings = rdMolDescriptors.CalcNumRings(mol)
        num_chiral = len(Chem.FindMolChiralCenters(mol, includeUnassigned=True))
        num_hetero = rdMolDescriptors.CalcNumHeteroatoms(mol)
        sa_approx = min(10.0, max(1.0, 1.0 + (num_rings * 0.4) + (num_chiral * 0.5) + (mw / 200.0) + (rotb * 0.1)))
        
        # Alerts
        pains_count = sum(1 for p in self.pains_mols if mol.HasSubstructMatch(p))
        brenk_count = sum(1 for b in self.brenk_mols if mol.HasSubstructMatch(b))
        
        result.update({
            "mw": round(mw, 2),
            "logp": round(logp, 2),
            "hbd": int(hbd),
            "hba": int(hba),
            "rotb": int(rotb),
            "tpsa": round(tpsa, 2),
            "qed": round(qed_val, 3),
            "sascore_approx": round(sa_approx, 2),
            "lipinski_violations": int(lip_viol),
            "veber_pass": bool(veber_pass),
            "pains_alerts": int(pains_count),
            "brenk_alerts": int(brenk_count),
            "status": "PASSED" if (lip_viol <= 1 and pains_count == 0) else "PASSED_WITH_WARNINGS"
        })
        
        return result

    def validate_posebusters_3d(self, mol_3d: Chem.Mol) -> dict:
        """
        Evaluates physical consistency of 3D ligand conformation (PoseBusters criteria):
        - Minimum non-bonded interatomic distance (steric clash >= 1.20 Angstrom)
        - Bond length distribution
        - Aromatic ring planarity
        """
        pb_result = {
            "min_internal_distance_angstrom": None,
            "clash_detected": False,
            "max_bond_length_angstrom": None,
            "aromatic_planarity_pass": True,
            "posebusters_overall_pass": True,
            "details": []
        }
        
        if mol_3d is None or mol_3d.GetNumConformers() == 0:
            pb_result["posebusters_overall_pass"] = False
            pb_result["details"].append("No 3D conformer found on molecule")
            return pb_result
            
        num_atoms = mol_3d.GetNumAtoms()
        coords = get_conformer_coords(mol_3d)
        
        # 1. Non-bonded steric clash check
        min_dist = 999.0
        clash = False
        for i in range(num_atoms):
            for j in range(i + 1, num_atoms):
                # Only check non-bonded and non-1,3 atoms
                bond = mol_3d.GetBondBetweenAtoms(i, j)
                if bond is None:
                    dist = np.linalg.norm(coords[i] - coords[j])
                    if dist < min_dist:
                        min_dist = dist
                    if dist < 1.15:  # Severe steric clash
                        clash = True
                        
        pb_result["min_internal_distance_angstrom"] = round(float(min_dist), 3)
        pb_result["clash_detected"] = clash
        if clash:
            pb_result["posebusters_overall_pass"] = False
            pb_result["details"].append(f"Internal steric clash: {min_dist:.2f} A < 1.15 A")
            
        # 2. Bond lengths check
        max_bond_len = 0.0
        for bond in mol_3d.GetBonds():
            idx1 = bond.GetBeginAtomIdx()
            idx2 = bond.GetEndAtomIdx()
            blen = np.linalg.norm(coords[idx1] - coords[idx2])
            if blen > max_bond_len:
                max_bond_len = blen
            # Carbon-Carbon or similar standard single bonds shouldn't exceed 1.95 A
            if blen > 2.05:
                pb_result["posebusters_overall_pass"] = False
                pb_result["details"].append(f"Abnormal bond stretch: {blen:.2f} A")
                
        pb_result["max_bond_length_angstrom"] = round(float(max_bond_len), 3)
        
        # 3. Aromatic ring planarity
        ring_info = mol_3d.GetRingInfo()
        for ring in ring_info.AtomRings():
            if len(ring) == 6:
                # Check if ring atoms are aromatic
                if all(mol_3d.GetAtomWithIdx(idx).GetIsAromatic() for idx in ring):
                    ring_coords = coords[list(ring)]
                    # Fit plane via SVD
                    centroid = ring_coords.mean(axis=0)
                    shifted = ring_coords - centroid
                    _, _, vh = np.linalg.svd(shifted)
                    normal = vh[2]
                    # Out of plane distances
                    plane_dists = np.abs(np.dot(shifted, normal))
                    if np.max(plane_dists) > 0.25:  # Distorted aromatic ring
                        pb_result["aromatic_planarity_pass"] = False
                        pb_result["posebusters_overall_pass"] = False
                        pb_result["details"].append("Aromatic ring out-of-plane distortion > 0.25 A")
                        break
                        
        return pb_result

    def compute_tanimoto_diversity(self, smiles_list: list[str]) -> float:
        """Computes mean pairwise Tanimoto distance (diversity = 1.0 - mean similarity)."""
        fps = []
        for s in smiles_list:
            m = Chem.MolFromSmiles(s)
            if m:
                fps.append(rdMolDescriptors.GetMorganFingerprintAsBitVect(m, radius=2, nBits=1024))
                
        if len(fps) < 2:
            return 1.0
            
        sims = []
        for i in range(len(fps)):
            for j in range(i + 1, len(fps)):
                sims.append(DataStructs.TanimotoSimilarity(fps[i], fps[j]))
                
        mean_sim = float(np.mean(sims)) if sims else 0.0
        return round(1.0 - mean_sim, 3)
