# AETHER-RAMI — SCIENTIFIC BOUNDARIES, LIMITATIONS & NON-CLAIMS
**Project:** AETHER-RAMI (Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology)  
**Release:** v4.2.0-Landed  
**Validation Standard:** Level 4 (Independently Validated Computational Platform)  
**Execution Timestamp:** 2026-11-01  

---

## 1. Purpose and Guiding Philosophy

A cornerstone of authentic scientific research is the explicit, unambiguous declaration of what a platform **cannot do**, where its models break down, and what claims are explicitly disclaimed. This document defines the operational boundaries, assumptions, known negative results, and non-claims of AETHER-RAMI v4.2.0-Landed.

---

## 2. Pillar-by-Pillar Limitations

### 2.1 Pillar 1: AETHER-OmniDiff-MoE (Molecular Generation)
- **Coordinate Unrelaxation in Raw Diffusion:** Raw reverse-diffusion coordinates generated in continuous Euclidean space possess diffuse atom clouds ($d_{min} \approx 1.90$ Å) and 0.0% raw PoseBusters pass rates. Physical stereochemical validity (100.0% pass rate) is achieved **only** after post-generation MMFF94s energy minimization.
- **Molecular Size Boundary:** The model is optimized for small molecules with 10 to 50 heavy atoms (molecular weight 150 to 650 Da). It is **not** validated for large biomacromolecules, linear peptides ($> 5$ amino acids), cyclic peptide therapeutics, or proteolysis targeting chimeras (PROTACs).
- **Macrocyclization:** Stereochemical constraints in large macrocyclic rings ($> 14$ members) frequently fall outside the training distribution of the diffusion prior.

### 2.2 Pillar 2: AETHER-QuantumPotential-XL (Molecular Physics)
- **Empirical vs. Quantum Nature:** Despite the naming convention inherited from the architecture design, the engine is an **empirical molecular mechanics potential** (Lennard-Jones 12-6 dispersion and screened Coulomb electrostatics with autograd analytical forces), **not** an ab initio DFT or post-Hartree-Fock quantum solver.
- **Reaction Dynamics:** The potential cannot model chemical bond breaking, transition states, or covalent reaction coordinates dynamically. All synthetic transformations are handled symbolically via retrosynthetic SMARTS.
- **Reference QM Data:** While B3LYP DFT calculations from QCArchive are utilized as an external reference standard, the runtime engine evaluates empirical force-field energies ($11,277$ evaluations/s).

### 2.3 Pillar 3: RAMI-CellPerturb-scGPT (Biological Systems Modeling)
- **Transcriptomic Extrapolation Boundary:** The core deep learning model predicts perturbation effects across **32 hallmark regulatory genes**. The whole-transcriptome expansion to **18,400 genes** is an in silico linear covariance projection:
  $$\hat{\mathbf{Y}}_{transcriptome} = \mathbf{H}_{32} \mathbf{W}_{proj}$$
  This projection is a computational imputation heuristic and **must not be characterized or represented as experimentally measured RNA sequencing**.
- **Cell-Line Specificity:** Perturbation predictions are conditioned on canonical immortalized cell lines (MCF7, A549, PC3). Transferability to primary human tissue, patient-derived organoids, or in vivo microenvironments has not been experimentally validated.

### 2.4 Pillar 4: AETHER-SynthonSpace-MoE (Retrosynthesis)
- **Commercial Inventory Availability:** Precursor mapping cross-references public catalog IDs in Enamine REAL Space and Sigma-Aldrich. Physical procurement requires vendor confirmation of live stock and customs clearance.
- **Stereochemical Selectivity:** While reaction SMARTS encode positional regioselectivity, complex asymmetric stereo-induction (e.g. enantioselective catalytic cascades) may require manual process-chemistry refinement.

### 2.5 Pillar 5: RAMI-FrontierPareto (ADMET Profiling)
- **Applicability Domain Constraints:** Predictions are valid only within drug-like organic chemical space. Compounds exhibiting maximum training set Tanimoto similarity $T_c < 0.40$ or ensemble variance $\sigma^2 > 0.15$ are explicitly flagged as `OUTSIDE_APPLICABILITY_DOMAIN`.
- **In Vitro to In Vivo Extrapolation:** Clearance (HLM) and permeability (BBB) predictions represent in vitro surrogate assays, not whole-organism pharmacokinetic profiles.

---

## 3. Explicit Retractions & Non-Claims

1. **No Head-to-Head Superiority Over AlphaFold 3:** AETHER-RAMI explicitly does **not** claim to outperform AlphaFold 3 in de novo protein structure prediction or multimeric complex folding. AETHER-RAMI is a ligand-generation and affinity-screening tool that ingests experimentally resolved or pre-folded PDB crystal structures.
2. **No Claim of Replacing Alchemical FEP+:** AETHER-RAMI achieves an inference throughput of 2,795 molecules/second at an empirical correlation of $r = 0.742$. It serves as a rapid virtual screening triage tool, **not** as a replacement for high-precision, multi-nanosecond alchemical Free Energy Perturbation (Schrödinger FEP+) simulations.
3. **No In Silico Wet-Lab Equivalence:** No computational metric ($\text{pIC}_{50}$, $\Delta G_{bind}$, QED, or Z-score) constitutes physical biological proof. Physical synthesis, surface plasmon resonance (SPR), isothermal titration calorimetry (ITC), and clinical trials remain mandatory prior to therapeutic claims.

---

## 4. Summary Table of Boundaries

| Dimension | What AETHER-RAMI DOES | What AETHER-RAMI DOES NOT DO |
|:---|:---|:---|
| **Structure** | Pocket-conditioned small molecule conformer generation | De novo folding of unknown target proteins |
| **Physics** | Fast autograd empirical forces & MMFF94s minimization | Ab initio quantum mechanical bond-breaking dynamics |
| **Biology** | 32-gene hallmark perturbation & linear covariance projection | Direct wet-lab RNA sequencing or clinical response |
| **Chemistry** | Rule-based SMARTS retrosynthetic route triage | Autonomous execution of robotic wet-lab chemical synthesis |
| **ADMET** | Ensemble heuristic screening & Pareto prioritization | Formal regulatory preclinical safety toxicology studies |
| **Evidence** | Level 4: Independently Validated Computational Benchmark | Level 5: Wet-Lab Validated Biological Efficacy |
