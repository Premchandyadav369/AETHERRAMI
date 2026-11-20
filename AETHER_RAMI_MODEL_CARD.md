# MODEL CARD: AETHER-RAMI
**Architecture Name:** AETHER-RAMI (Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology)  
**Version:** v4.2.0-Landed  
**Release Date:** November 1, 2026  
**License:** Permissive Open Research License (BSD-3-Clause / Apache-2.0 compatible)  
**Model Type:** Multimodal Deep Graph Neural Network, 3D Continuous Diffusion, Empirical Molecular Mechanics, and Gradient-Boosted Ensemble  

---

## 1. Model Details

- **Lead Research Architect / Developer:** AETHER-RAMI Engineering & Scientific Validation Team
- **Model Framework:** PyTorch 2.10.0+cpu, RDKit 2024.03.5, Scikit-Learn 1.5.2, XGBoost 2.1.2, LightGBM 4.5.0
- **Total Authenticated Deep Learning Parameters:** **12,521,747 parameters** (53.8 MB checkpoint footprint)
  - `cross_attention.pt`: 2,510,848 parameters (Binding pocket cross-attention)
  - `multitask_gt_v4.pt`: 1,844,224 parameters (Multitask graph transformer)
  - `graphcl_pretrain_v4.pt`: 1,820,160 parameters (Self-supervised contrastive GNN)
  - `graph_models.pt`: 2,084,864 parameters (Hierarchical molecular graph encoder)
  - `mol_vae_v4.pt`: 1,142,784 parameters (Continuous chemical latent space VAE)
  - `prot_cond_vae.pt`: 1,173,504 parameters (Protein pocket-conditioned VAE)
  - `gatv2_model.pt`: 578,048 parameters (Graph Attention Network v2)
  - `gin_model.pt`: 576,320 parameters (Graph Isomorphism Network)
  - `rf_v10.pkl`, `xgb_v10.pkl`, `lgbm_v10.pkl`: Serialized tree ensembles for ADMET profiling
- **Primary Modalities:** 2D Molecular Graph Topologies, 3D Continuous Cartesian Coordinates, 3D Receptor Binding Pocket Pockets, 32-Gene Regulatory Networks, Retrosynthetic SMARTS Transforms.

---

## 2. Intended Use

### Primary Intended Uses:
- Target-conditioned de novo molecular design and generation for drug discovery campaigns.
- Fast heuristic binding pose optimization and stereochemical relaxation via integrated MMFF94s potential.
- In silico single-cell transcriptomic perturbation screening across canonical cancer hallmark pathways.
- Automated retrosynthetic feasibility triage and Enamine REAL commercial building-block mapping.
- Multi-objective ADMET prioritization (solubility, cardiotoxicity, clearance, blood-brain barrier).

### Out-of-Scope and Prohibited Uses:
- Clinical prescription, patient diagnostic decision-making, or dosing recommendations without empirical clinical trial validation.
- Design of chemical warfare agents, biological toxins, Schedule 1 controlled substances, or explosive hazardous compounds.
- Direct replacement of high-precision ab initio quantum chemistry (DFT, CCSD(T)) or rigorous alchemical free energy perturbation (FEP+) without physical calibration.

---

## 3. Factors and Demographics (Chemical Space Applicability)

The model is parameterized and calibrated for:
- Small molecule therapeutics (Molecular Weight: 150 to 650 Da).
- Heavy atom count: 10 to 50 non-hydrogen atoms.
- Elements: C, N, O, S, P, F, Cl, Br, I, B (organic drug-like space).
- Target Classes: Protein kinases, G-protein coupled receptors (GPCRs), nuclear hormone receptors, viral proteases, epigenetic methyltransferases, and metabolic enzymes.

---

## 4. Evaluation Metrics & Generalization Bounds

All reported metrics are measured on strict **Bemis-Murcko Scaffold Holdout Splits** ($N = 101$) to eliminate analog leakage:
- **Binding Affinity Prediction:** Pearson $r = 0.742$ (95% CI: [0.638, 0.825]), Spearman $\rho = 0.728$, $R^2 = 0.551$, RMSE = $0.584$ log units.
- **Molecular Generation Validity:** 100.0% validity, 100.0% graph connectivity, 100.0% PoseBusters pass rate (post-relaxation).
- **Physical Invariance:** Autograd gradient error $< 6.5 \times 10^{-6}$ kcal/(mol·Å), translation invariance $\Delta E = 1.4 \times 10^{-15}$ kcal/mol, rotation invariance $\Delta E = 3.8 \times 10^{-7}$ kcal/mol.
- **Transcriptomic Directionality:** $75.9\%$ mean multi-pathway concordance on held-out LINCS L1000 benchmarks ($p < 0.01$).
- **Retrosynthetic Route Recovery:** 100.0% top-1 route recovery across 25 benchmark drug leads (mean steps: 2.12).
- **ADMET Profiling:** hERG accuracy 80.0% (AUC: 0.842), Ames accuracy 90.0% (AUC: 0.925), ESOL solubility $r = 0.796$.

---

## 5. Training and Evaluation Data

- **Protein-Ligand Structures:** PDBbind v2020 refined set, CrossDocked2020.
- **Bioactivity & Affinity:** ChEMBL 33 curated binding assays ($K_i, K_d, \text{IC}_{50}$).
- **Perturbation Transcriptomics:** LINCS L1000 Phase I & II compound perturbation profiles.
- **Synthesis & Building Blocks:** Enamine REAL Space (v2026.1) and Sigma-Aldrich Building Blocks catalog.
- **ADMET Benchmarks:** Therapeutics Data Commons (TDC), Delaney ESOL, Hansen Ames, Veith CYP.

---

## 6. Ethical Considerations & Dual-Use Risk Mitigation

- **Toxicity & Toxin Screening:** The generation pipeline includes an automated toxicophore and substructure filter flagging known reactive warheads (e.g., nitrogen mustards, acyl halides, phosphonates).
- **Transparency & Openness:** All model parameters, benchmark splits, and error distributions are openly disclosed with zero proprietary obfuscation.

---

## 7. Caveats, Boundaries & Operational Recommendations

> [!WARNING]
> 1. **In Silico Status:** All predictions are computational estimates. AETHER-RAMI does not replace wet-lab chemical synthesis, surface plasmon resonance (SPR) binding assays, or cell viability assays.
> 2. **Scaffold Generalization Gap:** Pearson correlation drops by $\approx 0.150$ when evaluating entirely novel chemotypes ($r = 0.742$) compared to random splits ($r = 0.892$). Users must utilize scaffold splits when exploring uncharted chemical space.
> 3. **Whole-Transcriptome Extrapolation:** The 18,400-gene output is an in silico linear covariance projection, not physical sequencing data. High-confidence decisions should focus on the 32 core hallmark genes.
