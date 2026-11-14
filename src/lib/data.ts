// Sample data for the UI preview. Every value here is synthetic (generated
// from a fixed seed) and is NOT study data. Replace this module with
// Supabase queries when the backend is connected.
import { imi, krippendorffOrdinal, median, CLUSTERS, cronbach, icvi } from "./stats";

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(20261114);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export const STANDARDS = [
  { n: 1, name: "The context", short: "Context" },
  { n: 2, name: "Learning outcomes", short: "Outcomes" },
  { n: 3, name: "Integrated curriculum", short: "Curriculum" },
  { n: 4, name: "Introduction to engineering", short: "Intro Eng" },
  { n: 5, name: "Design-implement experiences", short: "Design-Impl" },
  { n: 6, name: "Engineering workspaces", short: "Workspaces" },
  { n: 7, name: "Integrated learning experiences", short: "Integ. Learn" },
  { n: 8, name: "Active learning", short: "Active" },
  { n: 9, name: "Faculty competence in CDIO skills", short: "Fac. Skills" },
  { n: 10, name: "Faculty teaching competence", short: "Fac. Teach" },
  { n: 11, name: "Learning assessment", short: "Assessment" },
  { n: 12, name: "Program evaluation", short: "Evaluation" },
];

export type EntryMode = "Top-down" | "Bottom-up" | "Hybrid";
export type Pillar = "Regulative" | "Normative" | "Cultural-cognitive";

export interface Program {
  id: string;
  name: string;
  consensus: number[]; // 12
  verified: boolean[]; // 12
  prescores: number[][]; // panel member × 12
  status: "Not started" | "Pre-scoring" | "Consensus done";
}

export interface Case {
  id: string;
  code: string;
  university: string;
  short: string;
  island: "Luzon" | "Visayas" | "Mindanao";
  entryYear: number;
  entryMode: EntryMode;
  collegeSize: string;
  multiCampus: boolean;
  accreditation: string;
  leadershipChanges: number;
  dominantPillar: Pillar;
  enactedShare: number;
  resourceLevel: "Low" | "Moderate" | "High";
  archetype: string;
  programs: Program[];
  fieldwork: { step: string; done: boolean }[];
  insider?: boolean;
}

const PROFILE: Omit<Case, "programs" | "fieldwork">[] = [
  { id: "a", code: "A", university: "Bulacan State University", short: "BulSU", island: "Luzon", entryYear: 2017, entryMode: "Hybrid", collegeSize: "Large (≈ 110 faculty)", multiCampus: false, accreditation: "AACCUP Level III", leadershipChanges: 1, dominantPillar: "Normative", enactedShare: 0.58, resourceLevel: "Moderate", archetype: "Champion-led" },
  { id: "b", code: "B", university: "Batangas State University", short: "BatStateU", island: "Luzon", entryYear: 2016, entryMode: "Top-down", collegeSize: "Very large (≈ 180 faculty)", multiCampus: true, accreditation: "PTC-ACBET accredited", leadershipChanges: 0, dominantPillar: "Regulative", enactedShare: 0.71, resourceLevel: "High", archetype: "Systemically embedded" },
  { id: "c", code: "C", university: "Cebu Technological University", short: "CTU", island: "Visayas", entryYear: 2018, entryMode: "Top-down", collegeSize: "Large (≈ 140 faculty)", multiCampus: true, accreditation: "AACCUP Level III", leadershipChanges: 2, dominantPillar: "Regulative", enactedShare: 0.39, resourceLevel: "Moderate", archetype: "Compliance-driven" },
  { id: "d", code: "D", university: "University of Science and Technology of Southern Philippines", short: "USTP", island: "Mindanao", entryYear: 2015, entryMode: "Hybrid", collegeSize: "Large (≈ 120 faculty)", multiCampus: true, accreditation: "PTC-ACBET accredited", leadershipChanges: 1, dominantPillar: "Cultural-cognitive", enactedShare: 0.66, resourceLevel: "Moderate", archetype: "Systemically embedded", insider: true },
  { id: "e", code: "E", university: "University of Southeastern Philippines", short: "USeP", island: "Mindanao", entryYear: 2019, entryMode: "Bottom-up", collegeSize: "Medium (≈ 70 faculty)", multiCampus: false, accreditation: "AACCUP Level II", leadershipChanges: 2, dominantPillar: "Normative", enactedShare: 0.42, resourceLevel: "Low", archetype: "Stalled" },
];

