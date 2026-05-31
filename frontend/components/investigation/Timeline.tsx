import { TimelineEvent } from "@/types";
import { formatTime, timelineTypeIcon, cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  deploy: "border-blue-500/40 bg-blue-500/10 text-blue-400",
  commit: "border-purple-500/40 bg-purple-500/10 text-purple-400",
  alert:  "border-red-500/40 bg-red-500/10 text-red-400",
  log:    "border-border-2 bg-surface-2 text-text-secondary",
  slack:  "border-green-500/40 bg-green-500/10 text-green-400",
  metric: "border-amber-500/40 bg-amber-500/10 text-amber-400",
};

const levelStyles: Record<string, string> = {
  fatal: "text-red-400",
  error: "text-red-400",
  warn: "text-amber-400",
  warning: "text-amber-400",
  info: "text-text-secondary",
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-amber-400",
  low: "text-green-400",
};

interface TimelineProps {
  events: TimelineEvent[];
  maxItems?: number;
}

export function Timeline({ events, maxItems }: TimelineProps) {
  const displayed = maxItems ? events.slice(0, maxItems) : events;

  return (
    <div className="space-y-0">
      {displayed.map((event, i) => (
        <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
          {/* Connector line */}
          {i < displayed.length - 1 && (
            <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gradient-to-b from-border-2 to-transparent" />
          )}

          {/* Icon dot */}
          <div className={cn(
            "shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center text-[10px] z-10",
            typeStyles[event.type] ?? "border-border bg-surface-2 text-text-secondary"
          )}>
            {timelineTypeIcon(event.type)}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-start justify-between gap-2 mb-0.5">
              <p className={cn(
                "text-xs font-semibold leading-snug",
                levelStyles[event.severity?.toLowerCase() ?? ""] ?? "text-text-primary"
              )}>
                {event.title}
              </p>
              <span className="shrink-0 text-[10px] font-mono text-text-muted whitespace-nowrap">
                {formatTime(event.timestamp)}
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">{event.description}</p>
            {event.source && (
              <span className="inline-block mt-1 text-[9px] font-mono uppercase tracking-wider text-text-muted border border-border px-1.5 py-0.5 rounded">
                {event.source}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
