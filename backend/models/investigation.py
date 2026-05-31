from pydantic import BaseModel
from typing import Optional, List, Any
from enum import Enum


class Severity(str, Enum):
    critical = "critical"
    high = "high"
    medium = "medium"
    low = "low"


class IncidentStatus(str, Enum):
    investigating = "investigating"
    resolved = "resolved"
    mitigated = "mitigated"


class TimelineEvent(BaseModel):
    timestamp: str
    type: str  # deploy | log | alert | slack | commit | metric
    title: str
    description: str
    service: Optional[str] = None
    severity: Optional[str] = None
    source: Optional[str] = None
    metadata: Optional[dict] = None


class EvidenceItem(BaseModel):
    source: str  # logs | commits | slack | alerts | metrics
    type: str
    content: str
    timestamp: str
    confidence: float
    relevant_ids: Optional[List[str]] = None


class ImpactedService(BaseModel):
    name: str
    severity: str
    error_rate: Optional[float] = None
    latency_p99_ms: Optional[float] = None
    is_root: bool = False
    cause: Optional[str] = None


class RecommendedAction(BaseModel):
    priority: int
    action: str
    rationale: str
    owner: Optional[str] = None
    estimated_impact: Optional[str] = None


class InvestigationResult(BaseModel):
    incident_id: str
    query: str
    executive_summary: str
    engineer_summary: str
    probable_root_cause: str
    root_cause_category: str  # deploy | config | code | infra | dependency
    confidence_score: float  # 0.0 - 1.0
    confidence_label: str  # High | Medium | Low
    blast_radius: str
    impacted_services: List[ImpactedService]
    timeline: List[TimelineEvent]
    evidence: List[EvidenceItem]
    recommended_actions: List[RecommendedAction]
    related_commits: List[dict]
    related_alerts: List[dict]
    investigated_at: str
    investigation_duration_ms: int
