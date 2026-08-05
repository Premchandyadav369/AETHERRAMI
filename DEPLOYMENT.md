# Deployment Guide

This document outlines how to build and deploy the AETHER-RAMI Enterprise AI Drug Discovery Platform using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Build and Run

1.  **Clone the repository** (if you haven't already):
    \`\`\`bash
    git clone <repository_url>
    cd AETHERRAMI
    \`\`\`

2.  **Start the platform**:
    From the root directory of the project, run:
    \`\`\`bash
    docker-compose up --build -d
    \`\`\`

    This command will:
    - Build the backend FastAPI image using Python 3.12.
    - Build the frontend Next.js image using Node 18, optimizing it for production.
    - Start both containers in the background.

3.  **Access the application**:
    - **Frontend:** Open your browser and navigate to \`http://localhost:3000\`
    - **Backend API Docs:** Open your browser and navigate to \`http://localhost:8000/docs\`

## Configuration

- The frontend uses Next.js rewrites to proxy requests starting with \`/backend\` to the backend service. This avoids CORS issues and keeps the API URL unified.
- The environment variable \`BACKEND_URL\` in the \`docker-compose.yml\` dictates where the Next.js backend (server-side API routes) attempts to reach the Python backend.

## Stopping the Platform

To stop and remove the running containers, run:
\`\`\`bash
docker-compose down
\`\`\`
