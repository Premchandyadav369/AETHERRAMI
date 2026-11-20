# AETHER-RAMI: Research Gap Analysis & Testable Hypotheses
**Standard**: Independent Methodological Rigor & Empirical Falsifiability  
**Scope**: 5 Architectural Pillars  

---

## Pillar 1: AETHER-OmniDiff-MoE (Molecular Generation)

### Gap 1.1: Mode Collapse and Duplicate Generation in Reverse Diffusion SDEs
* **Observed Limitation**: Unconditioned or weakly conditioned diffusion SDEs converge toward high-density regions of the prior, producing duplicate scaffolds (91.67% duplicate rate in v4 audit).
* **Root Cause**: The reverse-time drift term lacks an entropy-maximizing dispersion objective and relies on fallback scaffold templates when graph connectivity fails.
* **Testable Hypothesis H1.1**: Introducing continuous optimal-transport flow matching with entropy-regularized velocity fields:
  $$v_	heta(x_t, t) = v_{	ext{OT}}(x_t, t) + \lambda 
abla_x \mathcal{H}(p_t)$$
  will reduce duplicate rates from >90% to <5% while preserving chemical validity >95%.
* **Ablation Design**: Compare (a) Pure Diffusion SDE, (b) Flow Matching without Entropy Reg, (c) Flow Matching with Entropy Reg.

### Gap 1.2: Catastrophic Geometric Failure in Raw Diffusion Coordinates
* **Observed Limitation**: Raw coordinate outputs from continuous diffusion fail distance geometry (0% raw PoseBusters pass, $d_{	ext{min}} pprox 38-85$ Å).
* **Root Cause**: Coordinates are treated as unconstrained continuous variables during sampling; covalent bond constraints are only imposed post-hoc via force field relaxation.
* **Testable Hypothesis H1.2**: Coupling the flow matching vector field with an equivariant Lennard-Jones/Coulomb physical repulsive penalty during generation will drive raw atomic distances into physical covalent windows (1.2–1.6 Å) and achieve raw PoseBusters pass rates >70%.
* **Ablation Design**: Evaluate raw coordinates with (a) No vector field penalty, (b) Harmonic bond penalty, (c) Full equivariant physical penalty.

### Gap 1.3: Insufficient Interaction Conditioning in Receptor Pockets
* **Observed Limitation**: Generated ligands are placed near pocket centroids but fail to form specific directed interactions (H-bonds, salt bridges).
* **Root Cause**: Receptor features are pooled into a scalar pocket centroid rather than maintaining cross-attention to donor/acceptor pharmacophore vectors.
* **Testable Hypothesis H1.3**: Dual-scale cross-attention between ligand atom tokens and receptor residue anchor vectors will increase native interaction recovery from <25% to >65%.

---

## Pillar 2: AETHER-QuantumPotential-XL (Molecular Physics)

### Gap 2.1: Lack of Quantum Many-Body Dispersion in Empirical Potentials
* **Observed Limitation**: Lennard-Jones 12-6 pairwise potentials fail to capture non-additive 3-body dispersion and quantum electronic polarization.
* **Testable Hypothesis H2.1**: Incorporating equivariant higher-order message passing with atomic environment vectors will reduce conformational energy MAE against QM9/QCArchive reference calculations from >8.5 kcal/mol to <2.5 kcal/mol.

### Gap 2.2: Fixed Partial Charge Electrostatic Inaccuracy
* **Observed Limitation**: Static element-level partial charges fail under variable chemical environments and protonation states.
* **Testable Hypothesis H2.2**: Predicting dynamic conformation-dependent atomic partial charges via an invariant electronegativity equilibration layer will reduce dipole moment errors from >1.2 Debye to <0.3 Debye.

### Gap 2.3: Force Gradient Instability in Extended MD
* **Observed Limitation**: Empirical potentials without bonded angle/torsion terms experience bond dissociation during unconstrained dynamics.
* **Testable Hypothesis H2.3**: Integrating conservative bonded harmonic potentials with smooth non-bonded switching functions will maintain structural stability (RMSD < 0.5 Å) across 500-fs to 1-ps Langevin trajectories.

