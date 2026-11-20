"""
ChEMBL Data Adapter for AETHER-RAMI.
Queries ChEMBL REST API with local caching, rate limiting, and DeepMind Science Skill integration.
"""

import os
import json
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional, List
from .base_adapter import BaseScienceAdapter


class ChEMBLAdapter(BaseScienceAdapter):
    """Adapter for European Bioinformatics Institute (EMBL-EBI) ChEMBL Database."""

    def __init__(self):
        super().__init__(
            source_name="ChEMBL",
            base_url="https://www.ebi.ac.uk/chembl/api/data",
            update_frequency="Quarterly (ChEMBL 34+)"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {}
        cached = self.get_cached("status", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "ChEMBL", "cached": True, "details": cached}

        url = f"{self.base_url}/status.json"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0 (Scientific Research)"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                self.set_cached("status", params, data)
                return {"status": "ONLINE", "source": "ChEMBL", "cached": False, "details": data}
        except Exception as e:
            return {"status": "DEGRADED", "source": "ChEMBL", "error": str(e), "fallback": "Local Offline ChEMBL Subset Available"}

    def get_target_activities(self, target_chembl_id: str, limit: int = 25) -> List[Dict[str, Any]]:
        params = {"target_chembl_id": target_chembl_id, "limit": limit}
        cached = self.get_cached("activity", params)
        if cached:
            return cached

        url = f"{self.base_url}/activity.json?target_chembl_id={urllib.parse.quote(target_chembl_id)}&limit={limit}"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                res = json.loads(resp.read().decode("utf-8"))
                activities = res.get("activities", [])
                self.set_cached("activity", params, activities)
                return activities
        except Exception:
            return []

    def get_compound_bioactivities(self, smiles_or_chembl_id: str) -> Dict[str, Any]:
        """Fetch bioactivity records for a compound."""
        params = {"query": smiles_or_chembl_id}
        cached = self.get_cached("compound", params)
        if cached:
            return cached

        if smiles_or_chembl_id.startswith("CHEMBL"):
            url = f"{self.base_url}/molecule/{smiles_or_chembl_id}.json"
        else:
            url = f"{self.base_url}/molecule.json?molecule_structures__canonical_smiles={urllib.parse.quote(smiles_or_chembl_id)}"

        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                self.set_cached("compound", params, data)
                return data
        except Exception as e:
            return {"query": smiles_or_chembl_id, "error": str(e)}
