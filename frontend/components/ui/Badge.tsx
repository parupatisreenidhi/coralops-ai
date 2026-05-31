import { cn, severityBg } from "@/lib/utils";

interface BadgeProps {
  severity: string;
  label?: string;
  className?: string;
  size?: "sm" | "md";
}

export function SeverityBadge({ severity, label, className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-mono uppercase tracking-wider rounded",
        size === "sm" ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-0.5",
        severityBg(severity),
        className
      )}
    >
      {label ?? severity}
    </span>
  );
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    investigating: "bg-orange-500/15 text-orange-400 border border-orange-500/25",
    resolved: "bg-green-500/15 text-green-400 border border-green-500/25",
    mitigated: "bg-blue-500/15 text-blue-400 border border-blue-500/25",
  };
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded",
      styles[status] ?? "bg-surface-2 text-text-secondary",
      className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === "investigating" ? "bg-orange-400 animate-pulse" :
        status === "resolved" ? "bg-green-400" : "bg-blue-400"
      )} />
      {status}
    </span>
  );
}
