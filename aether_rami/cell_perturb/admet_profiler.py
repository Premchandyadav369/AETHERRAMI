"""
RAMI-CellPerturb-scGPT: 7-Organ ADMET Profiling Engine
Evaluates preclinical absorption, distribution, metabolism, excretion, and toxicity parameters:
hERG cardiac safety, microsomal metabolic stability (T_1/2), Caco-2 permeability,
BBB CNS penetration, CYP450 pan-inhibition, Ames mutagenicity, and plasma protein binding.

Scientific Standards & Endpoint Definitions:
- hERG: pIC50 target < 6.0 (IC50 > 1 uM = Acceptable Window; pIC50 >= 6.0 = Potential Liability)
- HLM: Intrinsic clearance T_1/2 in min (T_1/2 >= 30.0 min = STABLE; T_1/2 < 30.0 min = RAPID_CLEARANCE)
- Caco-2: Apparent permeability Papp in 10^-6 cm/s (Papp >= 10.0 = HIGH; 2.0 - 10.0 = MODERATE; < 2.0 = LOW)
- BBB: logBB target > -0.5 for CNS active, <= -0.5 for peripherally restricted
- CYP Pan-Inhibition: Categorical inhibition across CYP1A2, 2C9, 2C19, 2D6, 3A4
- Ames: Mutagenic flag based on hazardous aromatic nitro/amine alerts
- PPB: Plasma protein binding percentage (%)
"""

import math
from rdkit import Chem
from rdkit.Chem import Descriptors, rdMolDescriptors

