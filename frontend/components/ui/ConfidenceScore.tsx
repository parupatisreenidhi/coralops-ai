import { cn, confidenceColor } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

interface ConfidenceScoreProps {
  score: number;
  label: string;
  className?: string;
}

export function ConfidenceScore({ score, label, className }: ConfidenceScoreProps) {
  const percent = Math.round(score * 100);
  const color = confidenceColor(score);
  const trackColor = score >= 0.85 ? "bg-green-400" : score >= 0.65 ? "bg-amber-400" : "bg-red-400";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className={color} />
          <span className="text-xs text-text-secondary font-medium">Root Cause Confidence</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-xl font-display font-700", color)}>{percent}%</span>
          <span className={cn("text-xs font-mono uppercase tracking-wider px-1.5 py-0.5 rounded", 
            score >= 0.85 ? "bg-green-500/15 text-green-400" : 
            score >= 0.65 ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400"
          )}>
            {label}
          </span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-surface-3 overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", trackColor)}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
