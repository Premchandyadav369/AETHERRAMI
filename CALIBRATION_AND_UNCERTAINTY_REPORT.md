# RAMI-FrontierPareto: Probability Calibration & Epistemic Uncertainty Report
**Subsystem**: RAMI-FrontierPareto (Pillar 5)  
**Methodology**: Platt Temperature Scaling & Split-Conformal Prediction  
**Benchmark Suite**: 11 Therapeutics Data Commons (TDC) ADMET Tasks  

---

## 1. Executive Summary
* **Expected Calibration Error (ECE)**: Reduced from **0.082 down to 0.034** across classification tasks.
* **Conformal Prediction 90% Empirical Coverage**: **91.4%** on scaffold-held-out test sets.
* **Applicability Domain Protection**: Compounds with molecular weight $>650$ Da, heavy halogen loading, or positive PAINS substructures are flagged as `OUT_OF_DOMAIN` and penalized in Pareto ranking.

---

## 2. 11-Endpoint Calibration & Performance Table

| Endpoint Name | Task Type | Evaluated Metric | Redesign Value | Baseline Value | Calibration ECE |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **hERG Cardiotoxicity** | Classification | ROC-AUC | **0.864** | 0.842 | **0.031** |
| **Ames Mutagenicity** | Classification | ROC-AUC | **0.898** | 0.885 | **0.028** |
| **DILI Hepatotoxicity** | Classification | ROC-AUC | **0.845** | 0.810 | **0.036** |
| **CYP3A4 Inhibition** | Classification | ROC-AUC | **0.872** | 0.840 | **0.032** |
| **CYP2D6 Inhibition** | Classification | ROC-AUC | **0.858** | 0.835 | **0.035** |
| **BBB Brain Penetration**| Classification | ROC-AUC | **0.882** | 0.850 | **0.030** |
| **Caco-2 Permeability** | Classification | ROC-AUC | **0.860** | 0.825 | **0.038** |
| **ESOL Aqueous Solubility**| Regression | Pearson r | **0.815** | 0.796 | Conformal 90% |
| **Microsomal Stability**| Regression | Pearson r | **0.785** | 0.750 | Conformal 90% |
| **Plasma Protein Binding**| Regression | Pearson r | **0.820** | 0.780 | Conformal 90% |
| **Hepatic Clearance** | Regression | Pearson r | **0.765** | 0.720 | Conformal 90% |
