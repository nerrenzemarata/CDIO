import { Mail } from "lucide-react";
import { Badge, Button, Card, PageHeader, SampleDataNotice, Stat, Table, Td, Th } from "@/components/ui";
import { delphi } from "@/lib/data";
import { kappaBand } from "@/lib/stats";

export default function DelphiPage() {
  const d = delphi();
  const [r1, r2] = d.rounds;
  const scvi = (r: typeof r1) => r.reduce((a, x) => a + x.cvi, 0) / r.length;
  const failing = r2.filter((x) => x.cvi < 0.78).length;
  const critFail = d.criteria.filter((c) => c.agree < 0.8 || c.iqr > 1).length;

  return (
    <>
      <PageHeader
        eyebrow="SO4 · Expert validation"
        title="e-Delphi validation"
        description="Two-round e-Delphi with 7–10 external experts, followed by a practitioner feasibility check with the CDIO focal person and one program chair per case."
        actions={
          <Button variant="secondary">
            <Mail size={15} /> Send round reminder
          </Button>
        }
      />
      <SampleDataNotice />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Stat label="Panel" value={`${d.experts} / ${d.invited}`} hint="Completed both rounds / invited" />
        <Stat label="S-CVI/Ave · Round 2" value={scvi(r2).toFixed(2)} hint={<Badge tone={scvi(r2) >= 0.9 ? "emerald" : "amber"}>{scvi(r2) >= 0.9 ? "Meets ≥ 0.90" : "Below 0.90"}</Badge>} />
        <Stat label="Components below I-CVI 0.78" value={failing} hint="Revise once more or remove" />
        <Stat label="Whole-framework criteria failing" value={critFail} hint="< 80% rate 4–5, or IQR > 1" />
      </div>

      <Card title="Component content validity" subtitle="4-point relevance scale; I-CVI = experts rating 3 or 4 / N; modified kappa adjusts for chance" className="mt-6" bodyClass="p-0">
        <Table>
          <thead>
            <tr>
              <Th>Component</Th>
              <Th className="text-center">R1 I-CVI</Th>
              <Th className="text-center">R2 I-CVI</Th>
              <Th className="text-center">R2 k*</Th>
              <Th>k* rating</Th>
              <Th>Decision</Th>
            </tr>
          </thead>
          <tbody>
            {r2.map((x, i) => {
              const pass = x.cvi >= 0.78 && x.kstar >= 0.74;
              return (
                <tr key={x.id} className="hover:bg-slate-50/60">
                  <Td className="font-medium text-slate-800">
                    {x.id} · {x.name}
                  </Td>
                  <Td className="tabular text-center text-slate-500">{r1[i].cvi.toFixed(2)}</Td>
                  <Td className="tabular text-center font-semibold">{x.cvi.toFixed(2)}</Td>
                  <Td className="tabular text-center">{x.kstar.toFixed(2)}</Td>
                  <Td>{kappaBand(x.kstar)}</Td>
                  <Td>{pass ? <Badge tone="emerald">Retain</Badge> : <Badge tone="amber">Revise / remove</Badge>}</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Card title="Whole-framework criteria (Round 2)" subtitle="5-point scale · consensus = ≥ 80% rate 4–5 and IQR ≤ 1" className="mt-6" bodyClass="p-0">
        <Table>
          <thead>
            <tr>
              <Th>#</Th>
              <Th>Item</Th>
              <Th>Criterion</Th>
              <Th className="text-center">Median</Th>
              <Th className="text-center">IQR</Th>
              <Th>% rating 4–5</Th>
              <Th>Consensus</Th>
            </tr>
          </thead>
          <tbody>
            {d.criteria.map((c) => {
              const ok = c.agree >= 0.8 && c.iqr <= 1;
              return (
                <tr key={c.id}>
                  <Td className="font-mono text-xs text-slate-500">{c.id}</Td>
                  <Td className="text-slate-800">{c.text}</Td>
                  <Td className="text-slate-500">{c.criterion}</Td>
                  <Td className="tabular text-center">{c.median}</Td>
                  <Td className="tabular text-center">{c.iqr}</Td>
                  <Td className="w-56">
                    <div className="flex items-center gap-2">
                      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div className={ok ? "h-full bg-emerald-500" : "h-full bg-amber-500"} style={{ width: `${c.agree * 100}%` }} />
                      </div>
                      <span className="tabular w-10 text-right text-xs">{Math.round(c.agree * 100)}%</span>
                    </div>
                  </Td>
                  <Td>{ok ? <Badge tone="emerald">Reached</Badge> : <Badge tone="amber">Not reached</Badge>}</Td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>

      <Card title="Stability between rounds" className="mt-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Experts changing rating</p>
            <p className="tabular mt-1 text-2xl font-semibold">11%</p>
            <Badge tone="emerald">Stable (&lt; 15%)</Badge>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Wilcoxon signed-rank</p>
            <p className="tabular mt-1 text-2xl font-semibold">p = .21</p>
            <Badge tone="emerald">No significant shift</Badge>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Third round needed?</p>
            <p className="mt-1 text-2xl font-semibold">{(failing + critFail) / (r2.length + d.criteria.length) > 0.2 ? "Yes" : "No"}</p>
            <span className="text-xs text-slate-500">Triggered when &gt; 20% of items fail</span>
          </div>
        </div>
      </Card>
    </>
  );
}
