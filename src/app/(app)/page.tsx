import Link from "next/link";
import { Building2, ClipboardCheck, ListChecks, AlertTriangle, ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { Card, Stat, Badge, Progress, SampleDataNotice } from "@/components/ui";
import { WhatIsCDIO } from "@/components/what-is-cdio";
import { IMIBars, MaturityRadar } from "@/components/charts";
import { CASES, STANDARDS, caseIMI, caseStandardMedians, unverifiedCount, surveyData, RECENT } from "@/lib/data";
import { imiBand } from "@/lib/stats";

const PHASES = [
  { so: "SO1", title: "Within-case baseline", months: "Months 3–8", progress: 78 },
  { so: "SO2", title: "Cross-case synthesis", months: "Months 8–9", progress: 20 },
  { so: "SO3", title: "Framework construction", months: "Month 9", progress: 10 },
  { so: "SO4", title: "e-Delphi validation", months: "Months 10–11", progress: 0 },
];

export default function Dashboard() {
  const programs = CASES.reduce((a, c) => a + c.programs.length, 0);
  const consensusDone = CASES.reduce((a, c) => a + c.programs.filter((p) => p.status === "Consensus done").length, 0);
  const survey = surveyData();
  const responses = survey.reduce((a, s) => a + s.responses, 0);
  const eligible = survey.reduce((a, s) => a + s.eligible, 0);
  const unverified = CASES.reduce((a, c) => a + unverifiedCount(c), 0);

  return (
    <>
      <section className="relative isolate mb-6 overflow-hidden rounded-2xl border border-ink-900 px-7 py-10 text-white shadow-lg">
        {/* background photo: engineering students working on design-implement projects */}
        <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-[center_35%]" style={{ backgroundImage: "url(/dashboard-hero.jpg)" }} />
        {/* dark on the left for the text, lighter on the right so the students stay visible */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950/95 via-ink-950/75 to-ink-950/25" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1 bg-safety-500" />
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-brand-200/80">
          <span className="h-2 w-2 rotate-45 bg-safety-500" /> PhD Engineering Education · Research overview
        </p>
        <h1 className="mt-2 max-w-3xl text-[28px] font-semibold leading-tight tracking-tight">Institutionalization of the CDIO Framework in Philippine Engineering Education</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-300">
          A comparative multiple-case study of five CDIO collaborator state universities: maturity on the 12 CDIO Standards, adoption pathways, and an
          expert-validated implementation framework.
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
          <span className="h-px w-6 bg-safety-500" />A dissertation by <span className="font-semibold text-white">Engr. John Rey B. Bajuyo</span>
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/scoring" className="inline-flex items-center gap-1.5 rounded-lg bg-safety-500 px-3.5 py-2 text-sm font-semibold text-ink-950 hover:bg-safety-400">
            Open consensus session <ArrowRight size={15} />
          </Link>
          <button className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/5 px-3.5 py-2 text-sm font-medium text-white hover:bg-white/10">
            Export data
          </button>
        </div>
        <dl className="mt-7 grid max-w-xl grid-cols-3 border border-white/20 bg-ink-950/50 font-mono backdrop-blur-sm text-[11px]">
          {[
            ["CASES", "05 SUCs"],
            ["REGIONS", "LUZ · VIS · MIN"],
            ["STANDARDS", "CDIO 01–12"],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-white/20 px-3 py-2 last:border-r-0">
              <dt className="text-brand-200/70">{k}</dt>
              <dd className="mt-0.5 text-white">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <SampleDataNotice />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat label="Cases" value="5" hint={`${programs} embedded programs`} icon={<Building2 size={16} />} />
        <Stat label="Consensus sessions" value={`${consensusDone}/${programs}`} hint="Programs scored on all 12 standards" icon={<ClipboardCheck size={16} />} />
        <Stat label="FCIS responses" value={responses} hint={`${Math.round((responses / eligible) * 100)}% of ${eligible} eligible faculty`} icon={<ListChecks size={16} />} />
        <Stat label="Unverified scores" value={unverified} hint="Score ≥ 3 without audit evidence" icon={<AlertTriangle size={16} className="text-amber-500" />} />
      </div>

      <div className="mt-6">
        <WhatIsCDIO />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Study phases" subtitle="Each phase's output feeds the next" className="xl:col-span-1">
          <ol className="space-y-4">
            {PHASES.map((p) => (
              <li key={p.so}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-800">
                    <span className="mr-2 inline-block w-9 rounded bg-slate-100 text-center text-[11px] font-semibold text-slate-600">{p.so}</span>
                    {p.title}
                  </span>
                  <span className="tabular text-xs text-slate-500">{p.progress}%</span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={p.progress} tone={p.progress >= 75 ? "emerald" : "brand"} />
                  <span className="whitespace-nowrap text-[11px] text-slate-400">{p.months}</span>
                </div>
              </li>
            ))}
          </ol>
        </Card>

        <Card title="Institutional Maturity Index by case" subtitle="College-level median of consensus scores, as % of maximum (60)" className="xl:col-span-2">
          <IMIBars data={CASES.map((c) => ({ name: `${c.code} · ${c.short}`, imi: caseIMI(c) }))} />
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-5">
        <Card title="Maturity profiles across the 12 standards" subtitle="Overlay of college medians (0–5)" className="xl:col-span-3">
          <MaturityRadar axes={STANDARDS.map((s) => `S${s.n}`)} series={CASES.map((c) => ({ name: c.short, values: caseStandardMedians(c) }))} height={380} />
        </Card>
        <div className="space-y-6 xl:col-span-2">
          <Card title="Case fieldwork status" bodyClass="p-0">
            <ul className="divide-y divide-slate-100">
              {CASES.map((c) => {
                const done = c.fieldwork.filter((f) => f.done).length;
                const band = imiBand(caseIMI(c));
                return (
                  <li key={c.id}>
                    <Link href={`/cases/${c.id}`} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">{c.code}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-slate-800">{c.short}</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Progress value={(done / c.fieldwork.length) * 100} tone={done === c.fieldwork.length ? "emerald" : "brand"} />
                          <span className="tabular text-[11px] text-slate-400">
                            {done}/{c.fieldwork.length}
                          </span>
                        </div>
                      </div>
                      <Badge tone={band.tone}>{caseIMI(c).toFixed(0)}</Badge>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Card>
          <Card title="Recent activity" bodyClass="py-3">
            <ul className="space-y-3">
              {RECENT.map((r, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  {i < 2 ? <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> : <Circle size={16} className="mt-0.5 shrink-0 text-slate-300" />}
                  <div>
                    <p className="text-slate-700">{r.what}</p>
                    <p className="text-[11px] text-slate-400">
                      {r.who} · {r.when}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </>
  );
}
