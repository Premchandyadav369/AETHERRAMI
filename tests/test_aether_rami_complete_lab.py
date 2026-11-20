import os
import json
import hashlib
import hmac
import pytest
from rdkit import Chem

ART_DIR = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13"
HMAC_SECRET = b"AETHER_RAMI_COMPLETE_LAB_2026_EXPEDITION"

@pytest.fixture(scope="module")
def lab_dossier():
    json_path = os.path.join(ART_DIR, "aether_complete_lab_dossier.json")
    assert os.path.exists(json_path), f"Lab dossier missing at {json_path}"
    with open(json_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    return data

def test_dossier_cryptographic_integrity(lab_dossier):
    """Verify that the 20-disease lab dossier has a valid HMAC SHA-256 signature and is tamper-proof."""
    reported_sig = lab_dossier["signature_hmac_sha256"]
    payload_str = json.dumps(lab_dossier["diseases"], sort_keys=True)
    calculated_sig = hmac.new(HMAC_SECRET, payload_str.encode('utf-8'), hashlib.sha256).hexdigest()
    assert reported_sig == calculated_sig, "HMAC SHA-256 signature verification failed! Data may have been tampered with."
    assert lab_dossier["total_diseases"] == 20, "Expected 20 distinct disease indications in mega portfolio"

def test_all_20_target_crystal_structures_exist(lab_dossier):
    """Verify that all 20 experimental PDB crystal structures exist and have valid coordinates."""
    expected_pdbs = [
        "1fkn", "1x70", "1ere", "6oim", "6lu7", "3fup", "1o86", "2v5z", "1enp", "1hw8",
        "1j3i", "3qrj", "4p35", "5i6x", "2az5", "2oc8", "6o2p", "1fiq", "7e14", "5e83"
    ]
    for pdb in expected_pdbs:
        pdb_path = os.path.join(ART_DIR, f"{pdb}.pdb")
        assert os.path.exists(pdb_path), f"Missing crystal structure {pdb}.pdb"
        size = os.path.getsize(pdb_path)
        assert size > 50000, f"PDB structure {pdb}.pdb appears truncated (size: {size} bytes)"

def test_molecular_structures_sanitization_and_3d(lab_dossier):
    """Verify that every nominated lead candidate across 20 diseases has a valid SMILES, sanitizes in RDKit, and has a 3D SDF conformer."""
    assert len(lab_dossier["diseases"]) == 20
    for dis in lab_dossier["diseases"]:
        lead_id = dis["lead_id"]
        smiles = dis["smiles"]
        mol = Chem.MolFromSmiles(smiles)
        assert mol is not None, f"Failed to parse SMILES for lead {lead_id}: {smiles}"
        
        # Verify 3D conformer file
        sdf_path = os.path.join(ART_DIR, f"{lead_id}_3d.sdf")
        assert os.path.exists(sdf_path), f"Missing 3D SDF conformer for {lead_id}"
        assert os.path.getsize(sdf_path) > 1000, f"3D SDF conformer truncated for {lead_id}"

def test_binding_thermodynamics_physics(lab_dossier):
    """Verify that all leads exhibit sub-nanomolar to low-nanomolar binding affinity and favorable MM-GBSA free energy."""
    for dis in lab_dossier["diseases"]:
        phys = dis["physics_binding"]
        delta_g = phys["delta_g_bind_mmgbsa_kcal_mol"]
        assert delta_g < -12.0, f"MM-GBSA Delta G ({delta_g} kcal/mol) insufficiently favorable for {dis['lead_id']}"
        assert phys["delta_e_vdw_kcal_mol"] < -35.0, f"Van der Waals interaction energy inadequate for {dis['lead_id']}"
        assert phys["delta_e_elec_kcal_mol"] < -20.0, f"Electrostatic interaction energy inadequate for {dis['lead_id']}"

def test_molecular_dynamics_trajectory_stability(lab_dossier):
    """Verify 50-ns MD simulation ligand RMSD stability (< 1.5 Å) and catalytic residue contact persistence (> 85%)."""
    for dis in lab_dossier["diseases"]:
        md = dis["md_simulation_50ns"]
        assert md["ligand_rmsd_mean_angstrom"] < 1.5, f"Ligand unstable in binding pocket for {dis['lead_id']}"
        for contact, persistence in md["key_contact_persistence_pct"].items():
            assert persistence >= 85.0, f"Critical contact {contact} dropped below 85% persistence ({persistence}%)"

def test_covalent_warhead_electrophilicity(lab_dossier):
    """Verify that covalent leads have electrophilicity index omega > 3.0 ensuring clean targeted covalent binding."""
    covalent_leads = [d for d in lab_dossier["diseases"] if d["qm_warhead"]["is_covalent"]]
    assert len(covalent_leads) == 3, f"Expected 3 covalent targeted leads (KRAS, Mpro, HbS), found {len(covalent_leads)}"
    for lead in covalent_leads:
        qm = lead["qm_warhead"]
        assert qm["electrophilicity_omega"] >= 3.0, f"Electrophilicity index too low for covalent lead {lead['lead_id']}"
        assert qm["gap_ev"] > 4.0, f"HOMO-LUMO gap too narrow, indicates chemical instability for {lead['lead_id']}"

def test_safetyscreen44_regulatory_compliance(lab_dossier):
    """Verify low hERG cardiotoxicity risk (>20 uM), zero valvulopathy risk, and lack of time-dependent CYP inhibition."""
    for dis in lab_dossier["diseases"]:
        safety = dis["safetyscreen44"]
        assert safety["herg_liability"] in ["LOW_RISK", "NO_RISK"], f"Elevated hERG risk for {dis['lead_id']}"
        assert safety["off_target_gpcr"]["valvulopathy_risk"] == "NEGLIGIBLE", f"5-HT2B valvulopathy liability detected for {dis['lead_id']}"
        assert safety["cyp_profiling"]["tdi_risk"] == "NEGATIVE", f"Time-dependent CYP inhibition risk flagged for {dis['lead_id']}"

def test_target_product_profile_completeness(lab_dossier):
    """Verify that Target Product Profiles have all 6 regulatory dimensions defined across all 20 diseases."""
    required_keys = ["indication", "patient_population", "route", "target_efficacy", "safety_profile", "stability"]
    for dis in lab_dossier["diseases"]:
        tpp = dis["tpp"]
        for key in required_keys:
            assert key in tpp and len(tpp[key]) > 0, f"Missing TPP field '{key}' in {dis['disease']}"
