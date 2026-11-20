# DATASET CARD: AETHER-RAMI BENCHMARK & EXPERIMENTAL CORPUS
**Corpus Name:** AETHER-RAMI Benchmark, Structural & Pharmacological Corpus  
**Version:** v4.2.0-Landed  
**Release Date:** November 1, 2026  
**Standards Compliance:** Gebru et al. (2021) Datasheets for Datasets  
**Primary Format:** CSV, JSON, SDF (MDL 3D), PDB, SHA-256 Checksums  

---

## 1. Motivation

- **Purpose:** Provide an uncorrupted, leak-free, scientifically rigorous benchmarking corpus for evaluating multimodal machine learning in structure-based molecular design, biophysical potential calibration, biological pathway perturbation, retrosynthesis, and ADMET prediction.
- **Creators:** AETHER-RAMI Science & Verification Team.
- **Funding / Governance:** Open Academic & Biopharmaceutical AI Research Initiative.

---

## 2. Dataset Composition & Sub-Collections

The corpus comprises 5 primary curated subsets:

| Sub-Collection ID | Description | Count / Size | Primary Data Modalities | File Formats |
|:---|:---|:---:|:---|:---:|
| **DS-STRUCT-20** | Experimental PDB crystal structures for 20 therapeutic targets | 20 complexes (~18.4 MB) | 3D Atomic Coordinates, B-factors, Residue Maps | `.pdb`, `.cif` |
| **DS-LEADS-125** | De novo generated molecules & reference clinical drug controls | 125 compounds | SMILES, 3D SDF conformers, PoseBusters metrics | `.csv`, `.sdf` |
| **DS-SPLIT-101** | Multi-target holdout benchmark set across 4 partitioning schemes | 101 compounds | Experimental Affinity ($pK_i$), 2048-bit ECFP4 | `.csv`, `.json` |
| **DS-LINCS-16** | CellPerturb benchmark pairs from LINCS L1000 | 16 compound-cell pairs | 32 Hallmark Gene Z-scores, 7 Pathway Tags | `.csv` |
| **DS-SYNTH-20** | Enamine REAL & Sigma-Aldrich validated synthons | 20 building blocks | Reaction SMARTS, Catalog IDs, CAS, Prices | `.csv` |
| **DS-ADMET-140** | Therapeutics Data Commons (TDC) holdout test set | 140 assay points (7 x 20) | hERG, Ames, HLM, BBB, ESOL, CYP2D6, CYP3A4 | `.csv` |

---

## 3. Data Collection & Curation Process

- **Structural Target Identification:** Protein crystal structures with resolution $< 2.5\text{ \AA}$ were retrieved directly from the Worldwide Protein Data Bank (wwPDB) via verified REST APIs.
- **Bioactivity Filtering:** Assays were gathered from ChEMBL 33 and BindingDB. Assays with ambiguous units or non-standard protocols were removed.
- **Perturbation Profiles:** Level 5 moderated Z-scores (MODZ) were retrieved from the LINCS L1000 Phase II resource (GSE70138) for MCF7, A549, and PC3 cell lines treated at 10 $\mu$M for 24 hours.

---

## 4. Preprocessing, Cleaning & Standardization Pipeline

All chemical structures underwent a strict 5-stage automated sanitization workflow:
1. **Desalting & Ion Stripping:** Counterions (e.g., $\text{Na}^+$, $\text{Cl}^-$, acetate) were removed, retaining the largest contiguous covalent organic scaffold.
2. **Neutralization & Tautomer Canonicalization:** Uncharged major microspecies at physiological pH 7.4 were generated via RDKit tautomer hashers.
3. **Valence & Aromaticity Verification:** Compounds failing RDKit sanitization or exhibiting hypervalent nitrogen/sulfur atoms were rejected.
4. **3D Conformer Generation:** ETKDGv3 distance geometry followed by 500 iterations of MMFF94s conjugate-gradient energy minimization.
5. **Deduplication:** Molecules were hashed using InChIKey to eliminate duplicate stereoisomers.

---

## 5. Intended Uses and Limitations

### Appropriate Uses:
- Validating de novo generative models on 3D pocket fit and PoseBusters compliance.
- Benchmarking predictive algorithms under rigorous Bemis-Murcko scaffold shifts.
- Evaluating multi-objective optimization algorithms on real drug design trade-offs.

### Prohibited / Inappropriate Uses:
- Do not use random splits on this dataset to report benchmark superiorities over other models (leads to $\approx 15\%$ scaffold memorization inflation).
- Do not interpret linear-projected 18,400 whole-transcriptome values as wet-lab RNA sequencing measurements.

---

## 6. Distribution, Licensing & Maintenance

- **License:** Open Access under Creative Commons Attribution 4.0 International (CC BY 4.0).
- **Maintenance Schedule:** Annual updates corresponding to new wwPDB crystal structure depositions and ChEMBL database releases.
- **Integrity Verification:** Every dataset file is accompanied by a SHA-256 cryptographic hash recorded in `DATA_PROVENANCE_MANIFEST.json`.
