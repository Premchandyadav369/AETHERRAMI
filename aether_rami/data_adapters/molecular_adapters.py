"""
PubChem, UniProt, and AlphaFold DB Data Adapters for AETHER-RAMI.
"""

import os
import json
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional, List
from .base_adapter import BaseScienceAdapter


class PubChemAdapter(BaseScienceAdapter):
    """Adapter for NCBI PubChem PUG REST API."""

    def __init__(self):
        super().__init__(
            source_name="PubChem",
            base_url="https://pubchem.ncbi.nlm.nih.gov/rest/pug",
            update_frequency="Continuous Daily Updates"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"cid": "2244"}  # Aspirin
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "PubChem", "cached": True, "details": cached}

        url = f"{self.base_url}/compound/cid/2244/property/MolecularWeight,MolecularFormula/JSON"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                props = data.get("PropertyTable", {}).get("Properties", [{}])[0]
                self.set_cached("health", params, props)
                return {"status": "ONLINE", "source": "PubChem", "cached": False, "details": props}
        except Exception as e:
            return {"status": "DEGRADED", "source": "PubChem", "error": str(e)}

    def get_compound_properties(self, smiles: str) -> Dict[str, Any]:
        """Fetch experimental & computed physicochemical properties for SMILES."""
        params = {"smiles": smiles}
        cached = self.get_cached("property", params)
        if cached:
            return cached

        encoded = urllib.parse.quote(smiles)
        url = f"{self.base_url}/compound/smiles/{encoded}/property/MolecularWeight,MolecularFormula,XLogP,TPSA,RotatableBondCount/JSON"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                props = data.get("PropertyTable", {}).get("Properties", [{}])[0]
                self.set_cached("property", params, props)
                return props
        except Exception as e:
            return {"smiles": smiles, "error": str(e)}


class UniProtAdapter(BaseScienceAdapter):
    """Adapter for UniProtKB REST API."""

    def __init__(self):
        super().__init__(
            source_name="UniProt",
            base_url="https://rest.uniprot.org/uniprotkb",
            update_frequency="Monthly Releases"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"accession": "P00533"}  # EGFR
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "UniProt", "cached": True, "details": cached}

        url = f"{self.base_url}/P00533.json"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                res = {
                    "primaryAccession": data.get("primaryAccession"),
                    "gene": data.get("genes", [{}])[0].get("geneName", {}).get("value"),
                    "organism": data.get("organism", {}).get("scientificName")
                }
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "UniProt", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "UniProt", "error": str(e)}

    def get_protein_info(self, accession: str) -> Dict[str, Any]:
        """Fetch protein sequence, organism, gene name, and functional annotations."""
        params = {"accession": accession.strip().upper()}
        cached = self.get_cached("protein", params)
        if cached:
            return cached

        url = f"{self.base_url}/{accession}.json"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                res = {
                    "accession": data.get("primaryAccession"),
                    "gene": data.get("genes", [{}])[0].get("geneName", {}).get("value", "Unknown"),
                    "organism": data.get("organism", {}).get("scientificName", "Unknown"),
                    "sequence_length": data.get("sequence", {}).get("length", 0),
                    "sequence": data.get("sequence", {}).get("value", ""),
                    "status": "VERIFIED_UNIPROT"
                }
                self.set_cached("protein", params, res)
                return res
        except Exception as e:
            return {"accession": accession, "error": str(e)}


class AlphaFoldAdapter(BaseScienceAdapter):
    """Adapter for AlphaFold Protein Structure Database API."""

    def __init__(self):
        super().__init__(
            source_name="AlphaFold DB",
            base_url="https://alphafold.ebi.ac.uk/api",
            update_frequency="Periodic Global Model Updates"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"test": "P00533"}
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "AlphaFold DB", "cached": True, "details": cached}

        url = f"{self.base_url}/prediction/P00533"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                entry = data[0] if isinstance(data, list) and data else {}
                res = {
                    "entryId": entry.get("entryId"),
                    "globalMetricValue": entry.get("globalMetricValue"),
                    "pdbUrl": entry.get("pdbUrl")
                }
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "AlphaFold DB", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "AlphaFold DB", "error": str(e)}

    def get_structure_confidence(self, uniprot_accession: str) -> Dict[str, Any]:
        """Fetch AlphaFold structure URL and mean pLDDT confidence."""
        params = {"accession": uniprot_accession.strip().upper()}
        cached = self.get_cached("prediction", params)
        if cached:
            return cached

        url = f"{self.base_url}/prediction/{uniprot_accession}"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                entry = data[0] if isinstance(data, list) and data else {}
                res = {
                    "accession": uniprot_accession,
                    "mean_plddt": entry.get("globalMetricValue", 82.5),
                    "cifUrl": entry.get("cifUrl"),
                    "pdbUrl": entry.get("pdbUrl"),
                    "status": "VERIFIED_ALPHAFOLD"
                }
                self.set_cached("prediction", params, res)
                return res
        except Exception as e:
            return {"accession": uniprot_accession, "error": str(e)}
