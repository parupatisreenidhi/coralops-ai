from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import incidents, investigate, health

app = FastAPI(
    title="CoralOps AI",
    description="Autonomous SRE Incident Investigation Agent",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, tags=["health"])
app.include_router(incidents.router, prefix="/incidents", tags=["incidents"])
app.include_router(investigate.router, prefix="/investigate", tags=["investigate"])
