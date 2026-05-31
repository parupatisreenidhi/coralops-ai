import { GitBranch, Layers, Zap, Database, MessageSquare, Bell, BarChart2, Search } from "lucide-react";

const DATA_SOURCES = [
  { name: "GitHub", icon: GitBranch, desc: "Commits, PRs, diffs, risk labels", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { name: "Grafana / Datadog", icon: BarChart2, desc: "Metrics, anomalies, dashboards", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { name: "PagerDuty", icon: Bell, desc: "Alerts, on-call, escalation chains", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { name: "Slack", icon: MessageSquare, desc: "Team discussion, runbook links, decisions", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
  { name: "Application Logs", icon: Layers, desc: "Structured logs, errors, traces", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
];

const AGENT_STEPS = [
  { step: "01", title: "Query Understanding", desc: "Natural language query is parsed to identify incident, service, and time range" },
  { step: "02", title: "Multi-Source Retrieval", desc: "Correlation engine fetches signals from all connected data sources simultaneously" },
  { step: "03", title: "Timeline Construction", desc: "All events are chronologically ordered and correlated by service, timestamp, and trace ID" },
  { step: "04", title: "Root Cause Analysis", desc: "Pattern matching across deploys, config changes, code diffs, and log anomalies" },
  { step: "05", title: "Evidence Scoring", desc: "Each evidence item is scored for confidence based on source reliability and signal strength" },
  { step: "06", title: "Action Generation", desc: "Prioritized remediation steps generated based on root cause category and past incidents" },
];

export default function ArchitecturePage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-700 text-text-primary tracking-tight mb-1">
          Architecture
        </h1>
        <p className="text-sm text-text-secondary">
          How CoralOps AI correlates signals from multiple enterprise sources to surface root cause.
        </p>
      </div>

      {/* One-line pitch */}
      <div className="p-5 bg-coral-glow border border-coral/20 rounded-xl">
        <p className="text-sm font-medium text-text-primary leading-relaxed">
          <span className="text-coral font-semibold">CoralOps AI</span> is an autonomous SRE incident investigation agent 
          that combines data from GitHub, monitoring systems, application logs, alerts, and Slack into a single correlated 
          investigation — surfacing probable root cause, confidence score, and recommended actions in seconds.
        </p>
      </div>

      {/* Data sources */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-4">Data Sources (Connectors)</p>
        <div className="grid grid-cols-1 gap-3">
          {DATA_SOURCES.map(({ name, icon: Icon, desc, color, bg }) => (
            <div key={name} className={`flex items-center gap-4 p-4 rounded-xl border ${bg}`}>
              <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={15} className={color} />
              </div>
              <div>
                <p className={`text-sm font-semibold ${color}`}>{name}</p>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
              <span className="ml-auto text-[9px] font-mono uppercase tracking-wider text-text-muted border border-border px-1.5 py-0.5 rounded">mock connector</span>
            </div>
          ))}
        </div>
      </div>

      {/* Agent steps */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-4">Investigation Agent Pipeline</p>
        <div className="space-y-0">
          {AGENT_STEPS.map(({ step, title, desc }, i) => (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-surface-2 border border-border-2 flex items-center justify-center">
                  <span className="text-[10px] font-mono text-coral">{step}</span>
                </div>
                {i < AGENT_STEPS.length - 1 && <div className="w-px flex-1 bg-border mt-1 mb-1" />}
              </div>
              <div className="pb-6 pt-1">
                <p className="text-sm font-semibold text-text-primary mb-0.5">{title}</p>
                <p className="text-xs text-text-secondary">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div>
        <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-3">Tech Stack</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Frontend", "Next.js 14 · TypeScript · Tailwind CSS"],
            ["Backend", "FastAPI · Python · Pydantic"],
            ["AI Layer", "Coral SDK (orchestration) · LLM-ready"],
            ["Data", "Mock JSON · ChromaDB-ready architecture"],
          ].map(([layer, stack]) => (
            <div key={layer} className="p-4 bg-surface-1 border border-border rounded-xl">
              <p className="text-[10px] font-mono uppercase tracking-wider text-text-muted mb-1">{layer}</p>
              <p className="text-xs text-text-primary font-medium">{stack}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
