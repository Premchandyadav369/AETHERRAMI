# Assay Protocol: Tier-1 In Vitro ADME & Safety Profiling
**Protocol ID:** PROTO-IICT-BIO-ADME-001
**Facility:** Preclinical DMPK & Toxicology Center, CSIR-IICT

---

## 1. Liver Microsomal Stability (HLM & MLM)
- 1.0 $\mu$M test compound incubated with 0.5 mg/mL pooled human or CD-1 mouse liver microsomes in 100 mM potassium phosphate buffer (pH 7.4) with 1.0 mM NADPH at 37 °C.
- Samples taken at 0, 5, 15, 30, 45, 60 min, quenched with cold acetonitrile containing internal standard (Tolbutamide).
- Quantified by LC-MS/MS (Shimadzu LC-30AD + AB Sciex Triple Quad 6500+).
- Calculate elimination rate constant ($k_{el}$), half-life ($t_{1/2}$), and intrinsic clearance ($CL_{int,app} = \frac{V \times 0.693}{t_{1/2}}$).

## 2. Automated Patch-Clamp hERG Assay
- SyncroPatch 384PE automated patch clamp system measuring $I_{Kr}$ potassium current in CHO-hERG cells.
- 6-point concentration range: 0.1, 0.3, 1.0, 3.0, 10.0, 30.0 $\mu$M.
- Compounds passing safety threshold: hERG $IC_{50} > 30.0\ \mu\text{M}$.

## 3. Caco-2 Bidirectional Permeability
- Caco-2 monolayers grown on 24-well Transwell inserts (0.4 $\mu$m pore size, 21-day differentiation; TEER $>400\ \Omega\cdot\text{cm}^2$).
- Measure apical-to-basolateral ($A \rightarrow B$) and basolateral-to-apical ($B \rightarrow A$) flux at 37 °C over 120 min.
- Calculate apparent permeability:
  $$P_{app} = \frac{dQ/dt}{A \times C_0}$$
