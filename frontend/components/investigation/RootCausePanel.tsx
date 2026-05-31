import { InvestigationResult } from "@/types";
import { ConfidenceScore } from "@/components/ui/ConfidenceScore";
import { SeverityBadge } from "@/components/ui/Badge";
import { AlertTriangle, Cpu, Code, Settings, Server, Link2 } from "lucide-react";

const categoryMeta: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  deploy:     { icon: Cpu, label: "Deployment", color: "text-blue-400" },
  config:     { icon: Settings, label: "Configuration", color: "text-amber-400" },
  code:       { icon: Code, label: "Code Change", color: "text-purple-400" },
  infra:      { icon: Server, label: "Infrastructure", color: "text-orange-400" },
  dependency: { icon: Link2, label: "Dependency", color: "text-cyan-400" },
};

interface RootCausePanelProps {
  result: InvestigationResult;
}

export function RootCausePanel({ result }: RootCausePanelProps) {
  const meta = categoryMeta[result.root_cause_category] ?? { icon: AlertTriangle, label: "Unknown", color: "text-text-secondary" };
  const Icon = meta.icon;

  return (
    <div className="space-y-5">
      {/* Category + confidence */}
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-9 h-9 rounded-xl bg-surface-3 border border-border flex items-center justify-center">
          <Icon size={16} className={meta.color} />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted">Root Cause Category</p>
          <p className={`text-sm font-semibold ${meta.color}`}>{meta.label}</p>
        </div>
      </div>

      {/* Probable root cause */}
      <div className="p-4 rounded-xl bg-surface-2 border border-border-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-2">Probable Root Cause</p>
        <p className="text-sm text-text-primary leading-relaxed font-medium">{result.probable_root_cause}</p>
      </div>

      {/* Confidence */}
      <ConfidenceScore score={result.confidence_score} label={result.confidence_label} />

      {/* Blast radius */}
      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/5 border border-red-500/15">
        <AlertTriangle size={13} className="text-red-400 shrink-0" />
        <p className="text-xs text-red-300 font-medium">{result.blast_radius}</p>
      </div>

      {/* Impacted services */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-3">Impacted Services</p>
        <div className="space-y-2">
          {result.impacted_services.map((svc) => (
            <div key={svc.name} className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 border border-border">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-semibold text-text-primary">{svc.name}</span>
                  {svc.is_root && (
                    <span className="text-[9px] font-mono uppercase tracking-wider bg-coral/15 text-coral border border-coral/25 px-1.5 py-0.5 rounded">
                      Root
                    </span>
                  )}
                  <SeverityBadge severity={svc.severity} size="sm" className="ml-auto" />
                </div>
                <div className="flex items-center gap-3 text-[10px] text-text-muted font-mono">
                  {svc.error_rate !== null && <span className="text-red-400">{svc.error_rate}% err</span>}
                  {svc.latency_p99_ms !== null && <span className="text-amber-400">p99 {svc.latency_p99_ms >= 1000 ? `${(svc.latency_p99_ms / 1000).toFixed(1)}s` : `${svc.latency_p99_ms}ms`}</span>}
                </div>
                {svc.cause && <p className="text-[11px] text-text-secondary mt-1.5 leading-relaxed">{svc.cause}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
