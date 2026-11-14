import { Sidebar } from "@/components/sidebar";
import { Search, Bell } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
          <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-400">
            <Search size={15} />
            <span>Search cases, documents, participants…</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="hidden items-center gap-2 rounded-md border border-ink-900/15 bg-white px-2.5 py-1 font-mono text-[11px] text-ink-900 sm:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              PHASE 1 · FIELDWORK · MO 06/12
            </span>
            <Bell size={17} className="text-slate-400" />
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
