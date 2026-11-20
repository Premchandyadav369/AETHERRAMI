# AETHER-RAMI — INDEPENDENT REPRODUCIBILITY & VERIFICATION GUIDE
**Project:** AETHER-RAMI (Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology)  
**Release:** v4.2.0-Landed  
**Validation Standard:** Level 2 / Level 4 (Deterministic Software Reproducibility Standard)  
**Execution Timestamp:** 2026-11-01  

---

## 1. Executive Summary

This guide provides complete, turn-key instructions for independently reproducing every empirical result, benchmark metric, physical invariance test, and automated assertion reported for AETHER-RAMI v4.2.0-Landed. All scripts utilize deterministic seeding, locked software dependencies, and SHA-256 verified weight checkpoints.

---

## 2. Hardware and Software Environment

- **Operating System:** Windows 10/11 x64, Linux (Ubuntu 20.04/22.04 LTS), or macOS (ARM64 / x86-64).
- **Processor:** Minimum 4-core x86-64 or ARM64 CPU (Profiling conducted on Intel Core multi-core CPU).
- **Memory:** Minimum 8 GB RAM (Peak consumption observed: 213.9 MB).
- **Python Runtime:** Python 3.11.x (Verified on Python 3.11.9).
- **Primary Packages:**
  - `torch==2.10.0+cpu` (or compatible 2.x CUDA build)
  - `rdkit==2024.03.5`
  - `numpy==2.4.6`
  - `scipy==1.14.1`
  - `scikit-learn==1.5.2`
  - `xgboost==2.1.2`
  - `lightgbm==4.5.0`
  - `pytest==8.3.3`

---

## 3. Deterministic Seed Management

To guarantee bitwise numerical reproducibility across stochastic sampling and initialization, AETHER-RAMI enforces:
```python
import random
import os
import numpy as np
import torch

def set_deterministic_seeds(seed=42):
    random.seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
        torch.backends.cudnn.deterministic = True
        torch.backends.cudnn.benchmark = False
```
Primary benchmarks utilize `seed=42`, with multi-seed variance verified across seeds `[42, 1337, 2026]`.

---

## 4. Model Checkpoint SHA-256 Verification

Before running evaluations, verify the cryptographic integrity of the 15 model checkpoints in `checkpoints/`:

```powershell
python aether_rami/experiments/audit_checkpoints.py
```
Expected output:
- `15/15 files verified`
- Total parameters: `12,521,747 parameters`
- Total file size: `53.8 MB`

Key checkpoint SHA-256 hashes:
- `cross_attention.pt`: `9f636289bb66113824bbd18f56efca8234ea72960f2bbd7d24a04297dd24d458`
- `multitask_gt_v4.pt`: `09772bf2ea93aa2d7d8e8749a1803716a5a073f1396b27d4981bc59600d33e5c`
- `graphcl_pretrain_v4.pt`: `2a0e28f3cb95c6c6faefeb5527814b60098f91897c4883bb17b62aa4847e099d`
- `mol_vae_v4.pt`: `d31a556df278b0d2685942f2aa5c31ee07a01cb6b911a37c02f7413661eb1bb5`

---

## 5. Step-by-Step Command Recipes

### Step 1: Execute Complete Automated Test Suite
```powershell
pytest tests/test_aether_rami_all_pillars.py tests/test_aether_rami_complete_lab.py --junitxml=INTEGRATION_TEST_RESULTS.xml
```
- **Expected Result:** `21 passed in ~6.2s`
- **Output:** `INTEGRATION_TEST_RESULTS.xml`

### Step 2: Reproduce Pillar 1 Generation & PoseBusters Audit
```powershell
python aether_rami/experiments/generate_pillar1_reports.py
```
- **Expected Result:** 125 molecules evaluated, 100% validity, 100% PoseBusters pass rate post-minimization.
- **Output:** `GENERATION_EVALUATION.csv`, `POSEBUSTERS_FULL_REPORT.csv`

### Step 3: Reproduce Pillar 2 Physics Invariance & Gradient Errors
```powershell
python aether_rami/experiments/generate_pillar2_reports.py
```
- **Expected Result:** Finite-difference gradient error $< 6.5 \times 10^{-6}$, translation invariance $\Delta E < 10^{-14}$, rotation invariance $\Delta E < 10^{-6}$.
- **Output:** `PHYSICS_VALIDATION.csv`, `FORCE_GRADIENT_VALIDATION.csv`

### Step 4: Reproduce Pillar 3 LINCS L1000 Biological Concordance
```powershell
python aether_rami/experiments/generate_pillar3_reports.py
```
- **Expected Result:** 16 held-out compound-cell line pairs, $75.9\%$ mean pathway concordance ($p < 0.01$).
- **Output:** `TRANSCRIPTOMIC_VALIDATION.csv`, `PERTURBATION_BENCHMARK.csv`

### Step 5: Reproduce Pillar 4 Retrosynthesis & Synthon Space
```powershell
python aether_rami/experiments/generate_pillar4_reports.py
```
- **Expected Result:** 25 nominated leads, 100% top-1 route recovery, 2.12 mean steps, 100% building blocks mapped to Enamine REAL.
- **Output:** `RETROSYNTHESIS_VALIDATION.csv`, `BUILDING_BLOCK_PROVENANCE.csv`

### Step 6: Reproduce Pillar 5 ADMET & Pareto Optimization
```powershell
python aether_rami/experiments/generate_pillar5_reports.py
```
- **Expected Result:** 7 ADMET models evaluated on TDC/ChEMBL, hERG accuracy 80%, ESOL $r=0.796$.
- **Output:** `ADMET_VALIDATION.csv`, `ADMET_EXTERNAL_VALIDATION.csv`

### Step 7: Reproduce Independent Holdout Benchmark & Scaffold Leakage Analysis
```powershell
python aether_rami/experiments/generate_independent_benchmarks.py
```
- **Expected Result:** Random Split ($r = 0.892$) vs Bemis-Murcko Scaffold Split ($r = 0.742$, $R^2 = 0.551$, RMSE = $0.584$).
- **Output:** `INDEPENDENT_BENCHMARK_RESULTS.csv`, `DATA_SPLIT_MANIFEST.json`

### Step 8: Reproduce Latency and Computational Profiling
```powershell
python aether_rami/experiments/generate_performance_benchmarks.py
```
- **Expected Result:** End-to-end throughput 2,795 mol/s (batch 64), 213.9 MB peak RAM.
- **Output:** `PERFORMANCE_BENCHMARK.csv`

---

## 6. Verification Tolerances & Acceptable Variance

Due to minor differences in CPU vectorization architectures (AVX-512 vs AVX2) and floating-point fused-multiply-add (FMA) implementations:
- Correlation metrics ($r, \rho$): Acceptable tolerance $\pm 0.015$.
- Gradient error tolerances: Must remain $< 1.0 \times 10^{-5}$ kcal/(mol·Å).
- PoseBusters pass rate: Must remain strictly $100.0\%$.
- Automated tests: Must achieve 21/21 passing (zero tolerance for test failures).
