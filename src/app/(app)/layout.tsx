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
            <span className="hidden rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 ring-1 ring-emerald-200 sm:inline">
              Phase 1 · Fieldwork (Month 6 of 12)
            </span>
            <Bell size={17} className="text-slate-400" />
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
