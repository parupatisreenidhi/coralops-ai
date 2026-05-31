"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle, Search, LayoutDashboard, GitBranch,
  Activity, Settings, Zap, Radio
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/investigate", icon: Search, label: "Investigate" },
  { href: "/incidents", icon: AlertTriangle, label: "Incidents" },
  { href: "/services", icon: Activity, label: "Services" },
  { href: "/architecture", icon: GitBranch, label: "Architecture" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] shrink-0 flex flex-col border-r border-border bg-surface z-20">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-coral flex items-center justify-center">
            <Zap size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-display font-700 text-sm text-text-primary tracking-tight">
              CoralOps
            </span>
            <span className="ml-1 text-xs text-coral font-mono font-500">AI</span>
          </div>
        </div>
        <p className="text-[10px] text-text-muted mt-1.5 font-mono uppercase tracking-wider">
          SRE Investigation Agent
        </p>
      </div>

      {/* Live status */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-surface-2">
          <Radio size={10} className="text-coral animate-pulse" />
          <span className="text-[10px] font-mono text-text-secondary uppercase tracking-wider">
            1 Active Incident
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                active
                  ? "bg-coral-glow text-coral border border-coral/20"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-2"
              )}
            >
              <Icon size={15} strokeWidth={active ? 2.2 : 1.8} />
              <span className="font-medium">{label}</span>
              {href === "/incidents" && (
                <span className="ml-auto text-[10px] font-mono bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">
                  1
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border space-y-3">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-6 h-6 rounded-full bg-surface-3 flex items-center justify-center text-xs font-mono text-text-secondary">
            P
          </div>
          <div className="min-w-0">
            <p className="text-xs text-text-primary truncate">priya.k</p>
            <p className="text-[10px] text-text-muted">On-call SRE</p>
          </div>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400"></div>
        </div>
      </div>
    </aside>
  );
}
