# AETHER-RAMI — Data Freshness & Ingestion Lifecycles

**Audit Date:** 2026-11-01 08:24:33 UTC  

---

## Source Release Cycles & Update Cadence

Scientific data sources have fundamentally distinct update lifecycles. Real-time querying in AETHER-RAMI reflects live database queries against the latest authoritative releases, avoiding synthetic or stale hardcoded records.

| Scientific Source | Primary Domain | Update Frequency | Current Authoritative Version | Data Ingestion Method |
| :--- | :--- | :--- | :--- | :--- |
| **ChEMBL** | Bioactivity & SAR | Quarterly | ChEMBL 34 (2024–2026) | Live REST API + Local Cached Payloads |
| **RCSB PDB** | Structural Biology | Weekly (Wednesdays) | Live Archive (>220,000 PDB structures) | RCSB REST Data API + mmCIF Parser |
| **PubChem** | Chemical Registry | Continuous Daily | Compound Registry (>110M compounds) | PUG-REST API with rate-limiting (5 req/s) |
| **UniProtKB** | Protein Sequences | Monthly | UniProt Release 2026_01 | REST JSON / FASTA Queries |
| **AlphaFold DB** | Structure Prediction | Periodic Releases | AlphaFold v4 Database | REST API Coordinates + pLDDT Arrays |
| **NCBI PubMed** | Scientific Literature | Continuous Daily | MEDLINE / PubMed (>36M records) | E-utilities ESearch / ESummary |
| **STRING DB** | Protein Networks | Annual | STRING v12.0 | JSON Network API with Confidence Score $\ge 700$ |
| **Reactome** | Biological Pathways | Quarterly | Reactome Release 88 | ContentService Graph API |
| **ClinicalTrials.gov** | Clinical Studies | Continuous Daily | Modern API v2 | NCT Query with Protocol Section Parsing |
| **QCArchive / QM9** | Quantum Mechanics | Benchmark Static | B3LYP/6-31G(2df,p) DFT Benchmark | In-Memory Curated Ground-Truth Matrix |
| **BindingDB** | Binding Affinity | Monthly | BindingDB Release 2026 | Multi-Target Curated Experimental Set |
| **LINCS L1000** | Perturbation Biology | Release Static | Broad LINCS Phase I/II Landmark Matrix | 978 Landmark Genes (32 Hallmark Focus) |

---

## Stale Record Detection & Expiration Rules
1. **Cache TTL:** Default time-to-live is set to 30 days. Queries older than 30 days trigger background re-validation against live APIs.
2. **Deterministic Hashing:** All queries are indexed by `sha256(json.dumps(endpoint, params))`.
3. **Provenance Header:** Every stored response records `timestamp_epoch` and `timestamp_iso` to maintain complete auditability.
