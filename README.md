# Aether Platform: Enterprise AI Drug Discovery Platform

[![Platform Version](https://img.shields.io/badge/Aether-Platform-10.0.0-00E5FF?style=for-the-badge&logo=pytorch)](https://github.com/Premchandyadav369/AETHERRAMI)
[![Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20PyTorch-10B981?style=for-the-badge&logo=fastapi)](https://github.com/Premchandyadav369/AETHERRAMI)
[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2014%20%2B%20TailwindCSS-8B5CF6?style=for-the-badge&logo=nextdotjs)](https://github.com/Premchandyadav369/AETHERRAMI)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**Aether Platform** is an enterprise-grade **AI Drug Discovery Platform** designed for medicinal chemists, computational biologists, AI researchers, and pharmaceutical scientists.

It combines multi-target conditional generative AI, 3D WebGL protein visualization, consensus docking, explicit-solvent molecular dynamics, TreeSHAP explainability, and multi-run experiment tracking into a sleek, high-density scientific workstation.

---

## 🌟 Key Workstation Modules

1. **Executive Dashboard**: System health, GPU cluster gauges, screened compound metrics, and live compute job queue.
2. **Drug Discovery Workspace**: 8-stage pipeline visualization with live execution logs.
3. **De Novo Molecule Generator**: Advanced latent sampling, SMILES/SELFIES editor, 2D chemical structure renderer, and real-time descriptor calculations.
4. **Protein Explorer**: Interactive 3D PDB structure viewer, pocket detection, gatekeeper residue highlighting, and AlphaFold3 pLDDT confidence scores.
5. **Docking Studio**: 3D binding pose visualization, consensus scoring across multiple frameworks, binding energy breakdown, and H-bond contact maps.
6. **Molecular Dynamics Dashboard**: Explicit solvent trajectories, RMSD, RMSF, Radius of Gyration (Rg), and MM-PBSA solvation free energy plots.
7. **AI Models Center**: Auto-indexes trained models, detailed metrics (ROC-AUC, F1, MCC), and checkpoint downloads.
8. **Dataset Manager**: Searchable dataset catalog, drag-and-drop uploader, and data cleaning logs.
9. **Candidate Ranking**: Top-100 leads, preclinical candidates, laboratory-priority molecules with sortable tables and export capabilities.
10. **Chemical Space Explorer**: High-dimensional UMAP and t-SNE 2D projections of foundation embeddings.
11. **ADMET & Toxicity Center**: Multi-parameter optimization (MPO) radar plots, Rule of 5, and extensive safety/toxicity checks.
12. **Explainability & SHAP Center**: TreeSHAP feature attributions, cross-attention heatmap matrix, and atom/residue contribution maps.
13. **Research & Laboratory Report Generator**: Automated report generation, exports, and commercial synthesis availability checks.

---

## 📊 Results & Benchmarks

The Aether Platform achieves state-of-the-art performance across multiple pharmacological benchmarks. The results and metrics are continuously tracked and versioned. Below are key visualizations from our recent V10 execution:

### Model Performance Benchmarking
Our ensemble models outperform standard baselines significantly, as demonstrated in our benchmarking suite.

![Benchmark V10](./aetherramiresultsv10/benchmark_v10.png)

### Multi-Parameter Optimization (MPO)
The platform ensures that generated candidates hit the optimal sweet spot for ADMET profiles, visualizing trade-offs via MPO radar plots.

![MPO Radar](./aetherramiresultsv10/mpo_radar.png)

### Binding Attention Scores
Interpretability is built-in. Cross-attention mechanisms highlight critical atom-to-residue interactions for target specificity.

![Binding Attention Scores](./aetherramiresultsv10/binding_attention_scores.png)

---

## 🚀 Deployment Guide (End-to-End)

Aether Platform is built with a modern decoupled architecture, allowing independent scaling of the frontend application and the compute-intensive backend services.

### Frontend Deployment (Vercel)

The Next.js 14 frontend is optimized for serverless edge deployment, making Vercel the ideal hosting provider.

1. **Prerequisites**: Ensure your project is pushed to a Git repository (GitHub, GitLab, or Bitbucket).
2. **Import Project**: Log in to [Vercel](https://vercel.com/) and click "Add New..." -> "Project". Import your repository.
3. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. **Environment Variables**:
   - Set `NEXT_PUBLIC_BACKEND_URL` to the production URL of your backend service (e.g., `https://api.aether-platform.example.com`).
5. **Deploy**: Click "Deploy". Vercel will automatically build and distribute the frontend globally.

### Backend Deployment (AWS / Render / Docker)

The FastAPI backend requires Python 3.12 and dependencies like PyTorch. It can be deployed using Docker for consistent environments.

#### Option A: Deploying with Docker Compose (Single Instance/VM)
Ideal for standard EC2 instances or virtual private servers.
1. Ensure Docker and Docker Compose are installed on your server.
2. Clone the repository and navigate to the project root.
3. Run the following command:
   ```bash
   docker-compose up --build -d
   ```
4. Configure a reverse proxy (like Nginx) to route external traffic to `http://localhost:8000` and handle SSL termination.

#### Option B: Deploying on Render (Managed Container Service)
1. In the Render dashboard, create a new "Web Service".
2. Connect your repository.
3. Select "Docker" as the runtime.
4. Set the **Root Directory** to `.` (the repository root).
5. Ensure the `Dockerfile` path is specified as `backend/Dockerfile` if Render prompts for it, or use a customized `render.yaml`.
6. Set Environment Variables as needed (e.g., `PYTHONPATH=/app`).
7. Deploy the service.

#### Option C: AWS ECS / EKS (Enterprise Scale)
For high availability and GPU support:
1. Build and push the backend Docker image to AWS ECR:
   ```bash
   docker build -t aether-backend -f backend/Dockerfile .
   aws ecr get-login-password | docker login --username AWS --password-stdin <your-ecr-uri>
   docker tag aether-backend <your-ecr-uri>:latest
   docker push <your-ecr-uri>:latest
   ```
2. Create an ECS Task Definition referencing the ECR image. Allocate appropriate CPU/Memory (and GPU if using AWS Inferentia or NVIDIA instances).
3. Deploy the task as an ECS Service behind an Application Load Balancer.
4. Map the frontend's `NEXT_PUBLIC_BACKEND_URL` to the Load Balancer's domain.

---

## 📂 Repository Architecture

```
AETHERRAMI/
├── aetherramiresultsv10/     # Raw pipeline execution outputs (PDBs, PNGs, CSVs, PTs)
├── backend/                  # FastAPI inference services, AI research engine
│   ├── api/                  # REST API endpoints & middleware
│   ├── models/               # PyTorch model definitions
│   ├── services/             # Core business logic and model inference
│   └── main.py               # FastAPI application entry point
├── frontend/                 # Next.js 14 Web Application
│   ├── app/                  # App Router pages and workstation components
│   ├── public/               # Static assets
│   └── package.json          # Node dependencies
└── docker-compose.yml        # Multi-container orchestration
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
