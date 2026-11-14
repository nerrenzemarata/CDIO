import Link from "next/link";
import clsx from "clsx";
import { Card, PageHeader, scoreClass } from "@/components/ui";
import { GENERAL_RUBRIC, RUBRIC, RUBRIC_SOURCE } from "@/lib/rubric";

const GROUPS = [
  { label: "Program philosophy", stds: [1] },
  { label: "Curriculum development", stds: [2, 3, 4] },
  { label: "Design-implement experiences & workspaces", stds: [5, 6] },
  { label: "Methods of teaching and learning", stds: [7, 8] },
  { label: "Faculty development", stds: [9, 10] },
  { label: "Assessment and evaluation", stds: [11, 12] },
];

function LevelTable({ levels }: { levels: string[] }) {
  return (
    <ol className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200">
      {[5, 4, 3, 2, 1, 0].map((v) => (
        <li key={v} className="flex items-start gap-3 px-3 py-2.5">
          <span className={clsx("tabular grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm font-semibold", scoreClass(v))}>{v}</span>
          <span className="text-[13px] leading-snug text-slate-700">{levels[v]}</span>
        </li>
      ))}
    </ol>
  );
}

export default async function RubricPage({ searchParams }: { searchParams: Promise<{ std?: string }> }) {
  const { std } = await searchParams;
  const sel = Math.min(12, Math.max(1, Number(std) || 1));
  const s = RUBRIC[sel - 1];

  return (
    <>
      <PageHeader
        eyebrow="Reference · Scoring basis for SO1"
        title="CDIO Standards rubric"
        description={`${RUBRIC_SOURCE}. A six-point scale for self-assessing compliance; levels are hierarchical, so each level presumes the ones below it.`}
      />

      <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
        <Card title="Standards" bodyClass="p-2">
          {GROUPS.map((g) => (
            <div key={g.label} className="mb-2 last:mb-0">
              <p className="px-2.5 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{g.label}</p>
              {g.stds.map((n) => (
                <Link
                  key={n}
                  href={`?std=${n}`}
                  className={clsx(
                    "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px]",
                    n === sel ? "bg-brand-50 font-medium text-brand-800" : "text-slate-600 hover:bg-slate-50",
                  )}
                >
                  <span className="tabular w-5 text-xs text-slate-400">{n}</span>
                  {RUBRIC[n - 1].title}
                </Link>
              ))}
            </div>
          ))}
        </Card>

        <div className="space-y-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">Standard {s.n}</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">{s.title}</h2>
            <p className="mt-2 text-sm italic text-slate-600">{s.statement}</p>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.description}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rationale</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{s.rationale}</p>
              </div>
            </div>
          </Card>

          <Card title={`Rubric: Standard ${s.n}`} subtitle="Criteria for each scale level">
            <LevelTable levels={s.levels} />
          </Card>

          <Card title="General rubric" subtitle="The pattern every customized rubric follows">
            <LevelTable levels={GENERAL_RUBRIC} />
          </Card>
        </div>
      </div>
    </>
  );
}
