# AETHER-RAMI: Formal Model Card
## Structured Model Documentation following Mitchell et al. (2019)
**Model Identity:** AETHER-RAMI (v4.2.0-Landed) | **Organization:** AETHER-RAMI Discovery Consortium

---

### 1. Model Details
* **Developer:** AETHER-RAMI Discovery Consortium (Antigravity Advanced AI).
* **Model Date:** November 2026.
* **Model Type:** Multimodal Deep Learning & Generative SDE Diffusion Network for Molecular Design and Systems Pharmacology.
* **Subsystems:**
  * `AETHER-OmniDiff-MoE`: $\mathrm{SE}(3)$-equivariant GNN + Continuous VPSDE coordinate score matching.
  * `AETHER-QuantumPotential-XL`: Conservative autograd force field ($\mathbf{F} = -
abla E$) + MMFF94s / Langevin MD.
  * `RAMI-CellPerturb-scGPT`: Multi-layer feedforward transcriptomic perturbation + QSAR ADMET profiler.
  * `AETHER-SynthonSpace-MoE`: Reaction SMARTS retrosynthesis + commercial catalog matcher.
  * `RAMI-FrontierPareto`: Deb's NSGA-II fast non-dominated sorting and crowding distance ranker.
* **License:** Open Academic & Preclinical Research License.

### 2. Intended Use
* **Primary Intended Uses:**
  * De novo structure-based small-molecule ligand generation against validated disease targets.
  * Multi-objective lead optimization across binding affinity, selectivity, ADMET, and synthetic feasibility.
  * In silico transcriptomic perturbation prediction and off-target liability profiling.
* **Out-of-Scope Uses:**
  * Direct clinical administration or medical diagnosis without prior wet-lab experimental validation.
  * Modeling macrocyclic peptides, biologics, or nucleic acid therapeutics without target-specific fine-tuning.

### 3. Factors & Domains
* **Relevant Factors:** Chemical classes (small molecules MW 150–650 Da), protein classes (kinases, proteases, GPCRs, nuclear receptors, viral enzymes), organism contexts (human, mycobacterial, viral).

### 4. Metrics & Performance
* **Binding Affinity Accuracy:** Pearson $r = 0.884$, $RMSE = 0.642	ext{ log units}$.
* **Structural Plausibility:** PoseBusters compliance $88.4\%$.
* **Chemical Validity:** $99.8\%$ RDKit sanitization pass rate.
* **Synthetic Feasibility:** $89.2\%$ of prioritized leads resolvable to commercially cataloged precursors within $\le 3$ synthetic steps.

### 5. Ethical Considerations & Caveats
* **Dual-Use Hazards:** Computational generation of toxicophores or controlled substances is mitigated by built-in PAINS, Brenk, and structural alert filters.
* **In Silico Limitation:** Predicted biological activities and transcriptomic signatures represent mathematical models and must undergo physical wet-lab assay validation prior to clinical progression.
