# AETHER-RAMI V10 OMEGA: Enterprise AI Drug Discovery & Structural Intelligence Platform

[![Platform Version](https://img.shields.io/badge/AETHER--RAMI-V10.0.0%20OMEGA-00E5FF?style=for-the-badge&logo=pytorch)](https://github.com/Premchandyadav369/AETHERRAMI)
[![Backend Engine](https://img.shields.io/badge/Backend-FastAPI%20%2B%20PyTorch%202.4-10B981?style=for-the-badge&logo=fastapi)](https://github.com/Premchandyadav369/AETHERRAMI)
[![Frontend Workstation](https://img.shields.io/badge/Frontend-Next.js%2014%20%2B%20TailwindCSS-8B5CF6?style=for-the-badge&logo=nextdotjs)](https://github.com/Premchandyadav369/AETHERRAMI)
[![RCSB & PubChem Integration](https://img.shields.io/badge/APIs-RCSB%20PDB%20%2B%20PubChem-3B82F6?style=for-the-badge)](https://github.com/Premchandyadav369/AETHERRAMI)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

---

## 🌟 Executive Summary & The Revolutionary Scientific Paradigm

**AETHER-RAMI V10 OMEGA** is a Next-Generation **AI-Powered Drug Discovery & Structural Intelligence Platform** designed to compress early-stage pharmaceutical discovery timelines from **3–5 years down to weeks**.

By uniting **Equivariant Graph Neural Networks (EGNNs)**, **Transformer Cross-Attention Hotspot Profiling**, **Multi-Objective Variational Autoencoders (VAEs)**, **FAISS Dual Vector Search**, and **TreeSHAP Feature Attributions**, AETHER-RAMI replaces trial-and-error high-throughput screening with accurate computational inference.

```
       +-----------------------------------------------------------------------+
       |                      AETHER-RAMI DEEP LEARNING ENGINE                 |
       +-----------------------------------------------------------------------+
                                           |
    +-----------------------+              |              +-----------------------+
    | 3D Molecular Graphs   |              |              | Target PDB Structures |
    |  (GATv2 / GIN Encoders)------------->+<-------------|  (Protein Transformers)|
    +-----------------------+              |              +-----------------------+
                                           v
                       +---------------------------------------+
                       | Cross-Attention Interaction Mechanism |
                       +---------------------------------------+
                                           |
            +------------------------------+------------------------------+
            |                              |                              |
            v                              v                              v
  [Binding Affinity pKd]        [Atom-Residue Hotspots]        [ADMET & PAINS Filter]
  (ROC-AUC: 0.942, F1: 0.898)    (3D Pocket Contact Maps)       (Rule of 5, QED, TPSA)
```

### Key Scientific Innovations

1. **Equivariant 3D Graph Representations**: Encodes chemical compounds as spatial molecular graphs preserving bond angles, dihedral torsions, and stereochemistry.
2. **Residue-Level Cross-Attention**: Identifies exact hydrogen bonds, hydrophobic interactions, and pi-stacking residue contacts within target binding pockets.
3. **Multi-Parameter Optimization (MPO)**: Simultaneously optimizes target binding affinity ($pKd \ge 8.0$), drug-likeness ($QED \ge 0.75$), synthetic accessibility ($SA \le 3.0$), and low toxicity.
4. **FAISS Dual Retrieval Engine**: Enables sub-millisecond similarity queries across millions of small molecules and target PDB structures.
5. **Real-time RCSB PDB & PubChem Integration**: Live structural coordinate rendering in WebGL with interactive 3D ribbon and spacefill visualizations.

---

## 📊 Empirical V10 Results & Quantitative Benchmarking

The **AETHER-RAMI V10** execution suite evaluated our ensemble architecture across major pharmaceutical benchmarks (EGFR, CDK2, BRAF, HIV-1 Protease, and AChE). The results demonstrate state-of-the-art performance against traditional Machine Learning baselines.

### Comprehensive Performance Benchmarks

| Model Architecture | ROC-AUC | F1-Score | Matthews Corr (MCC) | Affinity RMSE ($pKd$) | R² Score |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **AETHER-RAMI V10 Ensemble (GATv2 + GIN)** | **0.942** | **0.898** | **0.812** | **0.421** | **0.884** |
| XGBoost ($v10.pkl$) | 0.884 | 0.835 | 0.724 | 0.548 | 0.810 |
| LightGBM ($v10.pkl$) | 0.876 | 0.829 | 0.710 | 0.562 | 0.795 |
| Random Forest ($v10.pkl$) | 0.852 | 0.801 | 0.675 | 0.610 | 0.742 |
| Logistic Regression Baseline | 0.714 | 0.650 | 0.420 | 0.890 | 0.510 |

---

### Empirical Visualizations (V10 Execution Outputs)

All experimental output artifacts are versioned and stored directly within `./aetherramiresultsv10/`.

#### 1. Model Performance Benchmarking
Our deep learning ensemble outperforms traditional estimators across all classification and regression metrics.

![Model Performance Benchmarking](./aetherramiresultsv10/benchmark_v10.png)

---

#### 2. Multi-Parameter Optimization (MPO) Radar
Simultaneous optimization across binding affinity, QED drug-likeness, lipophilicity (LogP), polar surface area (TPSA), and synthetic accessibility.

![MPO Radar](./aetherramiresultsv10/mpo_radar.png)

---

#### 3. Binding Attention Residue Scores
Cross-attention matrix highlighting high-impact atom-to-residue contacts within target binding pockets.

![Binding Attention Scores](./aetherramiresultsv10/binding_attention_scores.png)

---

#### 4. TreeSHAP Feature Attributions
Global feature attributions identifying top atomic and structural drivers of binding affinity.

![TreeSHAP Summary](./aetherramiresultsv10/shap_summary.png)

---

#### 5. Chemical Space t-SNE Embeddings
2D t-SNE projection of foundation embeddings mapping chemical space distribution and active cluster regions.

![t-SNE Chemical Space](./aetherramiresultsv10/tsne_chemical_space.png)

---

#### 6. Calibration Curves & Reliability Diagrams
High calibration accuracy demonstrating reliable probabilistic confidence scores.

![Calibration Curves](./aetherramiresultsv10/calibration_curves.png)

---

## 📂 Repository Inventory & Data Artifacts

The repository houses pre-trained weights, raw experimental result datasets, PDB coordinates, and publication reports:

```
AETHERRAMI/
├── aetherramiresultsv10/              # V10 Pipeline Execution Artifacts
│   ├── 1ANR.pdb, 1HCK.pdb, 1HVR.pdb   # PDB 3D Protein Structures
│   ├── 1J7T.pdb, 1M17.pdb, 4EY7.pdb   # Target Kinase & Protease Coordinates
│   ├── gatv2_model.pt, gin_model.pt   # PyTorch Graph Neural Network Weights
│   ├── cross_attention.pt             # Transformer Interaction Weights
│   ├── prot_cond_vae.pt               # Conditional De Novo VAE Weights
│   ├── faiss_drug.bin, faiss_protein.bin # FAISS Vector Index Binaries
│   ├── denovo_leads_by_target.json    # De Novo Lead Candidates Data
│   ├── publication_report (1).html    # Interactive Standalone HTML Report
│   └── *.png                          # High-Resolution Empirical Plots
├── backend/                           # FastAPI Inference Engine
│   ├── api/                           # REST Endpoints & Audit Middleware
│   ├── services/                      # PyTorch & FAISS Inference Engines
│   └── main.py                        # FastAPI Entry Point
├── frontend/                          # Next.js 14 Web Workstation
│   ├── app/                           # App Router & Research Stations
│   │   ├── components/                # Binding, PDB, DeNovo, Results & Chat
│   │   ├── globals.css                # Glassmorphism & Cyberpunk Design System
│   │   └── page.tsx                   # Workstation Station Router
│   └── package.json                   # Node Dependencies
├── docs/                              # Architecture Specs & Roadmaps
└── docker-compose.yml                 # Multi-Container Orchestration
```

---

## 🖥️ Web Workstation Research Stations

The revamped frontend application is structured into **5 streamlined, high-utility research stations**:

1. **Binding Affinity & ADMET Predictor Station**: Input SMILES + Target Sequence for instant $pKd$ affinity score calculation, Lipinski Rule of 5 validation, QED, TPSA, PAINS filter, and atom-residue interaction maps.
2. **PDB & PubChem 3D Explorer Station**: Live RCSB PDB structure fetcher with real-time 3D WebGL protein backbone rendering, ribbon/spacefill controls, rotation, and pocket cavity identification.
3. **De Novo Molecular Designer Station**: Generates novel candidates tailored for specific targets with SMILES/SELFIES output, SA score, and CSV/JSON export capabilities.
4. **V10 Empirical Results & Benchmark Center**: Interactive data browser directly displaying real execution graphs, ROC curves, MPO radar plots, and publication reports.
5. **AI Scientific Research Assistant Station**: Domain-trained conversational agent for real-time natural language query resolution.

---

## 📡 REST API Specifications & OpenAPI Endpoints

All backend endpoints are served under `/v1`.

### 1. `POST /v1/predict`
Predicts target binding affinity ($pKd$), ADMET properties, and interaction hotspots simultaneously.

**Request**:
```json
{
  "smiles": "COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4",
  "protein_sequence": "MRPSGTAGAALLALLAALCPASRALEEKKVCQGTSNKLTQLGTFEDHFLSLQR..."
}
```

**Response**:
```json
{
  "smiles": "COC1=C(C=C2C(=C1)N=CN=C2NC3=CC(=C(C=C3)F)Cl)OCCCN4CCOCC4",
  "binding_affinity": {
    "affinity_pKd": 9.4,
    "status": "Ultra-High Binder"
  },
  "admet_properties": {
    "qed": 0.76,
    "mw": 446.9,
    "logp": 3.2,
    "lipinski": { "violations": 0, "passed": true }
  }
}
```

---

### 2. `POST /v1/generate`
Generates conditional candidate molecules targeting a specified protein.

**Request**:
```json
{
  "protein_target": "EGFR",
  "disease": "Non-Small Cell Lung Cancer",
  "desired_properties": { "min_qed": 0.75 }
}
```

---

### 3. `GET /v1/retrieve`
Runs sub-millisecond FAISS vector similarity search across molecules or PDB sequences.

**Query Parameter**: `query=1M17` or `query=CC(=O)NC1=CC=C(O)C=C1`

---

## 🚀 Installation & Local Development

### Prerequisites
- **Node.js**: `v18.0.0+`
- **Python**: `v3.10+`
- **Docker**: `v24.0+` (optional)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🐳 Docker & Cloud Deployment

### Docker Compose Deployment
```bash
docker-compose up --build -d
```

### Vercel Deployment (Frontend)
1. Import repository on [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Set `NEXT_PUBLIC_BACKEND_URL` to your FastAPI backend endpoint.
4. Click **Deploy**.

---

## 📄 License & Attribution

This project is open-source under the **MIT License**.

**Lead Author & Platform Architect**: **V C Premchand Yadav**  
**Repository**: [github.com/Premchandyadav369/AETHERRAMI](https://github.com/Premchandyadav369/AETHERRAMI)
