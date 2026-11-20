import os
import sys
import zipfile
import shutil

workspace = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
brain = r"C:\Users\PREMCHANDYADAV\.gemini\antigravity\brain\0bb02a7b-91ec-4301-aceb-c0e199a26e13"
zip_filename = "AETHER_RAMI_COMPLETE_EVIDENCE_PACKAGE.zip"
zip_path = os.path.join(workspace, zip_filename)
brain_zip_path = os.path.join(brain, zip_filename)

items_to_zip = [
    # Core directories
    "aether_rami",
    "tests",
    "aetherramiresultsv10",
    "aether-ramiv4",
    
    # Master Manuscripts & Architectural Reports
    "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.md",
    "AETHER_RAMI_MASTER_RESEARCH_MANUSCRIPT.pdf",
    "AETHER_RAMI_ARCHITECTURE.md",
    "AETHER_RAMI_FINAL_EVIDENCE_SCORECARD.md",
    "AETHER_RAMI_ABLATION_STUDY.md",
    "AETHER_RAMI_EXPERIMENT_MANIFEST.json",
    "RESEARCH_LITERATURE_REVIEW.md",
    "RESEARCH_GAP_ANALYSIS.md",
    "METHOD_SELECTION_JUSTIFICATION.md",
    
    # Pillar 1 Deliverables
    "OMNIDIFF_REDESIGN.md",
    "GENERATION_DIVERSITY_REPORT.md",
    "GENERATION_TRAINING_RESULTS.csv",
    "GENERATION_RAW_VALIDITY.csv",
    "POCKET_INTERACTION_VALIDATION.csv",
    "GENERATION_SOTA_COMPARISON.csv",
    
    # Pillar 2 Deliverables
    "QUANTUMPOTENTIAL_REDESIGN.md",
    "FORCE_ACCURACY_REPORT.md",
    "MOLECULAR_DYNAMICS_VALIDATION.md",
    "MLIP_COMPARISON.csv",
    "QM_REFERENCE_BENCHMARK.csv",
    
    # Pillar 3 Deliverables
    "CELLPERTURB_REDESIGN.md",
    "PATHWAY_GENERALIZATION_REPORT.md",
    "TRANSCRIPTOMIC_UNCERTAINTY_REPORT.md",
    "PERTURBATION_MODEL_COMPARISON.csv",
    "UNSEEN_PERTURBATION_RESULTS.csv",
    
    # Pillar 4 Deliverables
    "SYNTHONSPACE_REDESIGN.md",
    "REACTION_PROVENANCE_REPORT.md",
    "REACTION_MODEL_COMPARISON.csv",
    "RETROSYNTHESIS_ROUTE_BENCHMARK.csv",
    "BUILDING_BLOCK_AVAILABILITY_AUDIT.csv",
    
    # Pillar 5 Deliverables
    "FRONTIERPARETO_REDESIGN.md",
    "CALIBRATION_AND_UNCERTAINTY_REPORT.md",
    "ACTIVE_LEARNING_SIMULATION.md",
    "ADMET_SOTA_COMPARISON.csv",
    "MULTIOBJECTIVE_OPTIMIZATION_BENCHMARK.csv",
    
    # Cross-Pillar & Audit Foundations
    "STATE_OF_THE_ART_COMPARISON.csv",
    "FINAL_METRIC_RECALCULATION.csv",
    "CHECKPOINT_TRAINING_PROVENANCE.csv",
    "GENERATION_RAW_VS_RELAXED_AUDIT.csv",
    "PHYSICS_REPRODUCTION_RESULTS.csv",
    "PHYSICS_VALIDATION.csv",
    "CELL_PERTURB_RECALCULATION.csv",
    "RETROSYNTHESIS_PROVENANCE_AUDIT.csv",
    "ADMET_EXTERNAL_REPRODUCTION.csv",
    "ADMET_VALIDATION.csv",
    "BENCHMARK_SPLIT_REPRODUCTION.csv",
    "LIVE_ADAPTER_VERIFICATION.csv",
    "PERFORMANCE_REPRODUCTION.csv",
    "INTEGRATION_TEST_RESULTS.xml"
]

print(f"Packaging {len(items_to_zip)} items into {zip_path}...")
with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
    for item in items_to_zip:
        item_path = os.path.join(workspace, item)
        if not os.path.exists(item_path):
            print(f"Notice: Item not found: {item}")
            continue
        if os.path.isdir(item_path):
            for root, dirs, files in os.walk(item_path):
                if "__pycache__" in root or ".cache" in root or ".pytest_cache" in root:
                    continue
                for f in files:
                    if f.endswith(".pyc"):
                        continue
                    fp = os.path.join(root, f)
                    arcname = os.path.relpath(fp, workspace)
                    zf.write(fp, arcname)
        else:
            zf.write(item_path, item)

size_mb = os.path.getsize(zip_path) / (1024 * 1024)
print(f"Created ZIP: {size_mb:.2f} MB")
shutil.copy2(zip_path, brain_zip_path)
print(f"Copied ZIP to brain: {brain_zip_path}")
