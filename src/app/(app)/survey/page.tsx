import { Copy, ExternalLink } from "lucide-react";
import clsx from "clsx";
import { Badge, Button, Card, PageHeader, Progress, SampleDataNotice, Stat, Table, Td, Th } from "@/components/ui";
import { SubscaleBars } from "@/components/charts";
import { SUBSCALES, surveyData } from "@/lib/data";
import { likertBand } from "@/lib/stats";

export default function SurveyPage() {
  const data = surveyData();
  const total = data.reduce((a, d) => a + d.responses, 0);
  const eligible = data.reduce((a, d) => a + d.eligible, 0);
  const chart = SUBSCALES.map((s, i) => {
    const row: Record<string, string | number> = { label: s.label };
    data.forEach((d) => (row[d.short] = d.subscales[i].mean));
    return row;
  });
  const minAlpha = Math.min(...data.flatMap((d) => d.subscales.map((s) => s.alpha)));

  return (
    <>
      <PageHeader
        eyebrow="SO1-D · Appendix G"
        title="Faculty CDIO Institutionalization Survey"
        description="Census of all faculty in the embedded programs. 50 five-point items in six sections plus three open-ended questions. Responses are anonymous."
        actions={
          <>
            <Button variant="secondary">
              <Copy size={15} /> Copy survey links
            </Button>
            <Button href="/s/demo">
              <ExternalLink size={15} /> Preview form
            </Button>
          </>
        }
      />
      <SampleDataNotice />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat label="Responses" value={total} hint={`of ${eligible} eligible faculty`} />
        <Stat label="Overall response rate" value={`${Math.round((total / eligible) * 100)}%`} hint="Target ≥ 60% per case" />
        <Stat label="Excluded after screening" value="7" hint="> 20% missing items (3 flagged straight-lining)" />
        <Stat label="Lowest subscale reliability" value={minAlpha.toFixed(2)} hint={minAlpha >= 0.7 ? "All subscales α ≥ 0.70" : "Some subscales below 0.70"} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card title="Response rate by case" className="xl:col-span-1">
          <ul className="space-y-4">
            {data.map((d) => (
              <li key={d.caseId}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {d.code} · {d.short}
                  </span>
                  <span className="tabular text-slate-500">
                    {d.responses}/{d.eligible} · <b className={d.rate >= 0.6 ? "text-emerald-600" : "text-amber-600"}>{Math.round(d.rate * 100)}%</b>
                  </span>
                </div>
                <div className="relative mt-1.5">
                  <Progress value={d.rate * 100} tone={d.rate >= 0.6 ? "emerald" : "amber"} />
                  <span className="absolute top-[-3px] h-3 w-px bg-slate-500" style={{ left: "60%" }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-slate-400">Marker shows the 60% target.</p>
        </Card>
        <Card title="Subscale means by case" subtitle="1 = strongly disagree … 5 = strongly agree; complexity items reverse-coded" className="xl:col-span-2">
          <SubscaleBars data={chart} keys={data.map((d) => d.short)} />
        </Card>
      </div>

      <Card title="Subscale profiles" subtitle="Mean with verbal interpretation · Cronbach's α in grey" className="mt-6" bodyClass="p-0">
        <Table>
          <thead>
            <tr>
              <Th>Subscale</Th>
              <Th className="text-center">Items</Th>
              {data.map((d) => (
                <Th key={d.caseId} className="text-center">{d.short}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SUBSCALES.map((s, i) => (
              <tr key={s.key}>
                <Td className="font-medium text-slate-800">{s.label}</Td>
                <Td className="tabular text-center text-slate-500">{s.items}</Td>
                {data.map((d) => {
                  const v = d.subscales[i];
                  const band = likertBand(v.mean);
                  return (
                    <Td key={d.caseId} className="text-center">
                      <div className="tabular font-semibold text-slate-900">{v.mean.toFixed(2)}</div>
                      <div className="mt-0.5 flex items-center justify-center gap-1.5">
                        <Badge tone={band.startsWith("Very high") || band === "High" ? "emerald" : band === "Moderate" ? "amber" : "rose"}>{band}</Badge>
                        <span className={clsx("tabular text-[11px]", v.alpha < 0.7 ? "text-rose-600" : "text-slate-400")}>α {v.alpha.toFixed(2)}</span>
                      </div>
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card title="Between-case comparison" subtitle="Kruskal–Wallis H with ε², Dunn post hoc (Bonferroni)">
          <Table>
            <thead>
              <tr>
                <Th>Subscale</Th>
                <Th className="text-center">H</Th>
                <Th className="text-center">p</Th>
                <Th className="text-center">ε²</Th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Regulative support", 21.4, "< .001", 0.06],
                ["Normative support", 14.2, ".007", 0.04],
                ["Cultural-cognitive support", 18.9, ".001", 0.05],
                ["Resources & structures", 26.3, "< .001", 0.08],
                ["Enacted practice", 12.1, ".017", 0.03],
              ].map(([n, h, p, e]) => (
                <tr key={n as string}>
                  <Td>{n}</Td>
                  <Td className="tabular text-center">{(h as number).toFixed(1)}</Td>
                  <Td className="tabular text-center">{p}</Td>
                  <Td className="tabular text-center">{(e as number).toFixed(2)}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
        <Card title="Pillar support vs. enacted practice" subtitle="Spearman's ρ, all respondents">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Regulative", 0.31],
              ["Normative", 0.48],
              ["Cultural-cognitive", 0.57],
            ].map(([p, r]) => (
              <div key={p as string} className="rounded-lg border border-slate-200 p-4 text-center">
                <p className="text-xs text-slate-500">{p}</p>
                <p className="tabular mt-1 text-2xl font-semibold text-slate-900">{(r as number).toFixed(2)}</p>
                <p className="text-[11px] text-slate-400">p &lt; .001</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500">Sample output layout. Survey results describe faculty within the cases and are not generalized beyond the five universities.</p>
        </Card>
      </div>
    </>
  );
}
