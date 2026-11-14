import Link from "next/link";
import { MapPin, Users, ShieldCheck, CalendarDays } from "lucide-react";
import { Badge, PageHeader, Progress, Button, SampleDataNotice } from "@/components/ui";
import { CASES, caseIMI, unverifiedCount } from "@/lib/data";
import { imiBand } from "@/lib/stats";

// Campus photos supplied by the researcher (public/campus/*)
const CAMPUS_IMAGE: Record<string, string> = {
  a: "/campus/bulsu.jpg",
  b: "/campus/batstateu.jpg",
  c: "/campus/ctu.jpg",
  d: "/campus/ustp.jpg",
  e: "/campus/usep.jpg",
};

export default function CasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="SO1 · Within-case baseline"
        title="Cases"
        description="Five CDIO collaborator SUCs selected purposively across Luzon, the Visayas and Mindanao. The unit of analysis is the engineering college; programs are embedded units."
        actions={<Button>+ Add case</Button>}
      />
      <SampleDataNotice />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {CASES.map((c) => {
          const v = caseIMI(c);
          const band = imiBand(v);
          const done = c.fieldwork.filter((f) => f.done).length;
          return (
            <Link
              key={c.id}
              href={`/cases/${c.id}`}
              className="group relative isolate flex min-h-[380px] flex-col overflow-hidden rounded-xl border border-slate-200 p-5 text-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              {/* campus photo background */}
              <div
                aria-hidden
                className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${CAMPUS_IMAGE[c.id]})` }}
              />
              {/* overlay for legibility */}
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-950/55 via-ink-950/75 to-ink-950/95" />

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/15 text-base font-bold ring-1 ring-white/30 backdrop-blur">{c.code}</span>
                  <div className="min-w-0">
                    <p className="font-semibold drop-shadow">{c.short}</p>
                    <p className="line-clamp-1 text-xs text-white/75">{c.university}</p>
                  </div>
                </div>
                {c.insider && <Badge tone="violet">Insider case</Badge>}
              </div>

              <div className="mt-auto pt-10">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-wide text-white/60">IMI</p>
                    <p className="tabular text-3xl font-semibold tracking-tight">{v.toFixed(1)}</p>
                  </div>
                  <Badge tone={band.tone}>{band.label}</Badge>
                </div>
                <div className="mt-2 [&>div]:bg-white/20">
                  <Progress value={v} tone={v > 60 ? "emerald" : v > 40 ? "amber" : "rose"} />
                </div>

                <dl className="mt-5 grid grid-cols-2 gap-y-2 text-xs">
                  <dt className="flex items-center gap-1.5 text-white/60"><MapPin size={13} /> Island group</dt>
                  <dd className="text-right text-white/90">{c.island}</dd>
                  <dt className="flex items-center gap-1.5 text-white/60"><CalendarDays size={13} /> Entry</dt>
                  <dd className="text-right text-white/90">{c.entryYear} · {c.entryMode}</dd>
                  <dt className="flex items-center gap-1.5 text-white/60"><Users size={13} /> Programs</dt>
                  <dd className="text-right text-white/90">{c.programs.length} embedded</dd>
                  <dt className="flex items-center gap-1.5 text-white/60"><ShieldCheck size={13} /> Accreditation</dt>
                  <dd className="text-right text-white/90">{c.accreditation}</dd>
                </dl>

                <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-xs">
                  <span className="text-white/70">
                    Fieldwork {done}/{c.fieldwork.length}
                  </span>
                  {unverifiedCount(c) > 0 ? <Badge tone="amber">{unverifiedCount(c)} unverified</Badge> : <Badge tone="emerald">All verified</Badge>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
