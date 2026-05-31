from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import Optional
from agents.correlation_engine import investigate

router = APIRouter()


class InvestigateRequest(BaseModel):
    query: str
    incident_id: Optional[str] = None


@router.get("")
def investigate_get(
    q: str = Query(..., description="Natural language investigation query"),
    incident_id: Optional[str] = Query(None, description="Optional specific incident ID"),
):
    return investigate(query=q, incident_id=incident_id)


@router.post("")
def investigate_post(body: InvestigateRequest):
    return investigate(query=body.query, incident_id=body.incident_id)
