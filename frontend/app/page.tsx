import { fetchIncidents } from "@/lib/api";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { InvestigateBar } from "@/components/investigation/InvestigateBar";
import { SeverityBadge } from "@/components/ui/Badge";
import { AlertTriangle, TrendingUp, Clock, Users, Zap, Activity } from "lucide-react";

export default async function DashboardPage() {
  let incidents = [];
  try {
    incidents = await fetchIncidents();
  } catch {
    incidents = [];
  }

  const active = incidents.filter((i) => i.status === "investigating");
  const resolved = incidents.filter((i) => i.status === "resolved");
  const totalAffected = incidents.reduce((a, b) => a + b.affected_users, 0);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-display font-700 text-text-primary tracking-tight">
            Incident Command Center
          </h1>
          {active.length > 0 && (
            <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider bg-red-500/15 text-red-400 border border-red-500/25 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              {active.length} active
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary">
          Real-time incident overview · AI-powered root cause analysis
        </p>
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Active Incidents", value: active.length, icon: AlertTriangle, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Resolved Today", value: resolved.length, icon: Activity, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Affected Users", value: totalAffected.toLocaleString(), icon: Users, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Avg MTTM", value: "42 min", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-surface-1 border border-border rounded-xl p-4">
            <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={15} className={color} />
            </div>
            <p className="text-xl font-display font-700 text-text-primary">{value}</p>
            <p className="text-xs text-text-muted mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* AI Investigation bar */}
      <div className="bg-surface-1 border border-border rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-coral" />
          <h2 className="text-sm font-semibold text-text-primary">Ask CoralOps AI</h2>
          <span className="text-[10px] font-mono bg-coral/10 text-coral border border-coral/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
            Powered by Coral SDK
          </span>
        </div>
        <InvestigateBar />
      </div>

      {/* Incidents list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-text-primary">Recent Incidents</h2>
          <a href="/incidents" className="text-xs text-text-secondary hover:text-coral transition-colors">
            View all →
          </a>
        </div>
        <div className="space-y-3">
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))
          ) : (
            <div className="text-center py-12 text-text-muted text-sm">
              No incidents found. Make sure the backend is running.
            </div>
          )}
        </div>
      </div>

      {/* Source integrations */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-3">
          Connected Data Sources
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "GitHub", status: "mock" },
            { name: "Grafana", status: "mock" },
            { name: "PagerDuty", status: "mock" },
            { name: "Slack", status: "mock" },
            { name: "Datadog", status: "mock" },
          ].map(({ name, status }) => (
            <div key={name} className="flex items-center gap-2 bg-surface-1 border border-border px-3 py-1.5 rounded-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs text-text-secondary">{name}</span>
              <span className="text-[9px] font-mono text-text-muted uppercase">{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
