"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { investigate } from "@/lib/api";
import { InvestigationResult } from "@/types";
import { InvestigateBar } from "@/components/investigation/InvestigateBar";
import { InvestigatingLoader } from "@/components/investigation/InvestigatingLoader";
import { RootCausePanel } from "@/components/investigation/RootCausePanel";
import { Timeline } from "@/components/investigation/Timeline";
import { EvidencePanel } from "@/components/investigation/EvidencePanel";
import { ActionsPanel } from "@/components/investigation/ActionsPanel";
import { SeverityBadge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";
import { Sparkles, BookOpen, Wrench, Clock, FileText, Zap, ChevronDown } from "lucide-react";

type TabId = "summary" | "timeline" | "evidence" | "actions";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "summary", label: "Root Cause", icon: Zap },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "evidence", label: "Evidence", icon: FileText },
  { id: "actions", label: "Actions", icon: Wrench },
];

export default function InvestigatePage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";
  const initialIncidentId = searchParams.get("incident_id") ?? undefined;

  const [query, setQuery] = useState(initialQuery);
  const [result, setResult] = useState<InvestigationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("summary");
  const [viewMode, setViewMode] = useState<"executive" | "engineer">("executive");

  async function runInvestigation(q: string) {
    if (!q.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    setQuery(q);
    try {
      const data = await investigate(q, initialIncidentId);
      setResult(data);
    } catch (e) {
      setError("Investigation failed. Make sure the backend is running on http://localhost:8000");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (initialQuery) runInvestigation(initialQuery);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-display font-700 text-text-primary tracking-tight mb-1">
            Incident Investigation
          </h1>
          <p className="text-sm text-text-secondary">
            Ask CoralOps AI to correlate deploys, logs, commits, alerts, and team discussions.
          </p>
        </div>
        <InvestigateBar
          defaultQuery={query}
          onSubmit={runInvestigation}
          isLoading={isLoading}
          compact={!!result}
        />
      </div>

      {/* Loading */}
      {isLoading && <InvestigatingLoader query={query} />}

      {/* Error */}
      {error && !isLoading && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/25 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && !result && (
        <div className="text-center py-24 text-text-muted space-y-3">
          <Sparkles size={32} className="mx-auto text-text-muted/40" />
          <p className="text-sm">Ask CoralOps AI to investigate an incident above.</p>
          <p className="text-xs text-text-muted/60">Try: "Why did payment API fail yesterday?"</p>
        </div>
      )}

      {/* Result */}
      {result && !isLoading && (
        <div className="space-y-6 animate-slide-up">
          {/* Incident header bar */}
          <div className="flex items-center justify-between flex-wrap gap-3 p-4 bg-surface-1 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <SeverityBadge severity="critical" />
              <span className="font-mono text-xs text-text-secondary">{result.incident_id}</span>
              <span className="text-xs text-text-muted">investigated {formatDateTime(result.investigated_at)}</span>
              <span className="text-[10px] font-mono text-text-muted border border-border px-1.5 py-0.5 rounded">
                {result.investigation_duration_ms}ms
              </span>
            </div>
            {/* View mode toggle */}
            <div className="flex bg-surface-2 border border-border rounded-lg p-0.5 gap-0.5">
              {(["executive", "engineer"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 text-[11px] font-medium rounded-md capitalize transition-all ${
                    viewMode === mode
                      ? "bg-surface-3 text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {mode} view
                </button>
              ))}
            </div>
          </div>

          {/* Summary card */}
          <div className="p-5 bg-surface-1 border border-border rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={13} className="text-coral" />
              <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">
                {viewMode === "executive" ? "Executive Summary" : "Engineer Summary"}
              </span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed">
              {viewMode === "executive" ? result.executive_summary : result.engineer_summary}
            </p>
          </div>

          {/* Tabbed panels */}
          <div className="bg-surface-1 border border-border rounded-xl overflow-hidden">
            {/* Tab bar */}
            <div className="flex border-b border-border">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-5 py-3.5 text-xs font-medium transition-all border-b-2 -mb-px ${
                    activeTab === id
                      ? "border-coral text-coral"
                      : "border-transparent text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <Icon size={13} />
                  {label}
                  {id === "evidence" && (
                    <span className="text-[9px] bg-surface-3 text-text-muted px-1.5 py-0.5 rounded-full font-mono">
                      {result.evidence.length}
                    </span>
                  )}
                  {id === "timeline" && (
                    <span className="text-[9px] bg-surface-3 text-text-muted px-1.5 py-0.5 rounded-full font-mono">
                      {result.timeline.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6">
              {activeTab === "summary" && <RootCausePanel result={result} />}
              {activeTab === "timeline" && <Timeline events={result.timeline} />}
              {activeTab === "evidence" && <EvidencePanel evidence={result.evidence} />}
              {activeTab === "actions" && <ActionsPanel actions={result.recommended_actions} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
