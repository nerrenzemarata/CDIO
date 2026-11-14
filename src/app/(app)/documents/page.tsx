import Link from "next/link";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { Button, Card, PageHeader, SampleDataNotice, Table, Td, Th } from "@/components/ui";
import { DocumentTable } from "@/components/document-table";
import { CASES, DOC_TYPES, caseDocuments } from "@/lib/data";

export default async function DocumentsPage({ searchParams }: { searchParams: Promise<{ case?: string }> }) {
  const { case: sel = "a" } = await searchParams;
  const c = CASES.find((x) => x.id === sel) ?? CASES[0];
  const all = CASES.map((x) => ({ c: x, docs: caseDocuments(x) }));
  return (
    <>
      <PageHeader
        eyebrow="SO1-A · Appendix C"
        title="Document audit"
        description="Evidence file built 2–3 weeks before each site visit. Each document is logged with its date, issuing body, related standards and pillar."
        actions={
          <Button>
            <Upload size={15} /> Upload document
          </Button>
        }
      />
      <SampleDataNotice />

      <Card title="Availability matrix" subtitle="16 document types × 5 cases" bodyClass="p-0" className="mb-6">
        <Table>
          <thead>
            <tr>
              <Th>Document type</Th>
              {CASES.map((x) => (
                <Th key={x.id} className="text-center">{x.short}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DOC_TYPES.map((t, i) => (
              <tr key={t}>
                <Td className="text-slate-700">{t}</Td>
                {all.map(({ c: x, docs }) => {
                  const d = docs[i];
                  return (
                    <Td key={x.id} className="text-center">
                      <span
                        title={d.available ? d.practice : "Missing"}
                        className={clsx(
                          "inline-block h-3 w-3 rounded-full",
                          !d.available ? "bg-rose-300" : d.practice === "Shows practice" ? "bg-emerald-500" : "bg-slate-300",
                        )}
                      />
                    </Td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="flex gap-5 border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Shows practice</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" /> Formal only</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-300" /> Missing</span>
        </div>
      </Card>

      <div className="mb-4 flex flex-wrap gap-2">
        {CASES.map((x) => (
          <Link
            key={x.id}
            href={`?case=${x.id}`}
            className={clsx("rounded-full px-3 py-1.5 text-xs font-medium ring-1", x.id === c.id ? "bg-ink-900 text-white ring-ink-900" : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50")}
          >
            Case {x.code} · {x.short}
          </Link>
        ))}
      </div>
      <DocumentTable docs={caseDocuments(c)} />
    </>
  );
}
