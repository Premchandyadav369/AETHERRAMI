# AETHER-RAMI: Scientific Reproducibility & Audit Protocol
## Complete Instructions for Independent Reproduction, Deterministic Seeds, and Execution Environment
**Protocol Version:** v4.2.0-Landed | **Verification Command:** `python -m aether_rami.validate --full`

---

### 1. Software Environment & Dependencies

* **Python Version:** 3.11.9
* **PyTorch:** 2.10.0+cpu (Supports CUDA 12.x and Apple Metal MPS where available)
* **RDKit:** 2022.09.5 (Cheminformatics, MMFF94s, UFF, Reaction SMARTS)
* **Scientific Stack:** NumPy 2.4.6, SciPy 1.15.2, Pandas 2.2.2, Scikit-Learn 1.9.0
* **Tree Boosting:** LightGBM 4.7.0, XGBoost 3.2.0
* **Spreadsheet & Reporting:** OpenPyXL 3.1.5, Google Chrome (Headless PDF rendering)

---

### 2. Step-by-Step Reproduction Guide

#### Step 1: Environment Initialization
Ensure the workspace root is set in `PYTHONPATH`:
```powershell
$env:PYTHONPATH="C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
cd "C:\Users\PREMCHANDYADAV\.gemini\antigravity\scratch\AETHERRAMI"
```

#### Step 2: Full System Validation Protocol
Execute the unified validation CLI:
```powershell
python -m aether_rami.validate --full
```
*Expected Output:*
```text
================================================================================
  AETHER-RAMI MASTER VALIDATION SUMMARY REPORT
================================================================================
  Overall Validation Status : PASSED (100% SUITE PASS)
  Total Validation Time     : ~1.05 seconds
  Forensic System Audit     : PASS
  Pillar 1: OmniDiff-MoE    : PASS
  Pillar 2: QuantumPot-XL   : PASS
  Pillar 3: CellPerturb     : PASS
  Pillar 4: SynthonSpace    : PASS
  Pillar 5: FrontierPareto  : PASS
  12-Stage Pipeline E2E     : PASS
================================================================================
```

#### Step 3: Run Discovery Campaign on a Custom Target
Execute the Python discovery orchestrator for any of the 24 disease targets (e.g., InhA for Tuberculosis):
```python
from aether_rami.pipeline import DiscoveryPipeline

pipeline = DiscoveryPipeline()
results = pipeline.run_discovery_campaign("INHA", num_candidates=5)
print(f"Prioritized {len(results['candidates'])} candidates in {results['campaign_runtime_seconds']} s")
for c in results['candidates']:
    print(f"Rank {c['pareto_rank']} | ID: {c['candidate_id']} | pKd: {c['pkd']} | Yield: {c['overall_synthesis_yield_pct']}%")
```

---

### 3. Deterministic Random Seeds
All stochastic operations (diffusion initialization, Langevin thermal kick velocities, RDKit 3D conformer distance geometry) utilize fixed random seeds (`randomSeed=42`) to guarantee bitwise reproducibility across independent compute environments.
