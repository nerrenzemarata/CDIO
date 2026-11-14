import { ArrowRight, CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { Badge, Button, Card, PageHeader, SampleDataNotice } from "@/components/ui";
import { FRAMEWORK, ROADMAP } from "@/lib/data";

const PILLAR_TONE: Record<string, string> = { Regulative: "brand", Normative: "teal", "Cultural-cognitive": "violet" };

export default function FrameworkPage() {
  const core = FRAMEWORK.filter((f) => f.sources >= 2 && f.cases >= 2).length;
  return (
    <>
      <PageHeader
        eyebrow="SO3 · Framework construction"
        title="Theoretical-Strategic Implementation Framework"
        description="Abductive synthesis of success factors, failure points and archetypes into condition → mechanism → outcome statements, each tagged to a Rogers stage and a Scott pillar."
        actions={
          <Button>
            <Plus size={15} /> Add component
          </Button>
        }
      />
      <SampleDataNotice />

      <div className="mb-6 flex flex-wrap gap-3 text-sm">
        <Badge tone="emerald">
          <CheckCircle2 size={12} /> {core} core components
        </Badge>
        <Badge tone="amber">
          <AlertCircle size={12} /> {FRAMEWORK.length - core} tentative
        </Badge>
        <span className="text-xs text-slate-500">Core = traced to ≥ 2 evidence sources and ≥ 2 cases</span>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {FRAMEWORK.map((f) => {
          const isCore = f.sources >= 2 && f.cases >= 2;
          return (
            <Card
              key={f.id}
              title={
                <span className="flex items-center gap-2">
                  <span className="rounded bg-ink-900 px-1.5 py-0.5 text-[11px] font-bold text-white">{f.id}</span>
                  {f.name}
                </span>
              }
              action={isCore ? <Badge tone="emerald">Core</Badge> : <Badge tone="amber">Tentative</Badge>}
            >
              <div className="grid items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                {[
                  ["Condition", f.condition],
                  ["Mechanism", f.mechanism],
                  ["Outcome", f.outcome],
                ].map(([label, text], i) => (
                  <div key={label} className="contents">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
                      <p className="mt-1 text-[13px] leading-snug text-slate-700">{text}</p>
                    </div>
                    {i < 2 && <ArrowRight size={16} className="hidden self-center text-slate-300 md:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <Badge>Rogers: {f.stage}</Badge>
                <Badge tone={PILLAR_TONE[f.pillar]}>{f.pillar} pillar</Badge>
                <span className="ml-auto text-slate-500">
                  Traceability: <b className={f.sources >= 2 ? "text-slate-800" : "text-rose-600"}>{f.sources} sources</b> ·{" "}
                  <b className={f.cases >= 2 ? "text-slate-800" : "text-rose-600"}>{f.cases} cases</b>
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card title="Staged implementation roadmap" subtitle="Actions matched to institutional capacity" className="mt-6">
        <div className="grid gap-4 md:grid-cols-3">
          {(Object.keys(ROADMAP) as (keyof typeof ROADMAP)[]).map((stage, i) => (
            <div key={stage} className="rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-600 text-xs font-bold text-white">{i + 1}</span>
                <p className="font-semibold text-slate-900">{stage}</p>
              </div>
              <ol className="space-y-2.5 p-4">
                {ROADMAP[stage].map((a) => (
                  <li key={a} className="flex gap-2 text-sm text-slate-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-slate-300" />
                    {a}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
