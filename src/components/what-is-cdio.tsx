import Link from "next/link";
import { ArrowRight, ExternalLink, Gauge, Lightbulb, PencilRuler, RefreshCw, Target, Wrench } from "lucide-react";

export const CDIO_URL = "https://www.cdio.org";

// Stage wording follows the Standard 1 description in the CDIO Standards v2.0 document.
const STAGES = [
  {
    letter: "C",
    name: "Conceive",
    icon: Lightbulb,
    text: "Define customer needs; consider technology, enterprise strategy and regulations; develop conceptual, technical and business plans.",
  },
  {
    letter: "D",
    name: "Design",
    icon: PencilRuler,
    text: "Create the design: the plans, drawings and algorithms that describe what will be implemented.",
  },
  {
    letter: "I",
    name: "Implement",
    icon: Wrench,
    text: "Transform the design into the product, process or system, including manufacturing, coding, testing and validation.",
  },
  {
    letter: "O",
    name: "Operate",
    icon: Gauge,
    text: "Use the implemented product or process to deliver the intended value, including maintaining, evolving and retiring the system.",
  },
];

const GOALS = [
  "Master a deep working knowledge of technical fundamentals",
  "Lead in the creation and operation of new products and systems",
  "Understand the importance and strategic impact of research and technological development on society",
];

const GROUPS = [
  { label: "Program philosophy", stds: "1" },
  { label: "Curriculum development", stds: "2–4" },
  { label: "Design-implement & workspaces", stds: "5–6" },
  { label: "Teaching & learning methods", stds: "7–8" },
  { label: "Faculty development", stds: "9–10" },
  { label: "Assessment & evaluation", stds: "11–12" },
];

export function WhatIsCDIO() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(11,17,18,0.06)]">

      <div className="grid xl:grid-cols-[1fr_340px]">
        <div className="p-6">
          <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-700">
            <span className="h-2 w-2 rotate-45 bg-safety-500" /> Background
          </p>
          <h2 className="mt-1.5 text-xl font-semibold text-ink-950">What is CDIO?</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            <b className="text-ink-950">CDIO (Conceive – Design – Implement – Operate)</b> is an international initiative to reform undergraduate engineering
            education, launched in October 2000. It gives students an education that stresses engineering fundamentals set in the context of conceiving,
            designing, implementing and operating real-world systems, processes and products. Programs adopt its <b className="text-ink-950">12 CDIO Standards</b> to
            guide reform and evaluate their progress.
          </p>

          {/* lifecycle */}
          <div className="relative mt-6">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {STAGES.map((s, i) => (
                <li key={s.name} className="relative">
                  <div className="h-full rounded-lg border border-brand-100 bg-brand-50/50 p-4 text-slate-700">
                    <div className="flex items-center gap-3">
                      <span className="blueprint grid h-11 w-11 shrink-0 place-items-center rounded-lg font-mono text-lg font-semibold text-white ring-2 ring-safety-500/70">
                        {s.letter}
                      </span>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400">Stage 0{i + 1}</p>
                        <p className="flex items-center gap-1.5 font-semibold text-ink-950">
                          <s.icon size={15} className="text-safety-600" /> {s.name}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-[13px] leading-snug text-slate-600">{s.text}</p>
                  </div>
                  {i < STAGES.length - 1 && (
                    <span className="absolute -right-[11px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 place-items-center rounded-full bg-safety-500 text-ink-950 shadow lg:grid">
                      <ArrowRight size={12} strokeWidth={2.5} />
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
              <RefreshCw size={12} className="text-safety-600" /> The product, process and system lifecycle is the context for engineering education
              (Standard 1).
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={CDIO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-safety-500 px-3.5 py-2 text-sm font-semibold text-ink-950 shadow-sm transition-colors hover:bg-safety-400"
            >
              Visit cdio.org <ExternalLink size={14} />
            </a>
            <Link
              href="/rubric"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Read the 12 Standards & rubrics <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <aside className="blueprint border-t border-white/10 p-6 text-slate-200 xl:border-l xl:border-t-0">
          <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-200/80">
            <Target size={13} className="text-safety-400" /> Goals: graduates who can
          </p>
          <ol className="mt-3 space-y-2.5">
            {GOALS.map((g, i) => (
              <li key={g} className="flex gap-3 text-[13px] leading-snug">
                <span className="font-mono text-safety-400">0{i + 1}</span>
                <span>{g}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-200/80">The 12 Standards cover</p>
          <ul className="mt-3 space-y-1.5">
            {GROUPS.map((g) => (
              <li key={g.label} className="flex items-center justify-between gap-3 border-b border-dashed border-white/15 pb-1.5 text-[13px]">
                <span>{g.label}</span>
                <span className="font-mono text-[11px] text-brand-200">STD {g.stds}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10px] text-brand-200/60">Source: CDIO Standards v2.0 (2010) · cdio.org</p>
        </aside>
      </div>
    </section>
  );
}
