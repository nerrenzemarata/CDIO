"use client";
import { useState } from "react";
import clsx from "clsx";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";

type Item = { id: string; text: string };
type Section = { key: string; title: string; scale: string[]; items: Item[] };

const AGREE = ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"];
const FREQ = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const SECTIONS: Section[] = [
  {
    key: "B",
    title: "Perceived attributes of CDIO",
    scale: AGREE,
    items: [
      "CDIO has improved the skills of our engineering graduates.",
      "CDIO helps our program meet OBE and accreditation requirements.",
      "CDIO makes our curriculum more relevant to industry needs.",
      "CDIO fits the mission and goals of our university.",
      "CDIO is consistent with CHED's outcomes-based education requirements.",
      "CDIO fits the way I prefer to teach.",
      "CDIO is difficult to understand.",
      "Implementing CDIO needs more coordination than our department can manage.",
      "CDIO-based assessment is too complicated to apply in my courses.",
      "I could try CDIO practices in my courses before being required to use them.",
      "Our program piloted CDIO in selected courses before wider use.",
      "I can adopt CDIO practices step by step.",
      "I can see the results of CDIO in student projects.",
      "Results of CDIO are shared with faculty, for example through reports or exhibits.",
      "Improvements from CDIO are visible to people outside the college.",
    ].map((text, i) => ({ id: `B${i + 1}`, text })),
  },
  {
    key: "C",
    title: "Institutional support",
    scale: AGREE,
    items: [
      "Our university has formal policies or resolutions that support CDIO.",
      "CDIO is part of our strategic or development plan.",
      "There is a budget allocation for CDIO activities.",
      "CDIO evidence is used in our quality assurance and accreditation processes.",
      "CDIO implementation in courses is monitored.",
      "My colleagues expect CDIO practices in engineering teaching.",
      "Our leaders show visible commitment to CDIO.",
      "CDIO training or work counts in faculty evaluation or promotion.",
      "Our department has respected CDIO champions.",
      "Belonging to the CDIO community gives our program professional standing.",
      "Designing courses around integrated outcomes is normal in my department.",
      "Faculty would continue CDIO practices even if no one required them.",
      "CDIO terms are used naturally in our meetings and planning.",
      'New faculty quickly learn CDIO as "the way we teach here."',
      "I see CDIO as part of who I am as an engineering educator.",
    ].map((text, i) => ({ id: `C${i + 1}`, text })),
  },
  {
    key: "D",
    title: "Resources and structures",
    scale: AGREE,
    items: [
      "We have workspaces adequate for design-implement activities.",
      "Equipment and materials for student projects arrive on time.",
      "My teaching load leaves time for CDIO course design.",
      "A unit or coordinator actively supports CDIO implementation.",
      "Technical staff support hands-on student projects.",
    ].map((text, i) => ({ id: `D${i + 1}`, text })),
  },
  {
    key: "E",
    title: "Stakeholder engagement",
    scale: AGREE,
    items: [
      "Industry partners help define our program outcomes.",
      "Industry partners provide real projects or problems for students.",
      "Students respond positively to CDIO learning activities.",
      "Alumni and employer feedback is used to improve our program.",
      "Accreditors and CHED evaluators recognize our CDIO practices.",
    ].map((text, i) => ({ id: `E${i + 1}`, text })),
  },
  {
    key: "F",
    title: "Faculty readiness",
    scale: AGREE,
    items: [
      "I have received adequate training on CDIO.",
      "I am confident designing design-implement experiences.",
      "I am confident using active learning methods.",
      "I am confident assessing teamwork, communication and other professional skills.",
      "I have industry or practice experience relevant to my courses.",
    ].map((text, i) => ({ id: `F${i + 1}`, text })),
  },
  {
    key: "G",
    title: "Enacted practice: how often do you do the following?",
    scale: FREQ,
    items: [
      "I use active learning methods in my classes.",
      "My students work on design-implement tasks.",
      "I integrate professional skills into technical lessons.",
      "I assess professional skills using explicit rubrics.",
      "I coordinate the content of my course with other courses in the curriculum.",
    ].map((text, i) => ({ id: `G${i + 1}`, text })),
  },
];

