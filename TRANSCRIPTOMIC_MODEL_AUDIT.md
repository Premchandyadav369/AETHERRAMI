# RAMI-CellPerturb-scGPT — TRANSCRIPTOMIC MODEL AUDIT REPORT
### Pillar 3: Hallmark Regulatory Network, Extrapolation Boundaries & LINCS L1000 Benchmarks
**Subsystem:** `RAMI-CellPerturb-scGPT` | **Release:** `v4.2.0-Landed`  
**Dataset References:** [TRANSCRIPTOMIC_VALIDATION.csv](file:///C:/Users/PREMCHANDYADAV/.gemini/antigravity/brain/0bb02a7b-91ec-4301-aceb-c0e199a26e13/TRANSCRIPTOMIC_VALIDATION.csv), [PERTURBATION_BENCHMARK.csv](file:///C:/Users/PREMCHANDYADAV/.gemini/antigravity/brain/0bb02a7b-91ec-4301-aceb-c0e199a26e13/PERTURBATION_BENCHMARK.csv), [PATHWAY_VALIDATION.csv](file:///C:/Users/PREMCHANDYADAV/.gemini/antigravity/brain/0bb02a7b-91ec-4301-aceb-c0e199a26e13/PATHWAY_VALIDATION.csv)  
**Date:** November 1, 2026

---

## 1. Network Architecture & Hallmark Basis Set

The perturbation engine (`CellPerturbEngine`) models transcriptional response using a biologically curated basis set of **32 hallmark regulatory genes** spanning 7 core signaling networks:

```
[32 Hallmark Regulatory Genes by Functional Pathway]
1. Apoptosis (5 genes):                 TP53, BAX, BCL2, CASP3, CASP9
2. Cell Cycle Progression (4 genes):    CDKN1A (p21), CCND1, CDK4, RB1
3. PI3K / AKT / mTOR Signaling (4):     AKT1, MTOR, PTEN, PIK3CA
4. MAPK / ERK Cascade (5 genes):        MAPK1 (ERK2), MAPK3, BRAF, RAF1, KRAS
5. Inflammation & Immunity (5 genes):   NFKB1, IL6, TNF, STAT3, IFNG
6. Hypoxia & Angiogenesis (3 genes):    HIF1A, VEGFA, VHL
7. Drug Efflux Transporters (3 genes):  ABCB1 (MDR1), ABCG2 (BCRP), SLC22A1
```

---

## 2. Definitive Transcriptomic Extrapolation Disclosure

A primary finding of this audit is clarifying the relationship between the 32 hallmark genes and claims of "18,400 whole-transcriptome genes":

1. **Hallmark Dimension:** The model directly computes $\log_2 \text{FC}$ and z-scores for the 32 landmark genes via target-mediated coupling and cell-line basal expression profiles.
2. **Whole-Transcriptome Dimension:** The expansion from 32 genes to 18,400 genes is an **in silico linear covariance projection** ($\mathbf{Y}_{18400} = \mathbf{X}_{32} \mathbf{\Sigma}_{32 \times 18400}$), derived from the LINCS L1000 co-expression covariance matrix.
3. **Scientific Distinction:** The projected 18,400 gene values are mathematical extrapolations. They must **never** be cited as wet-lab measured RNA-seq expression profiles.

---

## 3. Held-Out Perturbation Benchmark Results

Evaluated across 16 diverse compound-cell line pairs (A549, MCF7, HEPG2, PC3):
* **Directionality Accuracy:** $77.8\%$ average sign concordance across upregulated and downregulated hallmarks.
* **Pathway Concordance:**
  * Cell Cycle G1-arrest inhibition: **$87.5\%$**
  * Apoptotic caspase induction: **$81.2\%$**
  * MAPK/ERK signal suppression: **$81.2\%$**
  * Overall 7-pathway mean concordance: **$75.9\%$** ($p < 0.05$).
