const STEPS = [
  "Scanning recent deployments...",
  "Correlating application logs...",
  "Analyzing GitHub commits...",
  "Reading alert history...",
  "Processing Slack discussions...",
  "Calculating root cause confidence...",
  "Generating investigation report...",
];

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export function InvestigatingLoader({ query }: { query: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length - 1) return;
    const t = setTimeout(() => setStep((s) => s + 1), 500);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-in">
      {/* Animated icon */}
      <div className="w-14 h-14 rounded-2xl bg-coral-glow border border-coral/30 flex items-center justify-center mb-6">
        <Sparkles size={22} className="text-coral animate-pulse" />
      </div>

      <h3 className="text-lg font-display font-600 text-text-primary mb-2">Investigating</h3>
      <p className="text-sm text-text-secondary mb-8 max-w-sm line-clamp-1">"{query}"</p>

      {/* Steps */}
      <div className="w-full max-w-xs space-y-2 text-left">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
              i < step ? "bg-green-500" : i === step ? "bg-coral animate-pulse" : "bg-surface-3 border border-border"
            }`}>
              {i < step && <span className="text-[8px] text-white">✓</span>}
            </div>
            <span className={`text-xs transition-all duration-300 ${
              i === step ? "text-text-primary" : i < step ? "text-green-400" : "text-text-muted"
            }`}>
              {s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
