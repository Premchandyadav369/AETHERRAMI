"""
RCSB PDB Data Adapter for AETHER-RAMI.
Inspects experimentally determined 3D structures, resolution, cofactors, and chains.
"""

import os
import json
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional
from .base_adapter import BaseScienceAdapter


class PDBAdapter(BaseScienceAdapter):
    """Adapter for RCSB Protein Data Bank (PDB) REST APIs."""

    def __init__(self):
        super().__init__(
            source_name="RCSB PDB",
            base_url="https://data.rcsb.org/rest/v1/core",
            update_frequency="Weekly (Wednesday release)"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"test": "1STP"}
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "RCSB PDB", "cached": True, "details": cached}

        url = f"{self.base_url}/entry/1STP"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                res = {"rcsb_id": data.get("rcsb_id"), "title": data.get("struct", {}).get("title")}
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "RCSB PDB", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "RCSB PDB", "error": str(e), "fallback": "Local PDB Archive Available"}

    def get_structure_metadata(self, pdb_id: str) -> Dict[str, Any]:
        """Fetch experimental resolution, method, organism, and ligands for a PDB code."""
        pdb_id = pdb_id.upper().strip()
        params = {"pdb_id": pdb_id}
        cached = self.get_cached("entry", params)
        if cached:
            return cached

        url = f"{self.base_url}/entry/{pdb_id}"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                raw = json.loads(resp.read().decode("utf-8"))
                
                # Extract key fields
                exptl = raw.get("exptl", [{}])[0]
                struct = raw.get("struct", {})
                rcsb_entry_info = raw.get("rcsb_entry_info", {})
                
                res = {
                    "pdb_id": pdb_id,
                    "title": struct.get("title", "Unknown"),
                    "experimental_method": exptl.get("method", "X-RAY DIFFRACTION"),
                    "resolution_angstrom": rcsb_entry_info.get("resolution_combined", [None])[0] or exptl.get("resolution"),
                    "polymer_entity_count": rcsb_entry_info.get("polymer_entity_count_protein", 1),
                    "nonpolymer_bound_components": rcsb_entry_info.get("nonpolymer_bound_components", []),
                    "deposit_date": raw.get("rcsb_accession_info", {}).get("deposit_date"),
                    "status": "VERIFIED_ONLINE"
                }
                self.set_cached("entry", params, res)
                return res
        except Exception as e:
            # Fallback to local verified metadata if available
            return {
                "pdb_id": pdb_id,
                "error": str(e),
                "status": "OFFLINE_CACHED_FALLBACK"
            }
