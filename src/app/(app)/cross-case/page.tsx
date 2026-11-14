import clsx from "clsx";
import { Badge, Card, PageHeader, SampleDataNotice, Table, Td, Th, scoreClass } from "@/components/ui";
import { CASES, STANDARDS, PROPOSITIONS, caseIMI, caseFactors, jointDisplay, surveyData } from "@/lib/data";
import { imiBand } from "@/lib/stats";

const ARCHETYPES = [
  { name: "Systemically embedded", desc: "All three pillars aligned; CDIO survives leadership change.", tone: "emerald" },
  { name: "Champion-led", desc: "Strong normative support from champions; weaker regulative anchoring.", tone: "brand" },
  { name: "Compliance-driven", desc: "Regulative pressure dominates; high scores with weak enacted practice.", tone: "amber" },
  { name: "Stalled", desc: "Progress stopped or reversed after early adoption.", tone: "rose" },
];

const CLS_STYLE: Record<string, string> = {
  Convergent: "bg-emerald-500",
  Complementary: "bg-sky-400",
  Discordant: "bg-rose-500",
};

export default function CrossCasePage() {
  const ordered = [...CASES].sort((a, b) => caseIMI(b) - caseIMI(a));
  const survey = surveyData();
  const joint = jointDisplay();
  const discordant = joint.flatMap((j) => j.cells.filter((c) => c.cls === "Discordant").map((c) => ({ ...c, short: j.short })));

  return (
    <>
      <PageHeader
        eyebrow="SO2 · Cross-case synthesis"
        title="Comparative cross-case synthesis"
        description="Case-ordered meta-matrices, joint display of rubric, survey and qualitative evidence, pattern matching on propositions P1–P3, and typology building."
      />
      <SampleDataNotice />

      <Card title="Case-ordered meta-matrix" subtitle="Cases sorted by IMI, high to low (Miles et al., 2020)" bodyClass="p-0">
        <Table>
          <thead>
            <tr>
              <Th>Case</Th>
              <Th className="text-center">IMI</Th>
              <Th>Entry mode</Th>
              <Th className="text-center">Leadership changes</Th>
              <Th>Resources</Th>
              <Th>Dominant pillar</Th>
              <Th className="text-center">% enacted</Th>
              <Th className="text-center">FCIS enacted practice</Th>
              <Th>Main barrier</Th>
            </tr>
          </thead>
          <tbody>
            {ordered.map((c) => {
              const v = caseIMI(c);
              const s = survey.find((x) => x.caseId === c.id)!;
              const barrier = caseFactors(c).find((f) => f.type === "Barrier")!;
              return (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <Td className="font-medium text-slate-800">
                    {c.code} · {c.short}
                  </Td>
                  <Td className="text-center">
                    <Badge tone={imiBand(v).tone}>{v.toFixed(1)}</Badge>
                  </Td>
                  <Td>{c.entryMode}</Td>
                  <Td className="tabular text-center">{c.leadershipChanges}</Td>
                  <Td>{c.resourceLevel}</Td>
                  <Td>{c.dominantPillar}</Td>
                  <Td className="tabular text-center">{Math.round(c.enactedShare * 100)}%</Td>
                  <Td className="tabular text-center">{s.subscales[7].mean.toFixed(2)}</Td>
                  <Td className="text-slate-600">{barrier.name}</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card
          title="Joint display"
          subtitle="Each cell compares the rubric score with the faculty survey and interview evidence for that standard"
          className="xl:col-span-2"
          bodyClass="p-0"
        >
          <Table>
            <thead>
              <tr>
                <Th>Case</Th>
                {STANDARDS.map((s) => (
                  <Th key={s.n} className="text-center">S{s.n}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {joint.map((j) => (
                <tr key={j.caseId}>
                  <Td className="font-medium text-slate-800">{j.short}</Td>
                  {j.cells.map((cell) => (
                    <Td key={cell.standard} className="px-1.5 text-center">
                      <div
                        title={`${cell.cls}: rubric ${cell.score}, faculty ${cell.faculty.toFixed(2)}`}
                        className={clsx("tabular relative mx-auto grid h-9 w-9 place-items-center rounded-md text-xs font-semibold", scoreClass(cell.score))}
                      >
                        {cell.score}
                        <span className={clsx("absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full ring-2 ring-white", CLS_STYLE[cell.cls])} />
                      </div>
                    </Td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="flex flex-wrap gap-5 border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
            {Object.entries(CLS_STYLE).map(([k, c]) => (
              <span key={k} className="flex items-center gap-1.5">
                <span className={clsx("h-2.5 w-2.5 rounded-full", c)} /> {k}
              </span>
            ))}
            <span className="ml-auto">Number = college median rubric score</span>
          </div>
        </Card>

        <Card title="Signals of symbolic adoption" subtitle={`${discordant.length} discordant cells: high score, weak faculty evidence`}>
          <ul className="max-h-[360px] space-y-2 overflow-y-auto pr-1">
            {discordant.map((d, i) => (
              <li key={i} className="flex items-center justify-between rounded-lg border border-rose-100 bg-rose-50/50 px-3 py-2 text-sm">
                <span className="text-slate-700">
                  <b>{d.short}</b> · S{d.standard} {STANDARDS[d.standard - 1].short}
                </span>
                <span className="tabular text-xs text-slate-500">
                  rubric {d.score} · faculty {d.faculty.toFixed(1)}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Pattern matching on working propositions" subtitle="Each proposition paired with its rival explanation (Yin, 2018)" className="mt-6">
        <div className="space-y-4">
          {PROPOSITIONS.map((p) => (
            <div key={p.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <p className="max-w-4xl text-sm text-slate-800">
                  <span className="mr-2 rounded bg-ink-900 px-1.5 py-0.5 text-[11px] font-bold text-white">{p.id}</span>
                  {p.text}
                </p>
                <Badge tone={p.verdict === "Supported" ? "emerald" : p.verdict === "Partly supported" ? "amber" : "slate"}>{p.verdict}</Badge>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                <b className="text-slate-600">Rival:</b> {p.rival}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                <b className="text-slate-600">Evidence:</b> {p.evidence}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Adoption typology" subtitle="Working labels, revised to fit the data" className="mt-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ARCHETYPES.map((a) => {
            const members = CASES.filter((c) => c.archetype === a.name);
            return (
              <div key={a.name} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                <Badge tone={a.tone}>{a.name}</Badge>
                <p className="mt-2 text-xs text-slate-500">{a.desc}</p>
                <div className="mt-4 space-y-2">
                  {members.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
                      <span className="font-medium text-slate-800">
                        {c.code} · {c.short}
                      </span>
                      <span className="tabular text-xs text-slate-500">{caseIMI(c).toFixed(0)}</span>
                    </div>
                  ))}
                  {members.length === 0 && <p className="text-xs italic text-slate-400">No case assigned</p>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}