const PROFILE: [string, string[]][] = [
  ["Program", ["BS Civil Engineering", "BS Electrical Engineering", "BS Mechanical Engineering"]],
  ["Academic rank", ["Instructor", "Assistant Professor", "Associate Professor", "Professor"]],
  ["Employment status", ["Permanent", "Temporary/contractual", "Part-time"]],
  ["Years of teaching engineering", ["< 3", "3–5", "6–10", "> 10"]],
  ["Years involved in CDIO", ["< 1", "1–2", "3–5", "> 5"]],
  ["Number of CDIO trainings attended", ["None", "1", "2–3", "4 or more"]],
];
const OPEN = [
  "What has most helped CDIO succeed in your program?",
  "What is the biggest barrier to CDIO in your program?",
  "What one change would most strengthen CDIO in your program?",
];
const STEPS = ["A", ...SECTIONS.map((s) => s.key), "H"];
const MISSING_LIMIT = 0.2; // responses with > 20% missing items are excluded from analysis

export function SurveyForm() {
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [profile, setProfile] = useState<Record<string, string>>({});
  const [openEnded, setOpenEnded] = useState<string[]>(["", "", ""]);
  const [reviewing, setReviewing] = useState(false);
  const [done, setDone] = useState(false);

  const totalItems = SECTIONS.reduce((a, s) => a + s.items.length, 0);
  const answered = Object.keys(answers).length;

  // unanswered count per step (A = profile, B–G = rating items, H = optional open-ended)
  const unanswered = (i: number) => {
    if (i === 0) return PROFILE.filter(([q]) => !profile[q]).length;
    if (i <= SECTIONS.length) return SECTIONS[i - 1].items.filter((it) => answers[it.id] === undefined).length;
    return 0;
  };
  const missingShare = (totalItems - answered) / totalItems;

  const go = (i: number) => {
    setReviewing(false);
    setStep(i);
    setVisited((v) => new Set(v).add(i));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done)
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <CheckCircle2 size={44} className="mx-auto text-emerald-500" />
        <h2 className="mt-4 text-xl font-semibold text-slate-900">Thank you for your response</h2>
        <p className="mt-2 text-sm text-slate-500">Your answers are anonymous and will be reported only as group results.</p>
      </div>
    );

  const section = step >= 1 && step <= SECTIONS.length ? SECTIONS[step - 1] : null;
  const left = unanswered(step);
  const incompleteSteps = STEPS.map((s, i) => ({ s, i, n: unanswered(i) })).filter((x) => x.n > 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-4">
        <div className="flex items-center justify-between gap-3 text-xs text-slate-500">
          <span>You can skip items and come back later. Tap a section to jump to it.</span>
          <span className="tabular whitespace-nowrap">
            {answered}/{totalItems} answered
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {STEPS.map((s, i) => {
            const n = unanswered(i);
            const seen = visited.has(i) && i !== step;
            return (
              <button
                key={s}
                type="button"
                onClick={() => go(i)}
                title={n ? `Section ${s}: ${n} unanswered` : `Section ${s}`}
                className={clsx(
                  "relative flex h-8 flex-1 items-center justify-center rounded-lg text-xs font-semibold ring-1 ring-inset transition",
                  i === step && !reviewing
                    ? "bg-brand-600 text-white ring-brand-600"
                    : seen && n > 0
                      ? "bg-amber-50 text-amber-800 ring-amber-200 hover:bg-amber-100"
                      : seen || (n === 0 && i < STEPS.length - 1)
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200 hover:bg-emerald-100"
                        : "bg-white text-slate-500 ring-slate-200 hover:bg-slate-50",
                )}
              >
                {s}
                {seen && n > 0 && <span className="tabular absolute -right-1 -top-1.5 rounded-full bg-amber-500 px-1 text-[9px] leading-4 text-white">{n}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="px-6 py-6">
        {reviewing ? (
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Some items are still unanswered</h2>
            <p className="mt-1 text-sm text-slate-500">You can submit now or go back to any section. Skipped items are recorded as missing.</p>
            <ul className="mt-5 space-y-2">
              {incompleteSteps.map(({ s, i, n }) => (
                <li key={s} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-200 bg-amber-50/60 px-4 py-2.5 text-sm">
                  <span className="text-slate-700">
                    <b>Section {s}</b> · {i === 0 ? "Respondent profile" : SECTIONS[i - 1].title}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="tabular text-xs text-amber-800">{n} unanswered</span>
                    <button type="button" onClick={() => go(i)} className="rounded-md bg-white px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200 hover:bg-brand-50">
                      Go to section
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            {missingShare > MISSING_LIMIT && (
              <div className="mt-4 flex gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-800">
                <AlertTriangle size={15} className="shrink-0" />
                <span>
                  {Math.round(missingShare * 100)}% of the rating items are unanswered. Responses with more than 20% missing items cannot be included in the analysis.
                </span>
              </div>
            )}
          </div>
        ) : (
          <>
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">Section A. Respondent profile</h2>
                {PROFILE.map(([label, opts]) => (
                  <fieldset key={label}>
                    <legend className="text-sm font-medium text-slate-700">{label}</legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {opts.map((o) => (
                        <label key={o} className="cursor-pointer">
                          <input
                            type="radio"
                            name={label}
                            checked={profile[label] === o}
                            onChange={() => setProfile({ ...profile, [label]: o })}
                            className="peer sr-only"
                          />
                          <span className="block rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 peer-checked:border-brand-500 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-500 hover:bg-slate-50">
                            {o}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
            )}

            {section && (
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Section {section.key}. {section.title}
                </h2>
                <div className="mt-4 hidden grid-cols-[1fr_repeat(5,72px)] gap-1 border-b border-slate-100 pb-2 text-center text-[10px] font-medium uppercase leading-tight text-slate-400 md:grid">
                  <span />
                  {section.scale.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </div>
                <ul>
                  {section.items.map((it) => (
                    <li key={it.id} className="grid gap-2 border-b border-slate-100 py-3 md:grid-cols-[1fr_repeat(5,72px)] md:items-center md:gap-1">
                      <p className="text-sm text-slate-700">
                        <span className="mr-2 font-mono text-xs text-slate-400">{it.id}</span>
                        {it.text}
                      </p>
                      <div className="flex gap-1 md:contents">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <button
                            key={v}
                            type="button"
                            aria-label={`${it.id}: ${section.scale[v - 1]}`}
                            onClick={() => setAnswers({ ...answers, [it.id]: v })}
                            className={clsx(
                              "mx-auto grid h-9 w-full place-items-center rounded-lg border text-sm font-medium transition md:w-11",
                              answers[it.id] === v ? "border-brand-600 bg-brand-600 text-white" : "border-slate-200 text-slate-500 hover:border-brand-300 hover:bg-brand-50",
                            )}
                          >
                            {v}
                          </button>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step === STEPS.length - 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Section H. Open-ended questions <span className="text-sm font-normal text-slate-400">(optional)</span>
                </h2>
                {OPEN.map((q, i) => (
                  <label key={q} className="block">
                    <span className="text-sm font-medium text-slate-700">
                      {i + 1}. {q}
                    </span>
                    <textarea
                      rows={3}
                      value={openEnded[i]}
                      onChange={(e) => setOpenEnded(openEnded.map((x, j) => (j === i ? e.target.value : x)))}
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                    />
                  </label>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
        <button
          onClick={() => (reviewing ? setReviewing(false) : go(Math.max(0, step - 1)))}
          disabled={step === 0 && !reviewing}
          className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-40"
        >
          Back
        </button>
        <span className="hidden items-center gap-1.5 text-center text-xs text-slate-400 sm:flex">
          {!reviewing && left > 0 ? (
            <span className="text-amber-700">{left} unanswered in this section · you can continue and return later</span>
          ) : (
            <>
              <ShieldCheck size={14} /> Anonymous response
            </>
          )}
        </span>
        {reviewing ? (
          <button onClick={() => setDone(true)} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            Submit anyway
          </button>
        ) : step < STEPS.length - 1 ? (
          <button onClick={() => go(step + 1)} className="whitespace-nowrap rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">
            {left > 0 ? "Skip for now" : "Continue"}
          </button>
        ) : (
          <button
            onClick={() => (incompleteSteps.length ? setReviewing(true) : setDone(true))}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Submit response
          </button>
        )}
      </div>
    </div>
  );
}
