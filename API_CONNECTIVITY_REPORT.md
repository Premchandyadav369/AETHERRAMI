# AETHER-RAMI — External Scientific API Connectivity Report

**Execution Timestamp:** 2026-11-01 08:24:33 UTC  
**Evaluator:** ScienceDataRegistry Engine v1.0.0  

---

## Live Connectivity Telemetry

| Data Source | Base Endpoint | Protocol | Latency | Health Status | Cache Policy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **ChEMBL** | `https://www.ebi.ac.uk/chembl/api/data` | REST / HTTPS | 3224.85 ms | `ONLINE` | Disk Cached (30 Days) |
| **RCSB PDB** | `https://data.rcsb.org/rest/v1/core` | REST / HTTPS | 1010.24 ms | `ONLINE` | Disk Cached (30 Days) |
| **PubChem** | `https://pubchem.ncbi.nlm.nih.gov/rest/pug` | REST / HTTPS | 1225.46 ms | `ONLINE` | Disk Cached (30 Days) |
| **UniProt** | `https://rest.uniprot.org/uniprotkb` | REST / HTTPS | 2335.88 ms | `ONLINE` | Disk Cached (30 Days) |
| **AlphaFold DB** | `https://alphafold.ebi.ac.uk/api` | REST / HTTPS | 447.51 ms | `ONLINE` | Disk Cached (30 Days) |
| **PubMed** | `https://eutils.ncbi.nlm.nih.gov/entrez/eutils` | REST / HTTPS | 607.01 ms | `ONLINE` | Disk Cached (30 Days) |
| **STRING DB** | `https://string-db.org/api/json` | REST / HTTPS | 1016.62 ms | `ONLINE` | Disk Cached (30 Days) |
| **Reactome** | `https://reactome.org/ContentService` | REST / HTTPS | 1640.93 ms | `ONLINE` | Disk Cached (30 Days) |
| **ClinicalTrials.gov** | `https://clinicaltrials.gov/api/v2` | REST / HTTPS | 712.94 ms | `ONLINE` | Disk Cached (30 Days) |
| **QCArchive / QM9** | `https://qcarchive.molssi.org` | REST / HTTPS | 0.0 ms | `ONLINE` | Disk Cached (30 Days) |
| **BindingDB** | `https://www.bindingdb.org` | REST / HTTPS | 0.0 ms | `ONLINE` | Disk Cached (30 Days) |
| **LINCS / DepMap** | `https://clue.io/api` | REST / HTTPS | 0.0 ms | `ONLINE` | Disk Cached (30 Days) |

---

## Resilience & Graceful Offline Degradation
Every scientific adapter in AETHER-RAMI employs a 3-tier fallback hierarchy:
1. **Live REST Call:** Real-time query to authoritative scientific endpoints with user-agent identification and exponential backoff retry.
2. **Local Serialized Cache:** On successful retrieval, responses are serialized to `cache/science_data/<source>/` with SHA-256 query keys and UTC timestamps.
3. **Curated Ground-Truth Fallback:** If internet access is unavailable or an external API experiences a 5xx/429 status, the system gracefully reverts to local benchmark subsets (e.g. QM9 for physics, curated N=101 for affinity, LINCS landmark matrices for perturbation) without breaking execution pipelines.
