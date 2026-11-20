import os
import csv
import zipfile

print("=== Running CSIR-IICT Validation Package Verification Suite ===")

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Test 1: Check Required Directories
subdirs = ["synthesis_sops", "assay_protocols", "analytical_templates", "coordinates", "scripts"]
for s in subdirs:
    p = os.path.join(base_dir, s)
    assert os.path.exists(p), f"Missing subdirectory: {s}"
print("[TEST 1 PASS] All 5 subdirectories verified.")

# Test 2: Check Synthesis SOPs
sops = [
    "SOP_SYN_01_AETH_MAL_001.md",
    "SOP_SYN_02_AETH_INHA_002.md",
    "SOP_SYN_03_AETH_KRAS_001.md",
    "SOP_SYN_04_AETH_COVID_001.md"
]
for sop in sops:
    p = os.path.join(base_dir, "synthesis_sops", sop)
    assert os.path.exists(p) and os.path.getsize(p) > 200, f"Missing or empty SOP: {sop}"
print(f"[TEST 2 PASS] All {len(sops)} Synthesis SOPs verified.")

# Test 3: Check Assay Protocols
assays = [
    "ASSAY_01_PfDHFR_and_Parasite_Survival.md",
    "ASSAY_02_Mtb_H37Rv_Alamar_Blue.md",
    "ASSAY_03_Kinase_and_Cancer_Viability.md",
    "ASSAY_04_Tier1_ADME_and_Cardiotoxicity.md"
]
for a in assays:
    p = os.path.join(base_dir, "assay_protocols", a)
    assert os.path.exists(p) and os.path.getsize(p) > 200, f"Missing or empty Assay: {a}"
print(f"[TEST 3 PASS] All {len(assays)} Assay Protocols verified.")

# Test 4: Validate CSV Manifest & Entry Template
manifest_p = os.path.join(base_dir, "analytical_templates", "IICT_Blinded_Compound_Manifest.csv")
with open(manifest_p, "r", encoding="utf-8") as f:
    rows = list(csv.DictReader(f))
assert len(rows) == 24, f"Expected 24 blinded compounds, got {len(rows)}"
print(f"[TEST 4 PASS] Blinded plate manifest verified: {len(rows)} compounds indexed.")

# Test 5: Verify 3D Coordinate Files
coords = ["1j3i.pdb", "1enp.pdb", "6oim.pdb", "6lu7.pdb", "AETH-MAL-001_3d.sdf"]
for c in coords:
    p = os.path.join(base_dir, "coordinates", c)
    assert os.path.exists(p) and os.path.getsize(p) > 100, f"Missing coordinate file: {c}"
print(f"[TEST 5 PASS] 3D Coordinate files verified on disk.")

# Test 6: Create or Update Standalone CSIR-IICT Validation ZIP
zip_name = "CSIR_IICT_WetLab_Validation_Dossier.zip"
zip_path = os.path.join(base_dir, zip_name)
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(base_dir):
        if zip_name in root:
            continue
        for file in files:
            if file == zip_name:
                continue
            full_path = os.path.join(root, file)
            arcname = os.path.relpath(full_path, base_dir)
            zf.write(full_path, arcname)

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"[TEST 6 PASS] Standalone Distribution ZIP created: {zip_path} ({size_mb:.2f} MB)")
print("=== All 6 Tests in CSIR-IICT Validation Suite Passed 100%! ===")
