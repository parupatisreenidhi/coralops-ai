import { fetchIncidents } from "@/lib/api";
import { IncidentCard } from "@/components/incidents/IncidentCard";
import { AlertTriangle, Filter } from "lucide-react";

export default async function IncidentsPage() {
  let incidents = [];
  try {
    incidents = await fetchIncidents();
  } catch {
    incidents = [];
  }

  const active = incidents.filter((i) => i.status === "investigating");
  const resolved = incidents.filter((i) => i.status !== "investigating");

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-700 text-text-primary tracking-tight mb-1">
            Incidents
          </h1>
          <p className="text-sm text-text-secondary">
            {incidents.length} incidents · {active.length} active
          </p>
        </div>
        <button className="flex items-center gap-2 text-xs text-text-secondary border border-border px-3 py-2 rounded-lg hover:bg-surface-2 transition-colors">
          <Filter size={13} /> Filter
        </button>
      </div>

      {active.length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-red-400 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Active
          </p>
          <div className="space-y-3">
            {active.map((i) => <IncidentCard key={i.id} incident={i} />)}
          </div>
        </div>
      )}

      {resolved.length > 0 && (
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-3">
            Resolved
          </p>
          <div className="space-y-3">
            {resolved.map((i) => <IncidentCard key={i.id} incident={i} />)}
          </div>
        </div>
      )}
    </div>
  );
}
