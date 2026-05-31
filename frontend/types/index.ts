export type Severity = "critical" | "high" | "medium" | "low" | "info";

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  status: "investigating" | "resolved" | "mitigated";
  service: string;
  environment: string;
  started_at: string;
  resolved_at: string | null;
  duration_minutes: number | null;
  error_rate_percent: number;
  affected_users: number;
  owner: string;
  tags: string[];
  description: string;
  related_incidents: string[];
  runbook_url: string;
}

export interface TimelineEvent {
  timestamp: string;
  type: "deploy" | "log" | "alert" | "slack" | "commit" | "metric";
  title: string;
  description: string;
  service: string | null;
  severity: string | null;
  source: string | null;
  metadata: Record<string, unknown> | null;
}

export interface EvidenceItem {
  source: "logs" | "commits" | "slack" | "alerts" | "metrics";
  type: string;
  content: string;
  timestamp: string;
  confidence: number;
  relevant_ids: string[] | null;
}

export interface ImpactedService {
  name: string;
  severity: Severity;
  error_rate: number | null;
  latency_p99_ms: number | null;
  is_root: boolean;
  cause: string | null;
}

export interface RecommendedAction {
  priority: number;
  action: string;
  rationale: string;
  owner: string | null;
  estimated_impact: string | null;
}

export interface InvestigationResult {
  incident_id: string;
  query: string;
  executive_summary: string;
  engineer_summary: string;
  probable_root_cause: string;
  root_cause_category: "deploy" | "config" | "code" | "infra" | "dependency";
  confidence_score: number;
  confidence_label: "High" | "Medium" | "Low";
  blast_radius: string;
  impacted_services: ImpactedService[];
  timeline: TimelineEvent[];
  evidence: EvidenceItem[];
  recommended_actions: RecommendedAction[];
  related_commits: Record<string, unknown>[];
  related_alerts: Record<string, unknown>[];
  investigated_at: string;
  investigation_duration_ms: number;
}