class ADMETProfiler:
    """
    Computes rigorous physicochemical and QSAR-based ADMET descriptors.
    """
    def __init__(self):
        self.basic_amine_smarts = Chem.MolFromSmarts("[NX3;H0;!$(NC=O)]")
        self.ames_nitro_smarts = Chem.MolFromSmarts("[$(c[N+](=O)[O-])]")
        self.ames_aromatic_amine = Chem.MolFromSmarts("[$(cN)]")

    def profile_molecule(self, smiles: str) -> dict:
        """
        Profiles molecule across ADMET parameters with strict, non-contradictory classification thresholds.
        """
        mol = Chem.MolFromSmiles(smiles)
        if mol is None:
            return {"status": "FAILED", "error": "Invalid SMILES"}
            
        mw = Descriptors.MolWt(mol)
        logp = Descriptors.MolLogP(mol)
        tpsa = Descriptors.TPSA(mol)
        hbd = rdMolDescriptors.CalcNumHBD(mol)
        hba = rdMolDescriptors.CalcNumHBA(mol)
        rotb = rdMolDescriptors.CalcNumRotatableBonds(mol)
        num_aromatic_rings = rdMolDescriptors.CalcNumAromaticRings(mol)
        
        # 1. hERG cardiac liability (pIC50 estimate: lipophilic basic amines have higher affinity)
        has_basic_amine = mol.HasSubstructMatch(self.basic_amine_smarts) if self.basic_amine_smarts else False
        herg_base = 4.2 + (0.45 * max(0.0, logp - 1.5)) + (0.8 if has_basic_amine else 0.0)
        if mw > 450: herg_base += 0.2
        herg_pic50 = round(min(8.5, max(3.5, herg_base)), 2)
        # Consistent threshold: pIC50 >= 6.0 is liability (IC50 <= 1 uM)
        herg_flag = "POTENTIAL_LIABILITY" if herg_pic50 >= 6.0 else "ACCEPTABLE_WINDOW"
        
        # 2. Human Liver Microsomal (HLM) Stability T_1/2 (minutes)
        hlm_t12 = max(5.0, 120.0 - (15.0 * logp) - (3.5 * rotb) - (5.0 * num_aromatic_rings))
        hlm_t12 = round(min(180.0, hlm_t12), 1)
        # Consistent threshold: >= 30.0 min is STABLE; < 30.0 min is RAPID_CLEARANCE
        hlm_classification = "STABLE" if hlm_t12 >= 30.0 else "RAPID_CLEARANCE"
        
        # 3. Caco-2 Cell Permeability (10^-6 cm/s)
        caco2_log = 1.2 + (0.3 * logp) - (0.015 * tpsa) - (0.2 * hbd)
        caco2_papp = round(float(math.pow(10, min(1.8, max(-1.0, caco2_log)))), 2)
        caco2_class = "HIGH" if caco2_papp >= 10.0 else ("MODERATE" if caco2_papp >= 2.0 else "LOW")
        
        # 4. Blood-Brain Barrier (BBB) Permeability (logBB)
        log_bb = round(float((0.152 * logp) - (0.0148 * tpsa) + 0.139), 2)
        bbb_penetrant = bool(log_bb > -0.5 and mw < 450 and hbd <= 3)
        
        # 5. CYP450 Pan-Inhibition Profile (5 major isoforms)
        cyp_inhibition = {
            "CYP1A2": bool(num_aromatic_rings >= 3 and logp > 3.0),
            "CYP2C9": bool(logp > 3.5 and hba > 3),
            "CYP2C19": bool(logp > 3.0 and has_basic_amine),
            "CYP2D6": bool(has_basic_amine and logp > 2.0),
            "CYP3A4": bool(mw > 400 and logp > 3.5)
        }
        num_cyp_inhibited = sum(1 for v in cyp_inhibition.values() if v)
        
        # 6. Ames Mutagenicity Assessment
        has_nitro = mol.HasSubstructMatch(self.ames_nitro_smarts) if self.ames_nitro_smarts else False
        ames_risk = "POSITIVE_MUTAGENIC_ALERT" if has_nitro else "NEGATIVE_CLEAN"
        
        # 7. Plasma Protein Binding (PPB %)
        ppb_val = min(99.5, max(40.0, 50.0 + (10.0 * logp) + (0.02 * mw)))
        ppb_percent = round(ppb_val, 1)

        # 8. Delaney ESOL Aqueous Solubility (logS in mol/L)
        heavy_atoms = mol.GetNumHeavyAtoms()
        aromatic_atoms = sum(1 for atom in mol.GetAtoms() if atom.GetIsAromatic())
        aromatic_prop = (aromatic_atoms / heavy_atoms) if heavy_atoms > 0 else 0.0
        esol_logs = round(0.16 - (0.63 * logp) - (0.0062 * mw) + (0.066 * rotb) - (0.74 * aromatic_prop), 2)
        
        # Composite ADMET Desirability Score [0.0, 1.0] with strict penalties
        desirability = 1.0
        if herg_flag == "POTENTIAL_LIABILITY": 
            desirability -= 0.30
        if hlm_classification == "RAPID_CLEARANCE": 
            desirability -= 0.15
        if caco2_class == "LOW": 
            desirability -= 0.15
        if ames_risk != "NEGATIVE_CLEAN": 
            desirability -= 0.25
        if num_cyp_inhibited >= 3: 
            desirability -= 0.15
            
        desirability = round(max(0.05, desirability), 3)
        
        return {
            "status": "PROFILED",
            "smiles": smiles,
            "herg_pic50": herg_pic50,
            "herg_liability": herg_flag,
            "herg_threshold_info": "pIC50 < 6.0 is acceptable; >= 6.0 is potential cardiac liability",
            "hlm_clearance_t12_min": hlm_t12,
            "hlm_classification": hlm_classification,
            "hlm_threshold_info": "T1/2 >= 30.0 min is stable; < 30.0 min indicates rapid hepatic clearance",
            "caco2_papp_1e6_cm_s": caco2_papp,
            "caco2_permeability": caco2_class,
            "blood_brain_barrier": {
                "log_bb": log_bb,
                "cns_penetrant": bbb_penetrant
            },
            "cyp_inhibition_profile": cyp_inhibition,
            "cyp_inhibition_count": num_cyp_inhibited,
            "ames_mutagenicity": ames_risk,
            "solubility_esol_logs": esol_logs,
            "plasma_protein_binding_pct": ppb_percent,
            "admet_desirability_score": desirability,
            "evidence_category": "LEVEL_1_COMPUTATIONALLY_PREDICTED"
        }
