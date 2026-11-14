"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { AlertTriangle, ArrowDownToLine, CheckCircle2, ChevronLeft, ChevronRight, FileCheck2, Lock } from "lucide-react";
import { Badge, Button, Card, scoreClass } from "@/components/ui";
import { rubricFor, RUBRIC_SOURCE } from "@/lib/rubric";

type Std = { n: number; name: string };
type Prog = { id: string; name: string; consensus: number[]; verified: boolean[]; prescores: number[][] };
type CaseLite = { id: string; code: string; short: string; programs: Prog[]; docs: { code: string; type: string; standards: number[] }[] };

export function ScoringSession({ cases, standards }: { cases: CaseLite[]; standards: Std[] }) {
  const [caseId, setCaseId] = useState(cases[0].id);
  const c = cases.find((x) => x.id === caseId)!;
  const [progId, setProgId] = useState(c.programs[0].id);
  const p = c.programs.find((x) => x.id === progId) ?? c.programs[0];
  const [std, setStd] = useState(0);
  const [agreed, setAgreed] = useState<Record<string, (number | null)[]>>({});
  const [evidence, setEvidence] = useState<Record<string, string[][]>>({});
  const [lowerRule, setLowerRule] = useState<Record<string, boolean[]>>({});

  const key = `${c.id}-${p.id}`;
  const scores = agreed[key] ?? new Array(12).fill(null);
  const ev = evidence[key] ?? standards.map((_, i) => (p.verified[i] ? c.docs.filter((d) => d.standards.includes(i + 1)).slice(0, 1).map((d) => d.code) : []));
  const lower = lowerRule[key] ?? new Array(12).fill(false);

  const pre = p.prescores.map((r) => r[std]);
  const dist = [0, 1, 2, 3, 4, 5].map((v) => pre.filter((x) => x === v).length);
  const maxCount = Math.max(...dist);
  const relevantDocs = c.docs.filter((d) => d.standards.includes(std + 1));
  const current = scores[std];
  const unverified = current !== null && current >= 3 && ev[std].length === 0;
  const completed = scores.filter((s) => s !== null).length;
  const rubric = rubricFor(standards[std].n);

  const setScore = (v: number, viaLower = false) => {
    const next = [...scores];
    next[std] = v;
    setAgreed({ ...agreed, [key]: next });
    const l = [...lower];
    l[std] = viaLower;
    setLowerRule({ ...lowerRule, [key]: l });
  };
  const toggleDoc = (code: string) => {
    const next = ev.map((a) => [...a]);
    next[std] = next[std].includes(code) ? next[std].filter((x) => x !== code) : [...next[std], code];
    setEvidence({ ...evidence, [key]: next });
  };

  const sortedPre = useMemo(() => [...pre].sort((a, b) => a - b), [pre]);
  const disagreementLow = sortedPre[Math.floor((sortedPre.length - 1) / 2)];

  return (
    <div className="space-y-5">
      <Card bodyClass="flex flex-wrap items-end gap-4 py-4">
        <label className="text-xs font-medium text-slate-500">
          Case
          <select
            className="mt-1 block w-56 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800"
            value={caseId}
            onChange={(e) => {
              setCaseId(e.target.value);
              setProgId(cases.find((x) => x.id === e.target.value)!.programs[0].id);
              setStd(0);
            }}
          >
            {cases.map((x) => (
              <option key={x.id} value={x.id}>
                Case {x.code} · {x.short}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium text-slate-500">
          Embedded program
          <select className="mt-1 block w-64 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800" value={p.id} onChange={(e) => { setProgId(e.target.value); setStd(0); }}>
            {c.programs.map((x) => (
              <option key={x.id} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </label>
        <div className="ml-auto flex items-center gap-4">
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Panel</p>
            <p className="text-sm font-semibold text-slate-800">{p.prescores.length} members pre-scored</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Agreed</p>
            <p className="tabular text-sm font-semibold text-slate-800">{completed} / 12</p>
          </div>
          <Button disabled={completed < 12}>
            <Lock size={14} /> Close session
          </Button>
        </div>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[260px_1fr]">
        <Card title="Standards" bodyClass="p-2">
          <ul>
            {standards.map((s, i) => {
              const v = scores[i];
              const flag = v !== null && v >= 3 && ev[i].length === 0;
              return (
                <li key={s.n}>
                  <button
                    onClick={() => setStd(i)}
                    className={clsx(
                      "flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[13px]",
                      std === i ? "bg-brand-50 text-brand-800" : "text-slate-600 hover:bg-slate-50",
                    )}
                  >
                    <span className="tabular w-5 text-xs text-slate-400">{s.n}</span>
                    <span className="flex-1 truncate">{s.name}</span>
                    {v !== null ? (
                      <span className={clsx("tabular inline-flex h-6 w-6 items-center justify-center rounded text-xs font-semibold", scoreClass(v))}>{v}</span>
                    ) : (
                      <span className="h-6 w-6 rounded border border-dashed border-slate-300" />
                    )}
                    {flag && <AlertTriangle size={13} className="text-amber-500" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        <div className="space-y-5">
          <Card
            title={
              <span>
                Standard {standards[std].n}: {standards[std].name}
              </span>
            }
            subtitle={rubric.statement}
            action={
              <div className="flex gap-1">
                <Button variant="secondary" onClick={() => setStd(Math.max(0, std - 1))} disabled={std === 0} aria-label="Previous standard">
                  <ChevronLeft size={15} />
                </Button>
                <Button variant="secondary" onClick={() => setStd(Math.min(11, std + 1))} disabled={std === 11} aria-label="Next standard">
                  <ChevronRight size={15} />
                </Button>
              </div>
            }
          >
            <details className="group mb-5 rounded-lg border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm">
              <summary className="cursor-pointer select-none text-xs font-semibold text-slate-600 marker:text-slate-400">
                Description and rationale of Standard {rubric.n}
              </summary>
              <p className="mt-2 leading-relaxed text-slate-600">
                <b className="text-slate-700">Description.</b> {rubric.description}
              </p>
              <p className="mt-2 leading-relaxed text-slate-600">
                <b className="text-slate-700">Rationale.</b> {rubric.rationale}
              </p>
            </details>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Anonymized spread of individual pre-scores</p>
            <div className="mt-3 grid grid-cols-6 gap-3">
              {dist.map((n, v) => (
                <div key={v} className="flex flex-col items-center">
                  <div className="flex h-28 w-full items-end justify-center rounded-lg bg-slate-50 px-3 pb-0">
                    <div className="w-full rounded-t-md bg-brand-500/80 transition-all" style={{ height: `${maxCount ? (n / maxCount) * 100 : 0}%` }} />
                  </div>
                  <span className="tabular mt-1.5 text-sm font-semibold text-slate-800">{v}</span>
                  <span className="text-[11px] text-slate-400">{n} rater{n === 1 ? "" : "s"}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              <Badge>Range {Math.min(...pre)}–{Math.max(...pre)}</Badge>
              <Badge>Median {sortedPre[Math.floor(sortedPre.length / 2)]}</Badge>
              <Badge tone={Math.max(...pre) - Math.min(...pre) >= 3 ? "amber" : "slate"}>Spread {Math.max(...pre) - Math.min(...pre)} pts</Badge>
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="Agreed consensus score" subtitle={`Rubric for Standard ${rubric.n}: ${RUBRIC_SOURCE}. Levels are hierarchical.`}>
              <div className="space-y-1.5">
                {rubric.levels.map((label, v) => (
                  <button
                    key={v}
                    onClick={() => setScore(v)}
                    className={clsx(
                      "flex w-full items-start gap-3 rounded-lg border px-3 py-2 text-left text-[13px] leading-snug transition",
                      current === v ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                    )}
                  >
                    <span className={clsx("tabular grid h-7 w-7 shrink-0 place-items-center rounded-md text-sm font-semibold", scoreClass(v))}>{v}</span>
                    <span className="text-slate-700">{label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
                <p className="text-xs text-slate-600">No agreement? Record the lower score with a note.</p>
                <Button variant="secondary" onClick={() => setScore(disagreementLow, true)}>
                  <ArrowDownToLine size={14} /> Apply lower-score rule
                </Button>
              </div>
              {lower[std] && <p className="mt-2 text-xs text-amber-700">Lower-score rule applied; dissent will be noted in the session record.</p>}
            </Card>

            <Card title="Evidence check" subtitle="Audit documents tagged to this standard">
              {relevantDocs.length === 0 && <p className="text-sm text-slate-500">No documents in the audit are tagged to this standard.</p>}
              <ul className="space-y-2">
                {relevantDocs.map((d) => {
                  const on = ev[std].includes(d.code);
                  return (
                    <li key={d.code}>
                      <label className={clsx("flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 text-sm", on ? "border-emerald-300 bg-emerald-50/60" : "border-slate-200 hover:bg-slate-50")}>
                        <input type="checkbox" checked={on} onChange={() => toggleDoc(d.code)} className="mt-0.5 accent-emerald-600" />
                        <span>
                          <span className="font-mono text-xs text-slate-500">{d.code}</span>
                          <span className="block text-slate-700">{d.type}</span>
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-4">
                {current === null ? (
                  <p className="text-xs text-slate-400">Select a consensus score to run the evidence check.</p>
                ) : unverified ? (
                  <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
                    <AlertTriangle size={15} className="shrink-0" />
                    <span>
                      <b>Unverified.</b> A score of {current} needs at least one supporting document. It will be flagged in all reports and probed in the KIIs.
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs text-emerald-900">
                    {ev[std].length ? <FileCheck2 size={15} className="shrink-0" /> : <CheckCircle2 size={15} className="shrink-0" />}
                    <span>{ev[std].length ? `Verified by ${ev[std].length} document(s).` : "Scores below 3 do not require documentary evidence."}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
