# AETHER-RAMI: Formal Dataset Card
## Structured Dataset Documentation following Gebru et al. (2021)
**Dataset Identity:** AETHER-RAMI Preclinical Portfolio & Training Corpora | **Version:** 4.2.0

---

### 1. Motivation
* **Purpose:** To provide a scientifically rigorous, leakage-controlled benchmark for structure-based drug discovery, multi-target selectivity, transcriptomic perturbation, and retrosynthetic route planning.

### 2. Dataset Composition & Sources
The AETHER-RAMI system utilizes multi-source curated scientific databases:
1. **PDBbind (v2020 Refined & Core Sets):** High-resolution crystallographic protein-ligand complexes ($N = 5,316$ complexes) filtered for resolution $\le 2.5$ Å and experimentally determined $K_d, K_i, IC_{50}$ values.
2. **ChEMBL 34:** Bioactivity annotations across the 24 target protein families ($N > 450,000$ compound-target assays).
3. **BindingDB & PubChem BioAssay:** Secondary cross-validation data for target selectivity and counter-target off-target activities.
4. **LINCS L1000 / CMap:** Whole-transcriptome cellular perturbation profiles ($N > 1.3	ext{M}$ gene expression profiles across diverse cell lines).
5. **Enamine REAL Space & Building Block Directory:** $pprox 38	ext{ Billion}$ synthetically accessible compounds and commercially available synthons.
6. **24-Target Portfolio:** 24 disease targets spanning oncology, neurodegeneration, metabolic disorders, infectious diseases, and autoimmune conditions with repaired crystallographic models.

### 3. Preprocessing, Cleaning & Leakage Control
* **Target-Aware Split:** Scaffold-disjoint and sequence-similarity clustering (UniProt sequence identity $< 30\%$ between training and validation folds) to prevent data leakage.
* **Cofactor Preservation:** Catalytic water networks, metal ions ($	ext{Zn}^{2+}, 	ext{Mg}^{2+}$), and cofactors ($	ext{NADH}, 	ext{GDP}$) were preserved for holo-complex modeling.
* **Sanitization:** All SMILES were standardized using RDKit (valence correction, salt stripping, neutralizing charges where appropriate).

### 4. Uses & Maintenance
* **Intended Uses:** Training and benchmarking structure-based generative models, scoring functions, and retrosynthetic planners.
* **Maintenance:** Curated and maintained by the AETHER-RAMI Discovery Consortium.
