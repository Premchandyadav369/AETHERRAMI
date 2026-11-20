"""
Master Registry for AETHER-RAMI Scientific Data Adapters.
Manages adapter lifecycle, health checks, data freshness, and provenance manifests.
"""

import os
import json
import csv
import time
from datetime import datetime, timezone
from typing import Dict, Any, List

from .chembl_adapter import ChEMBLAdapter
from .pdb_adapter import PDBAdapter
from .molecular_adapters import PubChemAdapter, UniProtAdapter, AlphaFoldAdapter
from .pathway_and_literature_adapters import PubMedAdapter, StringDBAdapter, ReactomeAdapter, ClinicalTrialsAdapter
from .benchmark_data_adapters import QCArchiveAdapter, BindingDBAdapter, LINCSDepMapAdapter


class ScienceDataRegistry:
    """Master registry managing all external data adapters and provenance."""

    def __init__(self):
        self.adapters = {
            "ChEMBL": ChEMBLAdapter(),
            "RCSB_PDB": PDBAdapter(),
            "PubChem": PubChemAdapter(),
            "UniProt": UniProtAdapter(),
            "AlphaFold_DB": AlphaFoldAdapter(),
            "PubMed": PubMedAdapter(),
            "STRING_DB": StringDBAdapter(),
            "Reactome": ReactomeAdapter(),
            "ClinicalTrials": ClinicalTrialsAdapter(),
            "QCArchive": QCArchiveAdapter(),
            "BindingDB": BindingDBAdapter(),
            "LINCS_DepMap": LINCSDepMapAdapter(),
        }

    def run_all_health_checks(self) -> Dict[str, Any]:
        results = {}
        for name, adapter in self.adapters.items():
            try:
                t0 = time.time()
                health = adapter.check_health()
                latency_ms = round((time.time() - t0) * 1000, 2)
                health["latency_ms"] = latency_ms
                results[name] = health
            except Exception as e:
                results[name] = {
                    "status": "OFFLINE_FALLBACK",
                    "source": adapter.source_name,
                    "error": str(e),
                    "latency_ms": 0.0
                }
        return results

    def generate_live_registry_json(self, output_path: str) -> Dict[str, Any]:
        health_results = self.run_all_health_checks()
        now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        registry_data = {
            "registry_version": "1.0.0",
            "last_synced_utc": now_iso,
            "connected_sources_count": len(self.adapters),
            "sources": {}
        }
        for name, adapter in self.adapters.items():
            h = health_results.get(name, {})
            registry_data["sources"][name] = {
                "source_name": adapter.source_name,
                "base_url": adapter.base_url,
                "update_frequency": adapter.update_frequency,
                "status": h.get("status", "UNKNOWN"),
                "latency_ms": h.get("latency_ms", 0.0),
                "cached": h.get("cached", False),
                "details": h.get("details", {})
            }
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(registry_data, f, indent=2)
        return registry_data

    def generate_provenance_manifest_json(self, output_path: str) -> Dict[str, Any]:
        now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        manifest = {
            "manifest_version": "1.0.0",
            "timestamp_utc": now_iso,
            "data_governance": "AETHER-RAMI Scientific Verification Protocol",
            "source_provenance": {
                "ChEMBL": {"type": "REST API", "license": "CC BY-SA 3.0", "citation": "Mendez et al., Nucleic Acids Res 2019"},
                "RCSB_PDB": {"type": "REST API", "license": "CC0 1.0", "citation": "Berman et al., Nucleic Acids Res 2000"},
                "PubChem": {"type": "PUG-REST API", "license": "Public Domain (NIH)", "citation": "Kim et al., Nucleic Acids Res 2023"},
                "UniProt": {"type": "REST API", "license": "CC BY 4.0", "citation": "UniProt Consortium, Nucleic Acids Res 2023"},
                "AlphaFold_DB": {"type": "REST API", "license": "CC BY 4.0", "citation": "Varadi et al., Nucleic Acids Res 2022"},
                "PubMed": {"type": "E-utilities", "license": "NLM / NCBI Terms", "citation": "Sayers et al., Nucleic Acids Res 2022"},
                "STRING_DB": {"type": "REST API", "license": "CC BY 4.0", "citation": "Szklarczyk et al., Nucleic Acids Res 2023"},
                "Reactome": {"type": "REST API", "license": "CC BY 4.0", "citation": "Gillespie et al., Nucleic Acids Res 2022"},
                "ClinicalTrials": {"type": "API v2", "license": "Public Domain", "citation": "U.S. National Library of Medicine"},
                "QCArchive": {"type": "Reference Benchmark", "license": "BSD-3-Clause", "citation": "Smith et al., J Chem Phys 2021"},
                "BindingDB": {"type": "Curated Dataset", "license": "CC BY 3.0", "citation": "Gilson et al., Nucleic Acids Res 2016"},
                "LINCS_DepMap": {"type": "Processed Matrix", "license": "CC BY 4.0", "citation": "Subramanian et al., Cell 2017; Tsherniak et al., Cell 2017"}
            }
        }
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(manifest, f, indent=2)
        return manifest

    def generate_external_dataset_catalog_csv(self, output_path: str):
        rows = [
            ["Dataset Name", "Source Domain", "Application in AETHER-RAMI", "Format / Protocol", "Primary Identifiers", "Licensing"],
            ["ChEMBL 34", "Bioactivity & SAR", "Inhibitor IC50/Ki labels, target binding profiles", "REST JSON", "CHEMBL_ID, SMILES", "CC BY-SA 3.0"],
            ["RCSB Protein Data Bank", "Structural Biology", "Target 3D holo-structures, cofactors, active site pockets", "mmCIF / PDB REST", "PDB ID (4-char)", "CC0 1.0"],
            ["PubChem Compound", "Cheminformatics", "Standardized chemical properties, 2D structures, safety flags", "PUG-REST JSON", "CID, Canonical SMILES", "Public Domain"],
            ["UniProtKB", "Protein Sequence & Function", "Canonical sequences, organism taxonomy, functional residues", "REST JSON / FASTA", "UniProt Accession", "CC BY 4.0"],
            ["AlphaFold Structure DB", "Structure Prediction", "High-accuracy protein models for orphan targets (pLDDT)", "REST API / CIF", "UniProt Accession", "CC BY 4.0"],
            ["NCBI PubMed", "Biomedical Literature", "Peer-reviewed target validation & mechanism of action", "E-utilities XML/JSON", "PMID, PMCID, DOI", "Public Domain"],
            ["STRING DB v12", "Systems Pharmacology", "Protein interaction networks, functional modules", "JSON API / TSV", "NCBI TaxID, Ensembl ID", "CC BY 4.0"],
            ["Reactome v88", "Pathways & Phenotypes", "Biological pathway enrichment & signaling networks", "REST JSON", "Reactome Stable ID", "CC BY 4.0"],
            ["ClinicalTrials.gov v2", "Translational Medicine", "Clinical development status, indications, phases", "REST API v2", "NCT Number", "Public Domain"],
            ["QM9 / QCArchive", "Quantum Mechanics", "B3LYP DFT ground truth energies, dipoles, geometries", "HDF5 / JSON", "InChIKey, SMILES", "BSD-3-Clause"],
            ["BindingDB 2026", "Binding Affinity", "Independent target-ligand binding measurements (Kd, Ki)", "TSV / REST", "BindingDB Monomer ID", "CC BY 3.0"],
            ["LINCS L1000 / DepMap", "Perturbational Biology", "Transcriptomic drug signatures & CRISPR knockout fitness", "GCTx / CSV / REST", "Broad Pert ID, Gene Symbol", "CC BY 4.0"],
        ]
        with open(output_path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerows(rows)
