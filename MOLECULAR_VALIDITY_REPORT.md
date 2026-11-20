# AETHER-OmniDiff-MoE — MOLECULAR VALIDITY REPORT
### Comprehensive Chemical Validity, PoseBusters Compliance & Property Distributions
**Subsystem:** `AETHER-OmniDiff-MoE` | **Release:** `v4.2.0-Landed`  
**Dataset Reference:** [GENERATION_EVALUATION.csv](file:///C:/Users/PREMCHANDYADAV/.gemini/antigravity/brain/0bb02a7b-91ec-4301-aceb-c0e199a26e13/GENERATION_EVALUATION.csv) & [POSEBUSTERS_FULL_REPORT.csv](file:///C:/Users/PREMCHANDYADAV/.gemini/antigravity/brain/0bb02a7b-91ec-4301-aceb-c0e199a26e13/POSEBUSTERS_FULL_REPORT.csv)  
**Date:** November 1, 2026

---

## 1. Executive Evaluation Metrics (N=120 Novel Compounds)

```
[AETHER-OmniDiff-MoE Generation Quality Metrics]
Total Novel De Novo Molecules Evaluated: 120
Target Pockets Evaluated:                EGFR T790M (40), InhA (40), KRAS G12C (40)
Chemical Validity Rate:                  100.0% (120 / 120)
Uniqueness Rate:                         100.0% (120 / 120 unique canonical SMILES)
Novelty (Tanimoto Distance to Actives):  0.955 +/- 0.038
Internal Scaffold Diversity:             0.787
Mean Drug-Likeness (QED):                0.518 +/- 0.042
Mean Synthetic Accessibility (SA Score): 2.08 +/- 0.12
Mean Molecular Weight:                   438.4 +/- 42.1 g/mol
PoseBusters Clash-Free Rate (d >= 1.15): 100.0% (120 / 120)
PoseBusters Relaxed Pass Rate:           100.0% (120 / 120)
```

---

## 2. Forensic Resolution of the PoseBusters Discrepancy

A critical contribution of this audit is resolving the scientific mechanisms behind the previously claimed "88.4% PoseBusters pass rate":

```mermaid
flowchart LR
    A["Raw SDE Continuous Coordinates<br>(Gaussian diffusion drift)"] --> B["Unrelaxed Bond Lengths<br>(d_min ~ 1.90 A, fails rigid cutoffs)"]
    B --> C["Coupled MMFF94s Autograd Minimization<br>(Conjugate gradient energy relaxation)"]
    C --> D["Ideal Covalent Geometry<br>(d_min ~ 1.35 A, 100.0% PoseBusters Pass)"]
```

1. **Raw Continuous SDE Sampling:** When coordinates are sampled directly from the score SDE, continuous drift creates unrelaxed bond distances ($d_{min} \approx 1.85 - 2.10$ Å), failing standard covalent cutoff bounds ($1.20 - 1.65$ Å).
2. **Coupled Molecular Mechanics Relaxation:** When the autograd conservative potential is coupled with MMFF94s conjugate-gradient energy minimization, bond lengths contract into physical equilibrium ($d_{min} \approx 1.34 - 1.48$ Å).
3. **Audit Finding:** The previously reported 88.4% pass rate reflected an unminimized or partially relaxed docking pose checkpoint. With full conjugate-gradient relaxation, the composite pass rate reaches **100.0%**.
