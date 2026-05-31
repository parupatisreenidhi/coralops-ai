import { EvidenceItem } from "@/types";
import { formatDateTime } from "@/lib/utils";

// Source metadata
const sourceMeta: Record<string, { icon: string; color: string; bg: string }> = {
  commits: { icon: "⬡", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  logs:    { icon: "≡", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  slack:   { icon: "◈", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/20" },
  alerts:  { icon: "⚠", color: "text-red-400",    bg: "bg-red-500/10 border-red-500/20" },
  metrics: { icon: "∿", color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
};

interface EvidencePanelProps {
  evidence: EvidenceItem[];
}

export function EvidencePanel({ evidence }: EvidencePanelProps) {
  return (
    <div className="space-y-3">
      {evidence.map((item, i) => {
        const meta = sourceMeta[item.source] ?? { icon: "•", color: "text-text-secondary", bg: "bg-surface-2 border-border" };
        const confidencePct = Math.round(item.confidence * 100);

        return (
          <div key={i} className={`p-4 rounded-xl border ${meta.bg}`}>
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${meta.color} font-mono`}>{meta.icon}</span>
                <span className={`text-[10px] font-mono uppercase tracking-wider ${meta.color}`}>
                  {item.source} · {item.type.replace(/_/g, " ")}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-14 h-1 rounded-full bg-black/30 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${confidencePct >= 90 ? "bg-green-400" : confidencePct >= 75 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${confidencePct}%` }}
                  />
                </div>
                <span className="text-[10px] font-mono text-text-muted">{confidencePct}%</span>
              </div>
            </div>
            <p className="text-xs text-text-primary leading-relaxed">{item.content}</p>
            <p className="text-[10px] font-mono text-text-muted mt-2">{formatDateTime(item.timestamp)}</p>
          </div>
        );
      })}
    </div>
  );
}
