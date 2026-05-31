from fastapi import APIRouter, HTTPException
from services.data_loader import get_incidents, get_incident_by_id

router = APIRouter()


@router.get("")
def list_incidents():
    incidents = get_incidents()
    return {"incidents": incidents, "total": len(incidents)}


@router.get("/{incident_id}")
def get_incident(incident_id: str):
    incident = get_incident_by_id(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail=f"Incident {incident_id} not found")
    return incident
