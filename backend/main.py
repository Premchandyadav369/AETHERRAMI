import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
try:
    from api.endpoints import router as api_router
    from api.middleware import AuditLoggingMiddleware
except ImportError:
    from backend.api.endpoints import router as api_router
    from backend.api.middleware import AuditLoggingMiddleware
import psutil
import time
import os

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()]
)
logger = logging.getLogger("aether-rami-backend")

def create_app() -> FastAPI:
    app = FastAPI(
        title="Aether API Platform",
        description="Enterprise AI-powered drug discovery, protein intelligence, and human digital twin operating system",
        version="10.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )
    
    # Enterprise Audit Middleware
    app.add_middleware(AuditLoggingMiddleware)

    # CORS Configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # In production, specify frontend origin
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Include endpoints router
    app.include_router(api_router, prefix="/v1")
    
    # Platform start time for uptime calculation
    platform_start_time = time.time()

    @app.get("/v1/enterprise/metrics", summary="Enterprise cluster health and metrics")
    async def enterprise_metrics():
        uptime = time.time() - platform_start_time
        process = psutil.Process(os.getpid())
        memory_info = process.memory_info()

        return {
            "status": "healthy",
            "uptime_seconds": uptime,
            "system_metrics": {
                "cpu_percent": psutil.cpu_percent(),
                "memory_usage_mb": memory_info.rss / (1024 * 1024),
                "active_threads": process.num_threads()
            },
            "tenant_status": "operational",
            "active_nodes": 1
        }

    @app.get("/")
    async def root():
        return {
            "status": "online",
            "model": "Aether Platform",
            "capabilities": [
                "Precision Medicine Engine",
                "Multi-Omics Foundation Model",
                "Protein Dynamics & MD Workflow",
                "AI Medicinal Chemist",
                "Drug Repurposing Engine",
                "Disease Knowledge Graph",
                "Autonomous Research Agent",
                "Manufacturing Readiness",
                "Clinical Trial Risk Engine",
                "Digital Human Twin",
                "Explainable AI Center",
                "Global Drug Intelligence",
                "Molecular Generator",
                "Benchmarking Arena",
                "Regulatory Readiness Suite"
            ]
        }
        
    @app.on_event("startup")
    async def startup_event():
        logger.info("Initializing Aether Platform research engine and retrieval indexes...")
        # Models are loaded inside inference services on-demand or at startup
        
    return app

app = create_app()