const BASE: Record<string, number> = { a: 3.0, b: 3.7, c: 2.6, d: 3.4, e: 2.1 };
const PROGRAM_NAMES = [
  ["BS Civil Engineering", "BS Electrical Engineering", "BS Mechanical Engineering"],
  ["BS Electronics Engineering", "BS Mechanical Engineering", "BS Industrial Engineering"],
  ["BS Civil Engineering", "BS Electrical Engineering"],
  ["BS Mechanical Engineering", "BS Electronics Engineering", "BS Computer Engineering"],
  ["BS Civil Engineering", "BS Electrical Engineering"],
];
// standards 1–3 tend to lead (proposition P1)
const STD_SHIFT = [0.6, 0.5, 0.3, 0.4, 0.1, -0.4, 0, 0.2, -0.3, -0.1, -0.5, -0.6];

export const CASES: Case[] = PROFILE.map((p, ci) => {
  const programs: Program[] = PROGRAM_NAMES[ci].map((name, pi) => {
    const consensus = STD_SHIFT.map((s) =>
      clamp(Math.round(BASE[p.id] + s + (rand() - 0.5) * 1.4), 0, 5),
    );
    const verified = consensus.map((v) => v < 3 || rand() > (p.id === "c" ? 0.45 : 0.15));
    const panel = 5 + Math.floor(rand() * 3);
    const prescores = Array.from({ length: panel }, () =>
      consensus.map((v) => clamp(Math.round(v + (rand() - 0.45) * 2.2), 0, 5)),
    );
    const status: Program["status"] = ci === 4 && pi === 1 ? "Pre-scoring" : "Consensus done";
    return { id: `${p.id}${pi + 1}`, name, consensus, verified, prescores, status };
  });
  const steps = ["Permission & data-sharing agreement", "Document audit", "Pre-scoring", "Consensus sessions", "KIIs & timelines", "Faculty FGD", "FCIS survey closed", "Case report member-checked"];
  const doneCount = [8, 8, 7, 6, 4][ci];
  return { ...p, programs, fieldwork: steps.map((step, i) => ({ step, done: i < doneCount })) };
});

export function getCase(id: string) {
  return CASES.find((c) => c.id === id);
}

/** College-level median per standard across embedded programs. */
export function caseStandardMedians(c: Case): number[] {
  return STANDARDS.map((_, s) => median(c.programs.map((p) => p.consensus[s])));
}
export function caseIMI(c: Case) {
  return imi(caseStandardMedians(c));
}
export function caseClusters(c: Case) {
  const med = caseStandardMedians(c);
  return CLUSTERS.map((k) => ({ ...k, value: imi(k.standards.map((s) => med[s - 1])) }));
}
export function programAlpha(p: Program) {
  const units = STANDARDS.map((_, s) => p.prescores.map((r) => r[s]));
  return krippendorffOrdinal(units);
}
export function unverifiedCount(c: Case) {
  return c.programs.reduce((a, p) => a + p.verified.filter((v) => !v).length, 0);
}

// ---------------- Documents (Appendix C) ----------------
export const DOC_TYPES = [
  "Board / academic council resolution on CDIO",
  "Strategic or development plan entries on CDIO",
  "Budget lines for CDIO, workspaces, training",
  "CDIO membership or collaborator records",
  "Program educational objectives and outcomes matrix",
  "Curriculum map (I/E/D levels)",
  "Syllabus: introduction to engineering course",
  "Syllabi of design-implement and capstone courses",
  "Laboratory / makerspace plans, inventory, schedules",
  "Faculty development and industry immersion records",
  "Assessment rubrics and outcome attainment reports",
  "CDIO self-evaluation reports",
  "CHED, AACCUP, PTC-ACBET accreditation reports",
  "Industry advisory board minutes, MOAs",
  "Student, alumni and employer feedback reports",
  "Workload, incentive or promotion policies citing CDIO",
];
const DOC_STDS = [[1], [1], [6, 9, 10], [1], [2], [3], [4], [5, 7], [6], [9, 10], [11], [12], [2, 12], [2], [12], [9, 10]];
const DOC_PILLAR: ("R" | "N" | "CC")[] = ["R", "R", "R", "N", "R", "R", "R", "N", "R", "N", "R", "R", "R", "N", "N", "R"];

