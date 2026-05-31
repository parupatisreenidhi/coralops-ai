"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_QUERIES = [
  "Why did payment API fail yesterday?",
  "What caused the checkout outage?",
  "Show likely root cause for the latest incident",
  "What changed before the error spike?",
  "Summarize the incident timeline",
];

interface InvestigateBarProps {
  defaultQuery?: string;
  onSubmit?: (query: string) => void;
  isLoading?: boolean;
  compact?: boolean;
}

export function InvestigateBar({ defaultQuery = "", onSubmit, isLoading, compact }: InvestigateBarProps) {
  const [query, setQuery] = useState(defaultQuery);
  const router = useRouter();

  function handleSubmit(q?: string) {
    const finalQuery = q ?? query;
    if (!finalQuery.trim()) return;
    if (onSubmit) {
      onSubmit(finalQuery);
    } else {
      router.push(`/investigate?q=${encodeURIComponent(finalQuery)}`);
    }
  }

  return (
    <div className={cn("space-y-3", compact ? "" : "")}>
      {/* Main input */}
      <div className={cn(
        "flex items-center gap-3 rounded-xl border transition-all",
        "bg-surface-1 border-border-2 hover:border-coral/30 focus-within:border-coral/50",
        compact ? "px-3 py-2" : "px-4 py-3.5"
      )}>
        <div className="shrink-0">
          {isLoading ? (
            <Sparkles size={16} className="text-coral animate-pulse" />
          ) : (
            <Search size={16} className="text-text-muted" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="Ask CoralOps AI: Why did payment fail? What caused the outage?"
          className={cn(
            "flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none",
            compact ? "text-sm" : "text-base"
          )}
          disabled={isLoading}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading || !query.trim()}
          className={cn(
            "shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
            "bg-coral text-white text-xs font-semibold",
            "hover:bg-coral-dim transition-colors",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          {isLoading ? "Investigating..." : <>Investigate <ChevronRight size={12} /></>}
        </button>
      </div>

      {/* Example queries */}
      {!compact && (
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => { setQuery(q); handleSubmit(q); }}
              className="text-[11px] text-text-secondary hover:text-text-primary border border-border hover:border-border-2 rounded-full px-3 py-1 transition-all hover:bg-surface-2"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
