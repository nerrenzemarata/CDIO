import { Badge, Card, Table, Td, Th } from "@/components/ui";
import type { caseDocuments } from "@/lib/data";

export function DocumentTable({ docs }: { docs: ReturnType<typeof caseDocuments> }) {
  return (
    <Card title="Document audit protocol (Appendix C)" subtitle="Documents count as evidence of formal adoption; interviews and FGDs as evidence of enacted practice" bodyClass="p-0">
      <Table>
        <thead>
          <tr>
            <Th>#</Th>
            <Th>Document type</Th>
            <Th>Available</Th>
            <Th>Period</Th>
            <Th>Audit code</Th>
            <Th>Standards</Th>
            <Th>Pillar</Th>
            <Th>Evidence of</Th>
          </tr>
        </thead>
        <tbody>
          {docs.map((d) => (
            <tr key={d.no} className="hover:bg-slate-50/60">
              <Td className="tabular text-slate-400">{d.no}</Td>
              <Td className="font-medium text-slate-800">{d.type}</Td>
              <Td>{d.available ? <Badge tone="emerald">Yes</Badge> : <Badge tone="rose">Missing</Badge>}</Td>
              <Td className="tabular">{d.period}</Td>
              <Td className="font-mono text-xs">{d.code}</Td>
              <Td className="tabular">{d.standards.join(", ")}</Td>
              <Td>
                <Badge>{d.pillar}</Badge>
              </Td>
              <Td>{d.practice === "—" ? "—" : <Badge tone={d.practice === "Shows practice" ? "teal" : "slate"}>{d.practice}</Badge>}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
