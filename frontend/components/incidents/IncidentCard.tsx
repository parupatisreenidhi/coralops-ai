import Link from "next/link";
import { Incident } from "@/types";
import { SeverityBadge, StatusBadge } from "@/components/ui/Badge";
import { formatRelativeTime } from "@/lib/utils";
import { Users, Clock, ArrowRight } from "lucide-react";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const borderColor: Record<string, string> = {
    critical: "border-red-500/30 hover:border-red-500/50",
    high: "border-orange-500/30 hover:border-orange-500/50",
    medium: "border-amber-500/30 hover:border-amber-500/50",
    low: "border-green-500/30 hover:border-green-500/50",
  };

  return (
    <div className={`group bg-surface-1 border ${borderColor[incident.severity] ?? "border-border hover:border-border-2"} rounded-xl p-5 transition-all cursor-pointer hover:bg-surface-2`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <SeverityBadge severity={incident.severity} />
          <StatusBadge status={incident.status} />
          <span className="text-[10px] font-mono text-text-muted">{incident.id}</span>
        </div>
        <Link
          href={`/investigate?q=Investigate+${encodeURIComponent(incident.id)}&incident_id=${incident.id}`}
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-coral hover:text-coral/80"
        >
          Investigate <ArrowRight size={12} />
        </Link>
      </div>

      <h3 className="text-sm font-semibold text-text-primary mb-1 leading-snug">{incident.title}</h3>
      <p className="text-xs text-text-secondary mb-4 line-clamp-2">{incident.description}</p>

      <div className="flex items-center gap-4 text-xs text-text-muted">
        <span className="font-mono text-surface-3 bg-surface-3 border border-border px-2 py-0.5 rounded text-[10px] text-text-secondary">
          {incident.service}
        </span>
        <div className="flex items-center gap-1.5">
          <Users size={11} />
          <span>{incident.affected_users.toLocaleString()} users</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={11} />
          <span>{formatRelativeTime(incident.started_at)}</span>
        </div>
        <span className="ml-auto text-right">
          <span className={incident.error_rate_percent > 20 ? "text-red-400" : "text-amber-400"}>
            {incident.error_rate_percent}% errors
          </span>
        </span>
      </div>
    </div>
  );
}
