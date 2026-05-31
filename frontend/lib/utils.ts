import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }) + " UTC";
}

export function formatDateTime(isoString: string): string {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }) + " UTC";
}

export function severityColor(severity: string) {
  const map: Record<string, string> = {
    critical: "text-red-400",
    high: "text-orange-400",
    medium: "text-amber-400",
    low: "text-green-400",
    info: "text-blue-400",
    warn: "text-amber-400",
    warning: "text-amber-400",
    error: "text-red-400",
    fatal: "text-red-500",
  };
  return map[severity?.toLowerCase()] ?? "text-text-secondary";
}

export function severityBg(severity: string) {
  const map: Record<string, string> = {
    critical: "badge-critical",
    high: "badge-high",
    medium: "badge-medium",
    low: "badge-low",
    info: "badge-info",
  };
  return map[severity?.toLowerCase()] ?? "badge-info";
}

export function confidenceColor(score: number) {
  if (score >= 0.85) return "text-green-400";
  if (score >= 0.65) return "text-amber-400";
  return "text-red-400";
}

export function timelineTypeIcon(type: string): string {
  const map: Record<string, string> = {
    deploy: "🚀",
    commit: "📝",
    alert: "🚨",
    log: "📋",
    slack: "💬",
    metric: "📊",
  };
  return map[type] ?? "•";
}