export function caseDocuments(c: Case) {
  const r = rng(c.code.charCodeAt(0));
  return DOC_TYPES.map((type, i) => {
    const available = r() > (c.id === "e" ? 0.4 : 0.15);
    const year = c.entryYear + Math.floor(r() * (2026 - c.entryYear));
    return {
      no: i + 1,
      type,
      available,
      period: available ? String(year) : "—",
      code: available ? `${c.code}-DOC-${String(i + 1).padStart(2, "0")}` : "—",
      standards: DOC_STDS[i],
      pillar: DOC_PILLAR[i],
      practice: available ? (r() > 0.45 ? "Shows practice" : "Formal only") : "—",
    };
  });
}

// ---------------- Timeline (Appendix E, merged) ----------------
export const ROGERS_STAGES = ["Agenda-setting", "Matching", "Redefining / restructuring", "Clarifying", "Routinizing"] as const;
export function caseTimeline(c: Case) {
  const y = c.entryYear;
  const events = [
    { year: y - 1, stage: 0, title: "Accreditation findings flag weak industry link", kind: "Setback", pillar: "Regulative" },
    { year: y, stage: 1, title: "Faculty attend CDIO training (Singapore Polytechnic / master trainers)", kind: "Training", pillar: "Normative" },
    { year: y, stage: 1, title: c.entryMode === "Bottom-up" ? "Faculty-led pilot in two courses" : "Board resolution adopting CDIO", kind: "Decision", pillar: c.entryMode === "Bottom-up" ? "Normative" : "Regulative" },
    { year: y + 1, stage: 2, title: "Curriculum maps revised with I/E/D levels", kind: "Decision", pillar: "Regulative" },
    { year: y + 2, stage: 2, title: "Makerspace budget line approved", kind: "Funding", pillar: "Regulative" },
    { year: y + 3, stage: 3, title: "CDIO coordinator unit created", kind: "Decision", pillar: "Regulative" },
    ...(c.leadershipChanges > 0 ? [{ year: y + 4, stage: 3, title: "Change of dean; CDIO activities slow", kind: "Setback", pillar: "Regulative" }] : []),
    { year: y + 5, stage: c.enactedShare > 0.6 ? 4 : 3, title: "CDIO training counted in faculty promotion", kind: "Decision", pillar: "Normative" },
    ...(c.enactedShare > 0.6 ? [{ year: Math.min(y + 7, 2026), stage: 4, title: "New faculty onboarded into CDIO course design as routine", kind: "Turning point", pillar: "Cultural-cognitive" }] : []),
  ];
  return events.filter((e) => e.year <= 2026);
}

