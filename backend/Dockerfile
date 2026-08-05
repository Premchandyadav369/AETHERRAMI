FROM python:3.12-slim

WORKDIR /app

# Install dependencies needed for some python packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend ./backend

# Environment variable to inform the backend where to find its own data/modules if needed
ENV PYTHONPATH=/app

CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
