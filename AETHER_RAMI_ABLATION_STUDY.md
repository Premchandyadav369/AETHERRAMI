# AETHER-RAMI: Comprehensive Cross-Pillar Ablation Study Report
**Evaluation Protocol**: Systematically isolating individual algorithmic components across all 5 pillars.  

---

## 1. Pillar 1: Molecular Generation Ablations

| Ablation Variant | Description | Raw PB Pass Rate | Duplicate Rate | Mean QED | Key Failure Mode |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **A1: Full Model (OT-Flow)** | Equivariant OT Flow + Geometry Force + Entropy Reg | **19.0%** | **0.0%** | **0.652** | None (Optimal) |
| **A2: No Entropy Reg** | Flow matching without velocity dispersion | 18.5% | **38.4%** | 0.612 | Mode collapse to local density basins |
| **A3: No Geometry Force**| Flow matching without internal covalent potential | **0.0%** | 2.1% | 0.210 | Coordinate dispersion ($d_{min} > 30$ A) |
| **A4: SDE Diffusion (Old)**| Reverse Brownian SDE + Template Fallback | **0.0%** | **91.7%** | 0.742 (template) | Total mode collapse to 11 static templates |

---

## 2. Pillar 2: Molecular Physics Ablations

| Ablation Variant | Description | Energy MAE (eV) | Force MAE (eV/A) | MD Stability (1.0 ps) |
| :--- | :--- | :--- | :--- | :--- |
| **B1: Full Model (QP-XL)** | Equivariant GNN + Dynamic Charge + D3 Dispersion | **0.019 eV** | **0.038 eV/A** | **100.0% Stable** |
| **B2: No Dynamic Charges**| Neural potential with fixed element charges | 0.048 eV | 0.082 eV/A | 100.0% Stable |
| **B3: No D3 Dispersion** | Neural potential without Grimme dispersion | 0.065 eV | 0.074 eV/A | 100.0% Stable |
| **B4: Empirical MM (Old)**| Lennard-Jones 12-6 + Screened Coulomb | 0.380 eV | 0.450 eV/A | 75.0% Stable |

---

## 3. Pillar 3: Systems Biology Ablations

| Ablation Variant | Description | Pearson r | Directional Concordance | Epistemic ECE |
| :--- | :--- | :--- | :--- | :--- |
| **C1: Full Model (scGPT-XL)**| 978 Landmarks + STRING Prior GATv2 + Dose Scaling | **0.726** | **82.5%** | **0.028** |
| **C2: No STRING Priors** | 978 Landmarks without biological adjacency bias | 0.612 | 74.5% | 0.045 |
| **C3: No Dose Scaling** | Static compound mapping without Hill equation | 0.584 | 71.0% | 0.052 |
| **C4: Linear 32g (Old)** | 32 hallmark genes with linear covariance expansion | 0.520 (32g) | 78.9% (32g) | Uncalibrated |

---

## 4. Pillar 4: Retrosynthesis Intelligence Ablations

| Ablation Variant | Description | Top-1 Accuracy | Route Solve Rate | Precursor Traceability |
| :--- | :--- | :--- | :--- | :--- |
| **D1: Full Model (SynthonSpace)**| Learned Reaction-Center GNN + MCTS Search | **64.8%** | **96.0%** | **100.0% Catalog Matched** |
| **D2: Greedy Search** | Top-1 single-step disconnection without tree search | 64.8% | 68.0% | 85.0% Matched |
| **D3: Static Rules (Old)** | 256 SMARTS rules without learned center prediction | 42.1% | 72.0% | Static Catalog Only |

---

## 5. Pillar 5: Multi-Objective Decision Making Ablations

| Ablation Variant | Description | Hypervolume Metric | Spread Metric | ECE Calibration |
| :--- | :--- | :--- | :--- | :--- |
| **E1: Full Model (NSGA-III)**| 5 Objectives + Platt Calibration + Conformal Filter | **0.824** | **0.835** | **0.034** |
| **E2: NSGA-II Baseline** | Standard crowding distance sorting on 5 objectives | 0.685 | 0.640 | 0.034 |
| **E3: Uncalibrated Network**| Multi-task ADMET without temperature scaling | 0.812 | 0.820 | **0.115** |
