import { Activity, TrendingUp, TrendingDown, Minus } from "lucide-react";

const SERVICES = [
  {
    name: "payment-service",
    team: "platform-sre",
    status: "degraded",
    slo: 94.2,
    error_rate: 34.2,
    p99_ms: 14200,
    incidents_30d: 3,
    last_deploy: "v2.14.3 · Jan 15",
    trend: "down",
  },
  {
    name: "checkout-service",
    team: "checkout-team",
    status: "degraded",
    slo: 95.1,
    error_rate: 28.1,
    p99_ms: 8900,
    incidents_30d: 2,
    last_deploy: "v1.9.1 · Jan 14",
    trend: "down",
  },
  {
    name: "order-service",
    team: "orders-team",
    status: "warning",
    slo: 99.1,
    error_rate: 8.3,
    p99_ms: 4200,
    incidents_30d: 1,
    last_deploy: "v3.2.0 · Jan 13",
    trend: "stable",
  },
  {
    name: "notification-service",
    team: "notifications-team",
    status: "healthy",
    slo: 99.7,
    error_rate: 0.2,
    p99_ms: 120,
    incidents_30d: 1,
    last_deploy: "v2.1.0 · Jan 12",
    trend: "up",
  },
  {
    name: "auth-service",
    team: "identity-team",
    status: "healthy",
    slo: 99.98,
    error_rate: 0.02,
    p99_ms: 48,
    incidents_30d: 0,
    last_deploy: "v5.0.2 · Jan 10",
    trend: "up",
  },
  {
    name: "api-gateway",
    team: "platform-sre",
    status: "healthy",
    slo: 99.95,
    error_rate: 0.05,
    p99_ms: 15,
    incidents_30d: 0,
    last_deploy: "v8.1.1 · Jan 9",
    trend: "stable",
  },
];

const statusConfig: Record<string, { dot: string; label: string; badge: string }> = {
  healthy:  { dot: "bg-green-400", label: "Healthy",  badge: "bg-green-500/15 text-green-400 border-green-500/25" },
  warning:  { dot: "bg-amber-400 animate-pulse", label: "Warning", badge: "bg-amber-500/15 text-amber-400 border-amber-500/25" },
  degraded: { dot: "bg-red-400 animate-pulse", label: "Degraded", badge: "bg-red-500/15 text-red-400 border-red-500/25" },
};

export default function ServicesPage() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-display font-700 text-text-primary tracking-tight mb-1">
          Services
        </h1>
        <p className="text-sm text-text-secondary">
          Service health, SLO status, and incident correlation
        </p>
      </div>

      {/* Health summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Healthy", count: SERVICES.filter(s => s.status === "healthy").length, color: "text-green-400" },
          { label: "Warning / Degraded", count: SERVICES.filter(s => s.status !== "healthy").length, color: "text-red-400" },
          { label: "Avg SLO (30d)", count: (SERVICES.reduce((a, b) => a + b.slo, 0) / SERVICES.length).toFixed(1) + "%", color: "text-blue-400" },
        ].map(({ label, count, color }) => (
          <div key={label} className="bg-surface-1 border border-border rounded-xl p-4">
            <p className={`text-2xl font-display font-700 ${color}`}>{count}</p>
            <p className="text-xs text-text-muted mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Services table */}
      <div className="bg-surface-1 border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {["Service", "Status", "Error Rate", "P99 Latency", "SLO 30d", "Incidents", "Last Deploy"].map((h) => (
                <th key={h} className="text-left text-[10px] font-mono uppercase tracking-wider text-text-muted px-4 py-3">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SERVICES.map((svc, i) => {
              const cfg = statusConfig[svc.status];
              const TrendIcon = svc.trend === "up" ? TrendingUp : svc.trend === "down" ? TrendingDown : Minus;
              const trendColor = svc.trend === "up" ? "text-green-400" : svc.trend === "down" ? "text-red-400" : "text-text-muted";

              return (
                <tr key={svc.name} className="border-b border-border/50 last:border-0 hover:bg-surface-2 transition-colors">
                  <td className="px-4 py-3.5">
                    <div>
                      <p className="text-xs font-mono font-semibold text-text-primary">{svc.name}</p>
                      <p className="text-[10px] text-text-muted">{svc.team}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${cfg.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-mono ${svc.error_rate > 10 ? "text-red-400" : svc.error_rate > 1 ? "text-amber-400" : "text-green-400"}`}>
                      {svc.error_rate}%
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-mono ${svc.p99_ms > 5000 ? "text-red-400" : svc.p99_ms > 1000 ? "text-amber-400" : "text-green-400"}`}>
                      {svc.p99_ms >= 1000 ? `${(svc.p99_ms / 1000).toFixed(1)}s` : `${svc.p99_ms}ms`}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <TrendIcon size={11} className={trendColor} />
                      <span className={`text-xs font-mono ${svc.slo < 99 ? "text-red-400" : "text-green-400"}`}>
                        {svc.slo}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`text-xs font-mono ${svc.incidents_30d > 2 ? "text-red-400" : svc.incidents_30d > 0 ? "text-amber-400" : "text-text-muted"}`}>
                      {svc.incidents_30d}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-xs font-mono text-text-muted">{svc.last_deploy}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
