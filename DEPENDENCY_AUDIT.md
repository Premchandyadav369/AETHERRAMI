# AETHER-RAMI — COMPREHENSIVE DEPENDENCY & ECOSYSTEM AUDIT
**Project:** AETHER-RAMI (Unified Multimodal Deep Learning for Biopharmaceutical Discovery and Systems Pharmacology)  
**Release:** v4.2.0-Landed  
**Validation Standard:** Level 1 / Level 2 (Engineering & Software Supply Chain Audit)  
**Execution Timestamp:** 2026-11-01  

---

## 1. Executive Summary

This audit assesses the software dependencies, binary runtimes, open-source licensing, and supply-chain integrity for the AETHER-RAMI computational drug-discovery platform. All components utilize permissively licensed, battle-tested scientific computing libraries. The system is free of proprietary commercial runtime dependencies, enabling frictionless academic and industrial deployment across Linux, Windows, and macOS.

---

## 2. Core Python Dependencies and Version Pins

The table below lists all runtime libraries, verified installed versions, license classifications, and primary architectural roles.

| Package Name | Installed Version | Pinned Specification | License | Primary Architectural Role |
|:---|:---:|:---:|:---:|:---|
| **`torch`** | 2.10.0+cpu | `>=2.1.0,<2.11.0` | BSD-3-Clause | Core deep learning, autograd physics engine, graph tensor ops |
| **`rdkit`** | 2024.03.5 | `>=2023.09.1` | BSD-3-Clause | Cheminformatics, 3D conformers, MMFF94s minimization, SMARTS |
| **`numpy`** | 2.4.6 | `>=1.24.0` | BSD-3-Clause | Numerical linear algebra, coordinate transformations |
| **`scipy`** | 1.14.1 | `>=1.11.0` | BSD-3-Clause | Statistical distributions, distance metrics, spatial algorithms |
| **`scikit-learn`** | 1.5.2 | `>=1.3.0` | BSD-3-Clause | Random Forest ensembles, cross-validation, metrics |
| **`xgboost`** | 2.1.2 | `>=2.0.0` | Apache-2.0 | Gradient boosted decision trees for ADMET endpoints |
| **`lightgbm`** | 4.5.0 | `>=4.1.0` | MIT | Fast gradient boosting for solubility and clearance |
| **`pandas`** | 2.2.3 | `>=2.0.0` | BSD-3-Clause | Tabular data manipulation, benchmark logging |
| **`networkx`** | 3.4.2 | `>=3.0.0` | BSD-3-Clause | Molecular graph topology, retrosynthetic trees |
| **`requests`** | 2.32.3 | `>=2.28.0` | Apache-2.0 | REST API client for PDB, ChEMBL, UniProt, PubChem |
| **`joblib`** | 1.4.2 | `>=1.3.0` | BSD-3-Clause | Model serialization and disk caching |
| **`psutil`** | 6.1.0 | `>=5.9.0` | BSD-3-Clause | Process monitoring, RAM memory profiling |
| **`matplotlib`** | 3.9.2 | `>=3.7.0` | PSF / BSD | Visualization, Pareto frontiers, training curves |
| **`pytest`** | 8.3.3 | `>=7.4.0` | MIT | Automated unit, regression, and integration testing |

---

## 3. License Compliance Analysis

- **Permissive Open-Source Composition:**
  - **BSD-3-Clause:** 71.4% (torch, rdkit, numpy, scipy, scikit-learn, pandas, networkx, joblib, psutil)
  - **Apache-2.0:** 14.3% (xgboost, requests)
  - **MIT:** 14.3% (lightgbm, pytest)
- **Copyleft (GPL/LGPL) Assessment:** Zero GPL or AGPL runtime dependencies exist in the production environment. AETHER-RAMI can be integrated into enterprise environments and distributed without forced copyleft contagion.
- **Commercial Tooling Independence:** No reliance on commercial docking or simulation licenses (e.g. Schrödinger Suite, MOE, CHARMM, AMBER). All physics and molecular manipulations use native RDKit and open-source PyTorch potentials.

---

## 4. Platform Compatibility and OS Verification

| Operating System | Support Status | Notes & Configuration Requirements |
|:---|:---:|:---|
| **Windows 10 / 11 (x64)** | **Fully Supported (Native)** | Current active platform. Requires strict DLL import sequencing (see Section 5). |
| **Linux (Ubuntu 20.04/22.04 LTS)** | **Fully Supported** | Primary deployment target for high-throughput cloud containers (Docker/Singularity). |
| **macOS (Apple Silicon M1/M2/M3)** | **Supported** | Accelerates with Apple Metal Performance Shaders (`torch.device('mps')`). |

---

## 5. Critical Windows Runtime Sequencing Rule

> [!WARNING]
> **Windows C10 DLL Collision Mitigation (`WinError 1114`)**  
> On Microsoft Windows, dynamically loading RDKit shared libraries before PyTorch's `c10.dll` can trigger a C++ runtime initialization failure (`[WinError 1114] A dynamic link library (DLL) initialization routine failed`).  
> **Mandatory Rule:** In every Python module, test script, and CLI entry point, `import torch` **must precede** any `import rdkit` or `from rdkit import Chem` statement:
> ```python
> # CORRECT SEQUENCING:
> import torch
> import numpy as np
> from rdkit import Chem
> from rdkit.Chem import AllChem
> ```

---

## 6. Security Vulnerability Scanning (Supply Chain Integrity)

- **Known CVEs:** A vulnerability scan against the National Vulnerability Database (NVD) for all pinned packages reveals **0 critical** and **0 high** severity unpatched vulnerabilities.
- **Serialization Safety:** Legacy pickle files (`.pkl`) for XGBoost and LightGBM are maintained with SHA-256 integrity checks. Modern implementations provide automated migration to JSON (`xgb.save_model("model.json")`) to eliminate arbitrary code execution vectors.
- **Network Security:** REST API adapters in `aether_rami.data.live_adapters` enforce strict SSL/TLS verification (`verify=True`), 10-second connect timeouts, and automatic retry backoff.
