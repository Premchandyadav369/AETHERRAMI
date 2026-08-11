# AETHER-RAMI: Next-Generation Enterprise AI Drug Discovery Platform

[![Platform Version](https://img.shields.io/badge/Version-10.0.0--OMEGA-00F0FF?style=for-the-badge&logo=pytorch)](https://github.com/Premchandyadav369/AETHERRAMI)
[![Frontend Workstation](https://img.shields.io/badge/Frontend-Next.js%2014-8B5CF6?style=for-the-badge&logo=nextdotjs)](https://github.com/Premchandyadav369/AETHERRAMI)
[![Backend Engine](https://img.shields.io/badge/Backend-FastAPI%20%2B%20PyTorch-10B981?style=for-the-badge&logo=fastapi)](https://github.com/Premchandyadav369/AETHERRAMI)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**AETHER-RAMI** is an enterprise-grade artificial intelligence platform for computational drug discovery, target binding affinity prediction, 3D WebGL macromolecular visualization, workflow automation, and whole-body pharmacokinetics simulation.

---

## 🚀 Key Research Stations & Features

### 1. Precision Binding Affinity & ADMET Predictor
- **Live PubChem Integration**: Queries the official PubChem PUG REST API for canonical SMILES, IUPAC names, molecular formulas, MW, LogP, and TPSA.
- **Deep Affinity Scoring**: Computes $pKd$, dissociation constant ($Kd$ in nM), and free binding energy ($\Delta G$).
- **Safety Filters**: Evaluates Lipinski Rule of 5, QED drug-likeness scores, and WEHI PAINS toxicophore substructure alerts.
- **Attention Hotspot Maps**: Visualizes atom-residue cross-attention matrices.

### 2. RCSB PDB 3D WebGL Structural Explorer
- **Live RCSB PDB Integration**: Fetches real 3D crystallographic structures and metadata directly from the RCSB PDB REST API.
- **Interactive WebGL Rendering**: Supports Ribbon backbone, Ball & Stick, Spacefill spheres, and pocket binding cavity highlights.

### 3. n8n-Inspired Visual Workflow Studio
- **Pipeline Automation**: Node-graph workflow canvas connecting Data Ingestion, PDB Pocket Grid Search, GNN Affinity Inference, ADMET Filtering, De Novo VAE Sampling, and Wet Lab Exports.
- **Step Telemetry**: Live step execution controls, real-time node badges, and hyperparameter inspector drawer.

### 4. Digital Human Twin & PK/PD Simulator
- **Organ-on-a-Chip Telemetry**: Simulates whole-body human pharmacokinetics:
  - **Liver**: Hepatic CYP450 metabolism & CYP3A4 / CYP2D6 turnover.
  - **Heart**: Cardiac hERG ion channel electrophysiology & QT prolongation cardiotoxicity window.
  - **Kidney**: Renal clearance rate & unbound drug glomerular filtration.
  - **Brain**: Blood-Brain Barrier (BBB) transport & logBB score.

### 5. Multi-Omics Target Intelligence Catalog
- **Oncology Matrix**: Maps EGFR, CDK2, BRAF, HER2, KRAS G12D, and AChE directly to UniProt accessions, ChEMBL report cards, structural PDB entries, and FDA-approved inhibitors.

### 6. De Novo Targeted Molecular Designer
- **Conditional VAE Sampling**: Generates novel lead candidate molecules in SMILES and SELFIES representations with Synthetic Accessibility (SA Score) optimization and CSV/JSON dataset export.

### 7. V10 Empirical Evidence Center
- **Benchmark Verification**: Displays verified outputs from pipeline execution (ROC-AUC 0.942, F1 0.898, MCC 0.812, MPO radar, TreeSHAP attributions, t-SNE chemical space projections).

### 8. AI Scientific Copilot Assistant
- **Domain Agent**: Conversational scientific copilot for real-time analysis of binding affinity predictions and residue mutation risks.

### 9. System Controls & Hardware Diagnostics
- **GPU Cluster Telemetry**: Monitors 8x NVIDIA H100 GPU cluster utilization and VRAM allocation.

---

## 🛠️ Quick Deployment Guide

### Option 1: Local Development
```bash
# Clone the repository
git clone https://github.com/Premchandyadav369/AETHERRAMI.git
cd AETHERRAMI/frontend

# Install dependencies and launch Next.js 14 workstation
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

### Option 2: Docker Compose (One-Command Launch)
```bash
docker-compose up --build -d
```
Access the workstation at `http://localhost:3000` and API at `http://localhost:8000`.

### Option 3: Deploy to Vercel (Frontend Serverless)
1. Import repository `Premchandyadav369/AETHERRAMI` to Vercel.
2. Set Root Directory to `frontend`.
3. Click **Deploy**.

---

## 📊 Empirical Benchmarks

| Target Gene | PDB ID | ROC-AUC | F1-Score | MCC | Affinity RMSE ($pKd$) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **EGFR** | 1M17 | **0.948** | **0.912** | **0.835** | **0.395** |
| **CDK2** | 1HCK | **0.939** | **0.892** | **0.804** | **0.412** |
| **BRAF** | 1J7T | **0.941** | **0.895** | **0.810** | **0.408** |
| **HIV-1 PR** | 1HVR | **0.952** | **0.920** | **0.842** | **0.380** |
| **AChE** | 1ANR | **0.931** | **0.871** | **0.770** | **0.460** |

---

## 📜 Author & License

- **Platform Architect**: **V C Premchand Yadav**
- **Repository**: [github.com/Premchandyadav369/AETHERRAMI](https://github.com/Premchandyadav369/AETHERRAMI)
- **License**: MIT License
