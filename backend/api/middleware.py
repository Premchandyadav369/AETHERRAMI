import time
import logging
from typing import Callable
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

logger = logging.getLogger("aether-rami-backend.audit")

class AuditLoggingMiddleware(BaseHTTPMiddleware):
    """
    Enterprise-grade audit logging middleware.
    Tracks request paths, methods, response times, and status codes.
    """
    async def dispatch(self, request: Request, call_next: Callable) -> Response:
        start_time = time.time()

        # In a real enterprise scenario, you would extract the tenant ID or user ID from headers/tokens here
        client_host = request.client.host if request.client else "unknown"

        logger.info(f"AUDIT_START: method={request.method} path={request.url.path} ip={client_host}")

        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            logger.info(
                f"AUDIT_SUCCESS: method={request.method} path={request.url.path} "
                f"status={response.status_code} duration={process_time:.4f}s"
            )

            # Add basic rate-limiting/audit headers placeholder
            response.headers["X-Process-Time"] = str(process_time)
            response.headers["X-RateLimit-Limit"] = "1000"
            response.headers["X-RateLimit-Remaining"] = "999"

            return response
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(
                f"AUDIT_ERROR: method={request.method} path={request.url.path} "
                f"error={str(e)} duration={process_time:.4f}s"
            )
            raise e
