import { PageHeader, SampleDataNotice } from "@/components/ui";
import { CASES, STANDARDS, caseDocuments } from "@/lib/data";
import { ScoringSession } from "./scoring-session";

export default function ScoringPage() {
  const cases = CASES.map((c) => ({
    id: c.id,
    code: c.code,
    short: c.short,
    programs: c.programs.map(({ id, name, consensus, verified, prescores }) => ({ id, name, consensus, verified, prescores })),
    docs: caseDocuments(c)
      .filter((d) => d.available)
      .map((d) => ({ code: d.code, type: d.type, standards: d.standards })),
  }));
  return (
    <>
      <PageHeader
        eyebrow="SO1-A · Appendix B"
        title="Moderated consensus session"
        description="Modified nominal group technique: show the anonymized pre-score spread, discuss evidence, agree one score per standard, then check it against the document audit."
      />
      <SampleDataNotice />
      <ScoringSession cases={cases} standards={STANDARDS.map(({ n, name }) => ({ n, name }))} />
    </>
  );
}