---

## Pillar 3: RAMI-CellPerturb-scGPT (Systems Biology)

### Gap 3.1: 32-Gene Representation Cannot Capture Transcriptome-Wide Dynamics
* **Observed Limitation**: A 32-gene panel is insufficient to predict off-target toxicity and pleiotropic phenotypic outcomes.
* **Testable Hypothesis H3.1**: Modeling the 978 LINCS L1000 landmark genes using a compound-conditioned Gene Regulatory Network (GRN) graph attention architecture will predict differential expression with Pearson $r > 0.65$ across unseen compounds.

### Gap 3.2: Generalization Failure on Unseen Chemical Perturbations
* **Observed Limitation**: Standard MLPs overfit to training chemical scaffolds and fail when tested on novel drug classes.
* **Testable Hypothesis H3.2**: Combining pretrained molecular foundation embeddings (ChemBERTa/Morgan) with STRING protein-protein interaction priors will improve out-of-distribution Pearson $r$ by >20% over linear baselines.

### Gap 3.3: Uncalibrated Biological Uncertainty
* **Observed Limitation**: Point predictions of gene expression offer no confidence intervals for experimental validation decisions.
* **Testable Hypothesis H3.3**: Implementing Monte Carlo dropout ensemble variance estimation will calibrate predictive intervals (Coverage >90% at $lpha=0.10$).

---

## Pillar 4: AETHER-SynthonSpace-MoE (Synthesis Intelligence)

### Gap 4.1: Rule-Based Retrosynthesis Rigidness
* **Observed Limitation**: A static library of 256 SMARTS rules fails when novel bond disconnections are required.
* **Testable Hypothesis H4.1**: A learned atom-pair reactivity graph neural network predicting reaction centers will increase top-1 retrosynthetic disconnection accuracy from 42% (rule-only) to >60% on USPTO-50K test sets.

### Gap 4.2: Lack of Multi-Step Route Search
* **Observed Limitation**: Single-step retrosynthesis does not verify that precursors are commercially available building blocks.
* **Testable Hypothesis H4.2**: Coupling learned reaction predictions with Monte Carlo Tree Search (MCTS) constrained by vendor catalog building blocks will achieve complete multi-step route solutions for >80% of drug leads within $\le 4$ steps.

### Gap 4.3: Unsubstantiated Synthetic Yields
* **Observed Limitation**: Heuristic yield scores (e.g. static 75%) misrepresent actual chemical feasibility.
* **Testable Hypothesis H4.3**: Calibrating yield predictions using reaction condition encodings (solvent, temperature, catalyst) will provide realistic synthetic feasibility scoring.

---

## Pillar 5: RAMI-FrontierPareto (ADMET & Optimization)

### Gap 5.1: Scaffold-Shift Uncertainty Failure
* **Observed Limitation**: Standard random test splits underestimate prediction errors on novel chemical scaffolds.
* **Testable Hypothesis H5.1**: Applying split-conformal prediction with Morgan fingerprint Tanimoto distance to nearest training neighbor will guarantee valid 90% coverage intervals under Bemis-Murcko scaffold shifts.

### Gap 5.2: Disconnect Between Uncertainty and Multi-Objective Search
* **Observed Limitation**: NSGA-II treats uncertain predicted values as deterministic ground truth, selecting high-uncertainty outliers.
* **Testable Hypothesis H5.2**: Replacing deterministic objective evaluation with Upper/Lower Confidence Bound (UCB/LCB) Pareto dominance will increase the empirical success rate of prioritized leads by >30%.

### Gap 5.3: Absence of Active Learning Feedback
* **Observed Limitation**: Optimization operates in a single batch without iteratively querying high-information candidates.
* **Testable Hypothesis H5.3**: A batch active learning loop guided by maximum information gain and scaffold diversity will converge to optimal Pareto frontiers with 40% fewer objective evaluations.
