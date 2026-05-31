from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def root():
    return {
        "service": "CoralOps AI",
        "version": "1.0.0",
        "status": "operational",
        "description": "Autonomous SRE Incident Investigation Agent",
    }


@router.get("/health")
def health():
    return {"status": "ok"}
