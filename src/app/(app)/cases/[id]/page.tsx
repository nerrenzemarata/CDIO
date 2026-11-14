import Link from "next/link";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { AlertTriangle, CheckCircle2, ChevronLeft, Circle, FileDown } from "lucide-react";
import { Badge, Button, Card, PageHeader, Stat, Table, Td, Th, scoreClass, Progress, SampleDataNotice } from "@/components/ui";
import { MaturityRadar } from "@/components/charts";
import { DocumentTable } from "@/components/document-table";
import {
  CASES,
  STANDARDS,
  ROGERS_STAGES,
  getCase,
  caseIMI,
  caseClusters,
  caseStandardMedians,
  programAlpha,
  caseDocuments,
  caseTimeline,
  caseFactors,
} from "@/lib/data";
import { imiBand, alphaBand, iqr, median } from "@/lib/stats";
import { rubricFor } from "@/lib/rubric";

export function generateStaticParams() {
  return CASES.map((c) => ({ id: c.id }));
}

const TABS = [
  { key: "maturity", label: "Maturity profile" },
  { key: "pathway", label: "Adoption pathway" },
  { key: "factors", label: "Barriers & enablers" },
  { key: "documents", label: "Document audit" },
];

export default async function CaseDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ tab?: string }> }) {
  const { id } = await params;
  const { tab = "maturity" } = await searchParams;
  const c = getCase(id);
  if (!c) notFound();
  const v = caseIMI(c);
  const band = imiBand(v);

  return (
    <>
      <Link href="/cases" className="mb-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800">
        <ChevronLeft size={14} /> All cases
      </Link>
      <PageHeader
        eyebrow={`Case ${c.code} · ${c.island}`}
        title={c.university}
        description={`Entered CDIO in ${c.entryYear} (${c.entryMode.toLowerCase()}). ${c.collegeSize}. ${c.multiCampus ? "Multi-campus governance." : "Single campus."} ${c.leadershipChanges} leadership change(s) since entry.`}
        actions={
          <>
            {c.insider && <Badge tone="violet">Researcher insider · external facilitator</Badge>}
            <Button variant="secondary">
              <FileDown size={15} /> Case report (PDF)
            </Button>
          </>
        }
      />
      <SampleDataNotice />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat label="Institutional Maturity Index" value={v.toFixed(1)} hint={<Badge tone={band.tone}>{band.label}</Badge>} />
        <Stat label="Embedded programs" value={c.programs.length} hint={c.programs.map((p) => p.name.replace("BS ", "")).join(" · ")} />
        <Stat label="Enacted strategies" value={`${Math.round(c.enactedShare * 100)}%`} hint="Share described as practice by several informants" />
        <Stat label="Working archetype" value={<span className="text-lg">{c.archetype}</span>} hint={`Dominant pillar: ${c.dominantPillar}`} />
      </div>

      <div className="mt-6 flex gap-1 border-b border-slate-200">
        {TABS.map((t) => (
          <Link
            key={t.key}
            href={`?tab=${t.key}`}
            className={clsx(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-medium",
              tab === t.key ? "border-brand-600 text-brand-700" : "border-transparent text-slate-500 hover:text-slate-800",
            )}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-6">
        {tab === "maturity" && <MaturityTab id={c.id} />}
        {tab === "pathway" && <PathwayTab id={c.id} />}
        {tab === "factors" && <FactorsTab id={c.id} />}
        {tab === "documents" && <DocumentsTab id={c.id} />}
      </div>
    </>
  );
}

function MaturityTab({ id }: { id: string }) {
  const c = getCase(id)!;
  const med = caseStandardMedians(c);
  const clusters = caseClusters(c);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-5">
        <Card title="Radar profile by program" subtitle="Evidence-checked consensus scores (0–5)" className="xl:col-span-3">
          <MaturityRadar axes={STANDARDS.map((s) => s.short)} series={c.programs.map((p) => ({ name: p.name.replace("BS ", ""), values: p.consensus }))} height={360} />
        </Card>
        <Card title="Cluster indices" subtitle="IMI computed over each standard cluster" className="xl:col-span-2">
          <ul className="space-y-4">
            {clusters.map((k) => (
              <li key={k.key}>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700">
                    {k.label} <span className="text-xs text-slate-400">(Std {k.standards.join(", ")})</span>
                  </span>
                  <span className="tabular font-medium text-slate-900">{k.value.toFixed(0)}</span>
                </div>
                <div className="mt-1.5">
                  <Progress value={k.value} tone={k.value > 60 ? "emerald" : k.value > 40 ? "amber" : "rose"} />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Consensus scores per standard" subtitle="⚠ marks a score of 3 or more with no supporting audit document (unverified); it will be probed in the KIIs." bodyClass="p-0">
        <Table>
          <thead>
            <tr>
              <Th>Std</Th>
              <Th>Standard</Th>
              {c.programs.map((p) => (
                <Th key={p.id} className="text-center">{p.name.replace("BS ", "")}</Th>
              ))}
              <Th className="text-center">College median</Th>
              <Th className="text-center">Range</Th>
            </tr>
          </thead>
          <tbody>
            {STANDARDS.map((s, i) => {
              const vals = c.programs.map((p) => p.consensus[i]);
              return (
                <tr key={s.n} className="hover:bg-slate-50/60">
                  <Td className="tabular font-medium text-slate-500">{s.n}</Td>
                  <Td className="font-medium text-slate-800">{s.name}</Td>
                  {c.programs.map((p) => (
                    <Td key={p.id} className="text-center">
                      <span title={`Level ${p.consensus[i]}: ${rubricFor(s.n).levels[p.consensus[i]]}${p.verified[i] ? "" : " (unverified)"}`} className={clsx("tabular inline-flex h-7 min-w-9 cursor-help items-center justify-center gap-1 rounded-md px-2 text-sm font-semibold", scoreClass(p.consensus[i]))}>
                        {p.consensus[i]}
                        {!p.verified[i] && <AlertTriangle size={12} className="text-amber-600" />}
                      </span>
                    </Td>
                  ))}
                  <Td className="tabular text-center font-semibold">{med[i]}</Td>
                  <Td className="tabular text-center text-slate-500">
                    {Math.min(...vals)}–{Math.max(...vals)}
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Card title="Rater agreement before consensus" subtitle="Krippendorff's α (ordinal) on individual pre-scores; reported descriptively (small panels)" bodyClass="p-0">
        <Table>
          <thead>
            <tr>
              <Th>Program</Th>
              <Th className="text-center">Panel size</Th>
              <Th className="text-center">α</Th>
              <Th>Interpretation</Th>
              <Th className="text-center">Median IQR across standards</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {c.programs.map((p) => {
              const a = programAlpha(p);
              const iqrs = STANDARDS.map((_, s) => iqr(p.prescores.map((r) => r[s])));
              return (
                <tr key={p.id}>
                  <Td className="font-medium text-slate-800">{p.name}</Td>
                  <Td className="tabular text-center">{p.prescores.length}</Td>
                  <Td className="tabular text-center font-semibold">{a.toFixed(3)}</Td>
                  <Td>
                    <Badge tone={a >= 0.8 ? "emerald" : a >= 0.667 ? "amber" : "rose"}>{alphaBand(a)}</Badge>
                  </Td>
                  <Td className="tabular text-center">{median(iqrs).toFixed(2)}</Td>
                  <Td>
                    <Badge tone={p.status === "Consensus done" ? "emerald" : "amber"}>{p.status}</Badge>
                  </Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}

const KIND_TONE: Record<string, string> = { Decision: "brand", Training: "teal", Funding: "emerald", Setback: "rose", "Turning point": "violet" };

function PathwayTab({ id }: { id: string }) {
  const c = getCase(id)!;
  const events = caseTimeline(c);
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <Card title="Master timeline" subtitle="Informant timelines merged with dated documents; periods bracketed by Rogers stage" className="xl:col-span-2">
        <ol className="relative ml-3 border-l border-slate-200">
          {events.map((e, i) => (
            <li key={i} className="mb-6 ml-6 last:mb-0">
              <span className="absolute -left-[7px] mt-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-600 ring-1 ring-brand-200" />
              <div className="flex flex-wrap items-center gap-2">
                <span className="tabular text-sm font-semibold text-slate-900">{e.year}</span>
                <Badge tone={KIND_TONE[e.kind]}>{e.kind}</Badge>
                <Badge>{ROGERS_STAGES[e.stage]}</Badge>
                <span className="text-[11px] text-slate-400">{e.pillar} pillar</span>
              </div>
              <p className="mt-1 text-sm text-slate-700">{e.title}</p>
            </li>
          ))}
        </ol>
      </Card>
      <div className="space-y-6">
        <Card title="Entry-mode classification">
          <p className="text-2xl font-semibold text-slate-900">{c.entryMode}</p>
          <p className="mt-2 text-xs text-slate-500">Based on who initiated CDIO, the first resource commitment, and the first formal document.</p>
        </Card>
        <Card title="Rogers stage reached">
          <ol className="space-y-2">
            {ROGERS_STAGES.map((s, i) => {
              const reached = Math.max(...events.map((e) => e.stage));
              return (
                <li key={s} className="flex items-center gap-2 text-sm">
                  {i <= reached ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-300" />}
                  <span className={i <= reached ? "text-slate-800" : "text-slate-400"}>{s}</span>
                </li>
              );
            })}
          </ol>
        </Card>
        <Card title="Strategy-by-pillar" subtitle="Formal (documents only) vs. enacted (practice)">
          {(["Regulative", "Normative", "Cultural-cognitive"] as const).map((p, i) => {
            const enacted = [c.enactedShare + 0.05, c.enactedShare - 0.05, c.enactedShare - 0.15][i];
            return (
              <div key={p} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">{p}</span>
                  <span className="tabular text-slate-500">{Math.round(Math.max(0, enacted) * 100)}% enacted</span>
                </div>
                <div className="mt-1 flex h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="bg-emerald-500" style={{ width: `${Math.max(0, enacted) * 100}%` }} />
                  <div className="bg-slate-300" style={{ width: `${(1 - Math.max(0, enacted)) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}

function FactorsTab({ id }: { id: string }) {
  const c = getCase(id)!;
  const factors = caseFactors(c);
  return (
    <Card title="Classified barrier–enabler inventory" subtitle="Framework Method coding; strength from prevalence (share of informants) and salience (prompt-card top three)" bodyClass="p-0">
      <Table>
        <thead>
          <tr>
            <Th>Factor</Th>
            <Th>Category</Th>
            <Th>Type</Th>
            <Th>Prevalence</Th>
            <Th>Strength</Th>
            <Th>Rogers attribute</Th>
            <Th>Scott pillar</Th>
          </tr>
        </thead>
        <tbody>
          {factors.map((f) => (
            <tr key={f.name} className="hover:bg-slate-50/60">
              <Td className="font-medium text-slate-800">{f.name}</Td>
              <Td>{f.category}</Td>
              <Td>
                <Badge tone={f.type === "Barrier" ? "rose" : "emerald"}>{f.type}</Badge>
              </Td>
              <Td className="w-48">
                <div className="flex items-center gap-2">
                  <Progress value={f.prevalence} tone={f.type === "Barrier" ? "rose" : "emerald"} />
                  <span className="tabular w-9 text-right text-xs text-slate-500">{f.prevalence}%</span>
                </div>
              </Td>
              <Td>
                <Badge tone={f.strength === "High" ? "brand" : f.strength === "Moderate" ? "slate" : "slate"}>{f.strength}</Badge>
              </Td>
              <Td className="text-slate-600">{f.attribute}</Td>
              <Td className="text-slate-600">{f.pillar}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}

function DocumentsTab({ id }: { id: string }) {
  const c = getCase(id)!;
  return <DocumentTable docs={caseDocuments(c)} />;
}

