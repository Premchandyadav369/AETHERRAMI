"""
AETHER-RAMI Science Data Adapters - Base Adapter
Provides caching, provenance logging, rate-limit safety, and error handling.
"""

import os
import json
import time
import hashlib
from datetime import datetime, timezone
from typing import Dict, Any, Optional

CACHE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "cache", "science_data")
os.makedirs(CACHE_DIR, exist_ok=True)


class BaseScienceAdapter:
    """Base class for all scientific data source adapters."""

    def __init__(self, source_name: str, base_url: str, update_frequency: str = "Quarterly / Release-based"):
        self.source_name = source_name
        self.base_url = base_url
        self.update_frequency = update_frequency
        self.cache_dir = os.path.join(CACHE_DIR, source_name.lower().replace(" ", "_"))
        os.makedirs(self.cache_dir, exist_ok=True)

    def _get_cache_key(self, endpoint: str, params: Dict[str, Any]) -> str:
        serialized = json.dumps({"endpoint": endpoint, "params": params}, sort_keys=True)
        return hashlib.sha256(serialized.encode("utf-8")).hexdigest()

    def get_cached(self, endpoint: str, params: Dict[str, Any], max_age_seconds: int = 86400 * 30) -> Optional[Dict[str, Any]]:
        cache_key = self._get_cache_key(endpoint, params)
        cache_file = os.path.join(self.cache_dir, f"{cache_key}.json")
        if os.path.exists(cache_file):
            try:
                with open(cache_file, "r", encoding="utf-8") as f:
                    entry = json.load(f)
                age = time.time() - entry.get("timestamp_epoch", 0)
                if age <= max_age_seconds:
                    return entry.get("data")
            except Exception:
                return None
        return None

    def set_cached(self, endpoint: str, params: Dict[str, Any], data: Any, metadata: Optional[Dict[str, Any]] = None):
        cache_key = self._get_cache_key(endpoint, params)
        cache_file = os.path.join(self.cache_dir, f"{cache_key}.json")
        payload = {
            "source_name": self.source_name,
            "endpoint": endpoint,
            "params": params,
            "timestamp_epoch": time.time(),
            "timestamp_iso": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
            "metadata": metadata or {},
            "data": data,
        }
        try:
            with open(cache_file, "w", encoding="utf-8") as f:
                json.dump(payload, f, indent=2)
        except Exception as e:
            pass

    def check_health(self) -> Dict[str, Any]:
        """Perform a quick health and connectivity check."""
        raise NotImplementedError
