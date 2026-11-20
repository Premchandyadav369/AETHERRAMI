# Google DeepMind Science Skills Inventory — AETHER-RAMI Integration

**Status:** ACTIVATED & VALIDATED  
**Host Framework:** Google Antigravity Science Plugin & Python Data Adapters  
**Execution Environment:** Windows x64 | Python 3.11 | uv 0.12.13  
**Audit Timestamp:** 2026-11-01 08:24:33 UTC

---

## 1. Activated Science Skills & Tooling

The following Google DeepMind Science Skills located in `C:\Users\PREMCHANDYADAV\.gemini\config\plugins\science\skills` have been audited, integrated, and wrapped into the AETHER-RAMI execution engine:

| Science Skill Name | Underlying API / Engine | AETHER-RAMI Subsystem | Functional Application | Status |
| :--- | :--- | :--- | :--- | :--- |
| `chembl-database` | EMBL-EBI ChEMBL REST API (`chembl_api.py`) | Pillar 5 (Pareto) & Pillar 3 (ADMET) | Live bioactivity ($IC_{50}$, $K_i$), target binding, mechanism of action | **ACTIVE** |
| `pubchem-database` | NCBI PubChem PUG-REST (`pubchem_api.py`) | Pillar 1 (OmniDiff) & Core Chemistry | 2D/3D chemical structures, properties, safety alerts, CID lookup | **ACTIVE** |
| `pdb-database` | RCSB Protein Data Bank REST (`fetch_pdb_metadata.py`) | Pillar 1 (OmniDiff) & Pillar 2 (Physics) | 3D experimental structures, resolution, chain IDs, cofactors | **ACTIVE** |
| `alphafold-database-fetch-and-analyze` | AlphaFold DB REST (`fetch_structure.py`) | Pillar 1 (OmniDiff) & Target Audit | Predicted structures, pLDDT per-residue confidence, PAE matrices | **ACTIVE** |
| `uniprot-database` | UniProtKB REST (`uniprot_tools.py`) | Target Management & Biology | Primary accession, amino acid sequences, mutations, organism | **ACTIVE** |
| `pubmed-database` | NCBI E-utilities (`pubmed_api.py`) | Literature & Validation | Peer-reviewed citations, PMIDs, trial reports, mechanism papers | **ACTIVE** |
| `string-database` | STRING API (`string_cli.py`) | Pillar 3 (CellPerturb) | Protein-protein interaction networks, physical binding partners | **ACTIVE** |
| `reactome-database` | Reactome Content Service (`reactome_analysis.py`) | Pillar 3 (CellPerturb) | Canonical biological pathways, signaling networks, enrichment | **ACTIVE** |
| `clinical-trials-database` | ClinicalTrials.gov API v2 (`clinical_trials_api.py`) | Clinical Prioritization | Clinical study phases, trial status, indications, NCT identifiers | **ACTIVE** |
| `foldseek-structural-search` | Foldseek API (`search.py`) | Target Exploration | 3D structural homology search across PDB and AlphaFold DB | **ACTIVE** |
| `alphagenome-single-variant-analysis` | AlphaGenome Atlas API | Pillar 3 (CellPerturb) | Variant effects on expression, chromatin accessibility, splicing | **ACTIVE** |

---

## 2. Licensing Compliance

In compliance with the DeepMind Science Skills prerequisites, license notification files have been created in `.licenses/`:
- `chembl_database_LICENSE.txt` (CC BY-SA 3.0)
- `pdb_database_LICENSE.txt` (CC0 1.0)
- `pubchem_database_LICENSE.txt` (Public Domain)
- `uniprot_database_LICENSE.txt` (CC BY 4.0)
- `alphafold_database_fetch_and_analyze_LICENSE.txt` (CC BY 4.0)
- `pubmed_database_LICENSE.txt` (Public Domain)
- `string_database_LICENSE.txt` (CC BY 4.0)
- `reactome_database_LICENSE.txt` (CC BY 4.0)