// ---------------- Factors (SO1-C) ----------------
export interface Factor {
  name: string;
  category: "Institutional" | "Resource" | "Faculty" | "Stakeholder";
  type: "Barrier" | "Enabler";
  strength: "Low" | "Moderate" | "High";
  attribute: string;
  pillar: Pillar;
  prevalence: number;
}
const FACTOR_POOL: Omit<Factor, "strength" | "prevalence">[] = [
  { name: "Leadership commitment and continuity", category: "Institutional", type: "Enabler", attribute: "Observability", pillar: "Regulative" },
  { name: "QA integration with AACCUP / PTC evidence", category: "Institutional", type: "Enabler", attribute: "Compatibility", pillar: "Regulative" },
  { name: "Multi-campus governance coordination", category: "Institutional", type: "Barrier", attribute: "Complexity", pillar: "Regulative" },
  { name: "Procurement (RA 9184) delays", category: "Resource", type: "Barrier", attribute: "Complexity", pillar: "Regulative" },
  { name: "Inadequate workspaces and equipment", category: "Resource", type: "Barrier", attribute: "Trialability", pillar: "Regulative" },
  { name: "Plantilla / staffing limits", category: "Resource", type: "Barrier", attribute: "Complexity", pillar: "Regulative" },
  { name: "Teaching workload leaves no design time", category: "Faculty", type: "Barrier", attribute: "Complexity", pillar: "Normative" },
  { name: "Master-trainer network", category: "Faculty", type: "Enabler", attribute: "Trialability", pillar: "Normative" },
  { name: "CDIO counted in promotion", category: "Faculty", type: "Enabler", attribute: "Relative advantage", pillar: "Normative" },
  { name: "Faculty resistance to new assessment", category: "Faculty", type: "Barrier", attribute: "Complexity", pillar: "Cultural-cognitive" },
  { name: "Industry partners provide real projects", category: "Stakeholder", type: "Enabler", attribute: "Relative advantage", pillar: "Normative" },
  { name: "Positive student response to projects", category: "Stakeholder", type: "Enabler", attribute: "Observability", pillar: "Cultural-cognitive" },
];
export function caseFactors(c: Case): Factor[] {
  const r = rng(c.code.charCodeAt(0) * 7);
  return FACTOR_POOL.map((f) => {
    const prevalence = Math.round(20 + r() * 75);
    const strength: Factor["strength"] = prevalence > 65 ? "High" : prevalence > 40 ? "Moderate" : "Low";
    return { ...f, prevalence, strength };
  }).sort((a, b) => b.prevalence - a.prevalence);
}

// ---------------- FCIS survey (Appendix G) ----------------
export const SUBSCALES = [
  { key: "B", label: "Perceived attributes", items: 15 },
  { key: "C-R", label: "Regulative support", items: 5 },
  { key: "C-N", label: "Normative support", items: 5 },
  { key: "C-CC", label: "Cultural-cognitive support", items: 5 },
  { key: "D", label: "Resources & structures", items: 5 },
  { key: "E", label: "Stakeholder engagement", items: 5 },
  { key: "F", label: "Faculty readiness", items: 5 },
  { key: "G", label: "Enacted practice", items: 5 },
];
export const SURVEY_ELIGIBLE: Record<string, number> = { a: 74, b: 112, c: 68, d: 81, e: 46 };

export function surveyData() {
  return CASES.map((c) => {
    const r = rng(c.code.charCodeAt(0) * 13);
    const eligible = SURVEY_ELIGIBLE[c.id];
    const responses = Math.round(eligible * [0.71, 0.66, 0.58, 0.77, 0.52][CASES.indexOf(c)]);
    const base = 2.6 + (BASE[c.id] - 2) * 0.7;
    const subscales = SUBSCALES.map((s) => {
      const level = clamp(base + (r() - 0.5) * 0.9 + (s.key === "D" ? -0.4 : 0) + (s.key === "C-R" ? 0.3 : 0), 1, 5);
      const rows = Array.from({ length: responses }, () => {
        const person = level + (r() - 0.5) * 1.6;
        return Array.from({ length: s.items }, () => clamp(Math.round(person + (r() - 0.5) * 1.3), 1, 5));
      });
      const means = rows.map((row) => row.reduce((a, b) => a + b, 0) / row.length);
      const m = means.reduce((a, b) => a + b, 0) / means.length;
      return { ...s, mean: m, alpha: cronbach(rows), n: responses };
    });
    return { caseId: c.id, short: c.short, code: c.code, eligible, responses, rate: responses / eligible, subscales };
  });
}

// ---------------- Cross-case (SO2) ----------------
export const PROPOSITIONS = [
  { id: "P1", text: "Maturity in the curriculum-definition standards (Std 1–3) precedes maturity in faculty competence and assessment/evaluation (Std 9–12).", rival: "Accreditation cycles raise documentation-heavy standards together, regardless of sequence.", verdict: "Supported", evidence: "Std 1–3 cluster index exceeds Std 9–12 in all five cases; master timelines show curriculum maps preceding faculty-development policies by 2–4 years." },
  { id: "P2", text: "CDIO is routinized only where regulative mechanisms are matched by normative and cultural-cognitive support.", rival: "Regulative pressure alone produces high rubric scores (symbolic, compliance-driven adoption).", verdict: "Partly supported", evidence: "Case C shows high regulative scores with 6 discordant joint-display cells; Case B is high on all pillars. Case A is routinized with moderate regulative support." },
  { id: "P3", text: "Adoption pathways differ mainly by entry mode (top-down, bottom-up, hybrid) and leadership continuity.", rival: "Pathways differ mainly by resource level.", verdict: "Pending", evidence: "Awaiting Case E member check." },
];

