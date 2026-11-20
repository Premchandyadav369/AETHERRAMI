"""
PubMed, STRING, Reactome, and ClinicalTrials Adapters for AETHER-RAMI.
"""

import os
import json
import urllib.request
import urllib.parse
from typing import Dict, Any, Optional, List
from .base_adapter import BaseScienceAdapter


class PubMedAdapter(BaseScienceAdapter):
    """Adapter for NCBI PubMed via E-utilities API."""

    def __init__(self):
        super().__init__(
            source_name="PubMed",
            base_url="https://eutils.ncbi.nlm.nih.gov/entrez/eutils",
            update_frequency="Daily Literature Ingestion"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"term": "EGFR T790M Osimertinib"}
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "PubMed", "cached": True, "details": cached}

        url = f"{self.base_url}/esearch.fcgi?db=pubmed&term=EGFR+T790M+Osimertinib&retmode=json&retmax=1"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                count = data.get("esearchresult", {}).get("count", 0)
                res = {"query_hits": int(count), "sample_id": data.get("esearchresult", {}).get("idlist", [None])[0]}
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "PubMed", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "PubMed", "error": str(e)}

    def search_literature(self, target_or_drug: str, max_results: int = 5) -> List[str]:
        """Search PubMed and return top PMIDs."""
        params = {"term": target_or_drug, "max": max_results}
        cached = self.get_cached("search", params)
        if cached:
            return cached

        encoded = urllib.parse.quote(target_or_drug)
        url = f"{self.base_url}/esearch.fcgi?db=pubmed&term={encoded}&retmode=json&retmax={max_results}"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                idlist = data.get("esearchresult", {}).get("idlist", [])
                self.set_cached("search", params, idlist)
                return idlist
        except Exception:
            return []


class StringDBAdapter(BaseScienceAdapter):
    """Adapter for STRING Protein-Protein Interaction Database API."""

    def __init__(self):
        super().__init__(
            source_name="STRING DB",
            base_url="https://string-db.org/api/json",
            update_frequency="Annual Major Releases (v12+)"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"identifiers": "EGFR", "species": 9606}
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "STRING DB", "cached": True, "details": cached}

        url = f"{self.base_url}/network?identifiers=EGFR&species=9606&limit=1"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                res = {"interactions_found": len(data), "sample_partner": data[0].get("preferredName_B") if data else None}
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "STRING DB", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "STRING DB", "error": str(e)}

    def get_interaction_partners(self, gene_symbol: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Fetch high-confidence physical interaction partners for a target."""
        params = {"gene": gene_symbol, "limit": limit}
        cached = self.get_cached("network", params)
        if cached:
            return cached

        url = f"{self.base_url}/network?identifiers={urllib.parse.quote(gene_symbol)}&species=9606&limit={limit}&required_score=700"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                partners = [{"partner": row.get("preferredName_B"), "score": row.get("score")} for row in data]
                self.set_cached("network", params, partners)
                return partners
        except Exception:
            return []


class ReactomeAdapter(BaseScienceAdapter):
    """Adapter for Reactome Pathway Knowledgebase REST API."""

    def __init__(self):
        super().__init__(
            source_name="Reactome",
            base_url="https://reactome.org/ContentService",
            update_frequency="Quarterly Releases"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"id": "R-HSA-177929"}  # Signaling by EGFR
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "Reactome", "cached": True, "details": cached}

        url = f"{self.base_url}/data/query/R-HSA-177929"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                res = {"pathway_id": data.get("stId"), "displayName": data.get("displayName")}
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "Reactome", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "Reactome", "error": str(e)}

    def get_pathways_for_gene(self, gene_symbol: str) -> List[Dict[str, Any]]:
        """Fetch biological pathways containing a gene."""
        params = {"gene": gene_symbol}
        cached = self.get_cached("pathways", params)
        if cached:
            return cached

        url = f"{self.base_url}/data/mapping/UniProt/{urllib.parse.quote(gene_symbol)}/pathways?species=9606"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                self.set_cached("pathways", params, data)
                return data
        except Exception:
            return []


class ClinicalTrialsAdapter(BaseScienceAdapter):
    """Adapter for ClinicalTrials.gov API v2."""

    def __init__(self):
        super().__init__(
            source_name="ClinicalTrials.gov",
            base_url="https://clinicaltrials.gov/api/v2",
            update_frequency="Daily Updates"
        )

    def check_health(self) -> Dict[str, Any]:
        params = {"term": "Osimertinib"}
        cached = self.get_cached("health", params, max_age_seconds=86400)
        if cached:
            return {"status": "ONLINE", "source": "ClinicalTrials.gov", "cached": True, "details": cached}

        url = f"{self.base_url}/studies?query.term=Osimertinib&pageSize=1"
        req = urllib.request.Request(url, headers={"User-Agent": "AETHER-RAMI/4.2.0"})
        try:
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = json.loads(resp.read().decode("utf-8"))
                studies = data.get("studies", [])
                res = {"total_count": data.get("totalCount", 0), "first_study": studies[0].get("protocolSection", {}).get("identificationModule", {}).get("nctId") if studies else None}
                self.set_cached("health", params, res)
                return {"status": "ONLINE", "source": "ClinicalTrials.gov", "cached": False, "details": res}
        except Exception as e:
            return {"status": "DEGRADED", "source": "ClinicalTrials.gov", "error": str(e)}
