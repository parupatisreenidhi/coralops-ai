import { RecommendedAction } from "@/types";
import { CheckCircle2, User, Zap } from "lucide-react";

interface ActionsProps {
  actions: RecommendedAction[];
}

export function ActionsPanel({ actions }: ActionsProps) {
  return (
    <div className="space-y-2">
      {actions.map((action) => (
        <div
          key={action.priority}
          className="flex gap-4 p-4 rounded-xl bg-surface-1 border border-border hover:border-border-2 transition-colors"
        >
          {/* Priority */}
          <div className="shrink-0 w-6 h-6 rounded-full bg-surface-3 border border-border-2 flex items-center justify-center">
            <span className="text-[10px] font-mono font-700 text-text-secondary">{action.priority}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary mb-1 leading-snug">{action.action}</p>
            <p className="text-xs text-text-secondary leading-relaxed mb-2">{action.rationale}</p>
            <div className="flex items-center gap-4 flex-wrap">
              {action.owner && (
                <div className="flex items-center gap-1.5 text-[10px] text-text-muted">
                  <User size={10} />
                  <span className="font-mono">{action.owner}</span>
                </div>
              )}
              {action.estimated_impact && (
                <div className="flex items-center gap-1.5 text-[10px] text-green-400">
                  <Zap size={10} />
                  <span>{action.estimated_impact}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