export function jointDisplay() {
  return CASES.map((c) => {
    const med = caseStandardMedians(c);
    const r = rng(c.code.charCodeAt(0) * 31);
    return {
      caseId: c.id,
      short: c.short,
      cells: med.map((score, s) => {
        const faculty = clamp(1 + score * 0.75 + (r() - 0.5) * 1.6 - (c.id === "c" ? 0.7 : 0), 1, 5);
        const gap = score / 5 - (faculty - 1) / 4;
        const cls = gap > 0.3 ? "Discordant" : Math.abs(gap) < 0.15 ? "Convergent" : "Complementary";
        return { standard: s + 1, score, faculty, cls };
      }),
    };
  });
}

// ---------------- Framework (SO3) ----------------
export const FRAMEWORK = [
  { id: "C1", name: "Anchored mandate", condition: "CDIO is written into board resolutions, strategic plans and budget lines", mechanism: "Regulative legitimacy survives leadership change", outcome: "Implementation continues across administrations", stage: "Matching", pillar: "Regulative", sources: 4, cases: 4 },
  { id: "C2", name: "Promotion-linked faculty development", condition: "CDIO training and course redesign count toward faculty evaluation and promotion", mechanism: "Faculty treat CDIO teaching as part of their professional role", outcome: "Practice continues after champions leave", stage: "Clarifying", pillar: "Normative", sources: 5, cases: 3 },
  { id: "C3", name: "Distributed champions", condition: "At least one trained champion per embedded program, not one per college", mechanism: "Peer expectation spreads through departments", outcome: "Reduced dependence on a single coordinator", stage: "Redefining / restructuring", pillar: "Normative", sources: 3, cases: 3 },
  { id: "C4", name: "Integrated QA evidence", condition: "One evidence set serves CHED, AACCUP, PTC and CDIO self-evaluation", mechanism: "Documentation burden falls; CDIO stops being a parallel report", outcome: "Lower risk of decoupling", stage: "Routinizing", pillar: "Regulative", sources: 4, cases: 5 },
  { id: "C5", name: "Procurement-aware workspace planning", condition: "Workspace purchases are planned one fiscal cycle ahead of the courses that need them", mechanism: "RA 9184 timelines are absorbed instead of disrupting projects", outcome: "Design-implement experiences run as scheduled", stage: "Redefining / restructuring", pillar: "Regulative", sources: 2, cases: 2 },
  { id: "C6", name: "Routine onboarding", condition: "New faculty learn CDIO course design during onboarding", mechanism: "CDIO becomes \"the way we teach here\"", outcome: "Sedimented, taken-for-granted practice", stage: "Routinizing", pillar: "Cultural-cognitive", sources: 2, cases: 1 },
];
export const ROADMAP = {
  Entry: ["Secure a board resolution and name a CDIO focal person", "Send a core team to master-trainer workshops", "Pilot CDIO in the introduction-to-engineering course", "Run the first consensus self-evaluation"],
  Developing: ["Revise curriculum maps with I/E/D levels", "Plan workspace procurement one fiscal year ahead", "Count CDIO training in faculty evaluation", "Map CDIO evidence to AACCUP / PTC criteria"],
  Mature: ["Hold annual evidence-checked self-evaluation cycles", "Onboard new faculty through CDIO course design", "Mentor partner HEIs as a regional demonstration site", "Track outcome attainment across all 12 standards"],
};

