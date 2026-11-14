"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  FileSearch,
  ListChecks,
  GitCompareArrows,
  Network,
  Users,
  Settings,
  ExternalLink,
  BookOpen,
  Globe,
} from "lucide-react";

const NAV: { section: string; hidden?: boolean; items: { href: string; label: string; icon: typeof LayoutDashboard }[] }[] = [
  { section: "Overview", items: [{ href: "/", label: "Dashboard", icon: LayoutDashboard }] },
  {
    section: "SO1 · Within-case",
    items: [
      { href: "/cases", label: "Cases", icon: Building2 },
      { href: "/scoring", label: "Consensus scoring", icon: ClipboardCheck },
      { href: "/documents", label: "Document audit", icon: FileSearch },
      { href: "/survey", label: "Faculty survey (FCIS)", icon: ListChecks },
    ],
  },
  {
    section: "SO2–SO4 · Synthesis",
    hidden: true, // revealed by the secret button (the avatar in the sidebar footer)
    items: [
      { href: "/cross-case", label: "Cross-case synthesis", icon: GitCompareArrows },
      { href: "/framework", label: "Framework builder", icon: Network },
      { href: "/delphi", label: "e-Delphi validation", icon: Users },
    ],
  },
  {
    section: "System",
    items: [
      { href: "/rubric", label: "CDIO rubric", icon: BookOpen },
      { href: "/settings", label: "Thresholds & settings", icon: Settings },
    ],
  },
];

const UNLOCK_KEY = "cdio-show-synthesis";

export function Sidebar() {
  const path = usePathname();
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(UNLOCK_KEY) === "1");
    } catch {}
  }, []);

  const toggleHidden = () => {
    const next = !unlocked;
    setUnlocked(next);
    try {
      localStorage.setItem(UNLOCK_KEY, next ? "1" : "0");
    } catch {}
  };

  const visible = NAV.filter((g) => !g.hidden || unlocked || g.items.some((i) => path.startsWith(i.href)));
  return (
    <aside className="blueprint sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 text-slate-300 lg:flex">
      <div className="px-4 pb-3 pt-5">
        <Link href="/" className="block rounded-lg bg-white px-3 py-2.5 shadow-[0_0_0_3px_rgba(48,156,156,0.45)] transition hover:shadow-[0_0_0_3px_rgba(48,156,156,0.8)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/cdio-logo.jpg" alt="CDIO: Conceive Design Implement Operate" width={500} height={240} className="h-auto w-full" />
        </Link>
        <p className="mt-2.5 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-brand-200/80">Institutionalization Study</p>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {visible.map((g) => (
          <div key={g.section} className="mt-4">
            <p className="px-2 pb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-brand-200/60">{g.section}</p>
            {g.items.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? path === "/" : path.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "mb-0.5 flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] transition-colors",
                    active ? "bg-white/10 font-medium text-white shadow-[inset_3px_0_0_var(--color-safety-500)]" : "hover:bg-white/5 hover:text-white",
                  )}
                >
                  <Icon size={16} className={active ? "text-safety-400" : "text-brand-200/50"} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
        <div className="mt-4">
          <p className="px-2 pb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-brand-200/60">Participant views</p>
          <Link href="/s/demo" className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] hover:bg-white/5 hover:text-white">
            <ExternalLink size={16} className="text-brand-200/50" /> Survey form (public)
          </Link>
          <a href="https://www.cdio.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] hover:bg-white/5 hover:text-white">
            <Globe size={16} className="text-brand-200/50" /> cdio.org
          </a>
        </div>
      </nav>
      <div className="border-t border-white/10 px-4 py-3">
        <div className="flex items-center gap-2.5">
          {/* secret button: looks like a plain avatar; toggles the hidden SO2–SO4 pages */}
          <button
            type="button"
            onClick={toggleHidden}
            aria-label="JB"
            className="grid h-8 w-8 cursor-default place-items-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-100 focus:outline-none"
          >
            JB
          </button>
          <div className="leading-tight">
            <p className="text-xs font-medium text-white">Engr. J. R. Bajuyo</p>
            <p className="text-[11px] text-slate-400">Researcher · Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