// ---------------- e-Delphi (SO4) ----------------
export function delphi() {
  const r = rng(99);
  const experts = 9;
  const rounds = [1, 2].map((round) =>
    FRAMEWORK.map((f, i) => {
      const goodness = round === 1 ? [0.85, 0.9, 0.7, 0.92, 0.6, 0.55][i] : [0.92, 0.95, 0.85, 0.96, 0.82, 0.74][i];
      const ratings = Array.from({ length: experts }, () => (r() < goodness ? (r() > 0.4 ? 4 : 3) : r() > 0.5 ? 2 : 1));
      return { id: f.id, name: f.name, ...icvi(ratings) };
    }),
  );
  const criteria = [
    { id: "B1", text: "Components are complete", criterion: "Structural integrity" },
    { id: "B2", text: "Components are distinct", criterion: "Structural integrity" },
    { id: "B3", text: "Relationships are logical", criterion: "Structural integrity" },
    { id: "B4", text: "Addresses Philippine HEI conditions", criterion: "Relevance" },
    { id: "B5", text: "Useful for leaders", criterion: "Relevance" },
    { id: "B6", text: "Feasible with SUC budgets and staffing", criterion: "Operational feasibility" },
    { id: "B7", text: "Fits procurement and plantilla rules", criterion: "Operational feasibility" },
    { id: "B8", text: "Indicators track progress", criterion: "Operational feasibility" },
    { id: "B9", text: "Guides different capacity levels", criterion: "Scalability" },
    { id: "B10", text: "Adaptable to other systems", criterion: "Scalability" },
  ].map((c, i) => {
    const ratings = Array.from({ length: experts }, () => clamp(Math.round(3.9 + (r() - 0.35) * 2 - (i === 6 ? 0.8 : 0)), 1, 5));
    const s = [...ratings].sort((a, b) => a - b);
    const agree = ratings.filter((x) => x >= 4).length / experts;
    const q1 = s[Math.floor((experts - 1) * 0.25)];
    const q3 = s[Math.ceil((experts - 1) * 0.75)];
    return { ...c, median: s[Math.floor(experts / 2)], iqr: q3 - q1, agree };
  });
  return { experts, invited: 14, rounds, criteria };
}

export const SETTINGS = [
  { group: "Consensus scoring", key: "Unverified flag", value: "Consensus score ≥ 3 with no audit document" },
  { group: "Consensus scoring", key: "Disagreement rule", value: "Record the lower score" },
  { group: "Consensus scoring", key: "Krippendorff α bands", value: "≥ 0.80 high · 0.667–0.80 tentative · < 0.667 low" },
  { group: "Survey (FCIS)", key: "Exclude response if missing", value: "> 20% of items" },
  { group: "Survey (FCIS)", key: "Reliability threshold", value: "Cronbach α and McDonald ω ≥ 0.70" },
  { group: "Survey (FCIS)", key: "Target response rate", value: "≥ 60% per case" },
  { group: "Cross-case", key: "Systemic failure point", value: "Stall or reversal in ≥ 2 cases" },
  { group: "Framework", key: "Core component", value: "≥ 2 evidence sources and ≥ 2 cases" },
  { group: "e-Delphi", key: "I-CVI per component", value: "≥ 0.78" },
  { group: "e-Delphi", key: "Modified kappa k*", value: "≥ 0.74" },
  { group: "e-Delphi", key: "S-CVI/Ave", value: "≥ 0.90" },
  { group: "e-Delphi", key: "5-point items", value: "≥ 80% rate 4–5 and IQR ≤ 1" },
  { group: "e-Delphi", key: "Third round trigger", value: "> 20% of items fail" },
  { group: "Practitioner check", key: "Feasible action", value: "≥ 70% rate feasible" },
];

export const RECENT = [
  { when: "2 h ago", who: "Researcher", what: "Closed consensus session · Case D · BS Computer Engineering" },
  { when: "5 h ago", who: "Facilitator", what: "Uploaded FGD prompt cards · Case D (8 participants)" },
  { when: "Yesterday", who: "System", what: "Flagged 3 unverified scores · Case C · BS Electrical Engineering" },
  { when: "Yesterday", who: "Researcher", what: "Opened FCIS survey link · Case E" },
  { when: "2 days ago", who: "Second coder", what: "Completed double-coding · Case D transcripts (κ = 0.78)" },
];
