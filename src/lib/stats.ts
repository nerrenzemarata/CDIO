// Statistics used across the study (Chapter III, Data Analysis).

export const CLUSTERS: { key: string; label: string; standards: number[] }[] = [
  { key: "context", label: "Context", standards: [1] },
  { key: "curriculum", label: "Curriculum", standards: [2, 3] },
  { key: "design", label: "Design-implement & workspaces", standards: [4, 5, 6] },
  { key: "teaching", label: "Teaching & learning", standards: [7, 8] },
  { key: "faculty", label: "Faculty competence", standards: [9, 10] },
  { key: "assessment", label: "Assessment & evaluation", standards: [11, 12] },
];

/** IMI = sum of consensus scores / (5 × n) × 100 */
export function imi(scores: number[]): number {
  if (!scores.length) return 0;
  return (scores.reduce((a, b) => a + b, 0) / (5 * scores.length)) * 100;
}

export function imiBand(v: number): { label: string; tone: string } {
  if (v > 80) return { label: "Continuously improving", tone: "emerald" };
  if (v > 60) return { label: "Established across the program", tone: "teal" };
  if (v > 40) return { label: "Partially implemented", tone: "amber" };
  if (v > 20) return { label: "Planned or piloted", tone: "orange" };
  return { label: "Initial awareness or no plan", tone: "rose" };
}

export function quantile(xs: number[], q: number): number {
  const s = [...xs].sort((a, b) => a - b);
  if (!s.length) return NaN;
  const pos = (s.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return s[lo] + (s[hi] - s[lo]) * (pos - lo);
}
export const median = (xs: number[]) => quantile(xs, 0.5);
export const iqr = (xs: number[]) => quantile(xs, 0.75) - quantile(xs, 0.25);
export const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
export function sd(xs: number[]): number {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
}

/**
 * Krippendorff's alpha, ordinal metric.
 * units: array of units, each an array of the values given by coders (missing omitted).
 */
export function krippendorffOrdinal(units: number[][], categories = [0, 1, 2, 3, 4, 5]): number {
  const idx = new Map(categories.map((c, i) => [c, i]));
  const K = categories.length;
  const o = Array.from({ length: K }, () => new Array(K).fill(0));
  for (const u of units) {
    const m = u.length;
    if (m < 2) continue;
    for (let i = 0; i < m; i++)
      for (let j = 0; j < m; j++) {
        if (i === j) continue;
        o[idx.get(u[i])!][idx.get(u[j])!] += 1 / (m - 1);
      }
  }
  const nc = o.map((row) => row.reduce((a, b) => a + b, 0));
  const n = nc.reduce((a, b) => a + b, 0);
  const delta = (c: number, k: number) => {
    const [a, b] = c <= k ? [c, k] : [k, c];
    let s = 0;
    for (let g = a; g <= b; g++) s += nc[g];
    return (s - (nc[a] + nc[b]) / 2) ** 2;
  };
  let num = 0;
  let den = 0;
  for (let c = 0; c < K; c++)
    for (let k = 0; k < K; k++) {
      const d = delta(c, k);
      num += o[c][k] * d;
      den += nc[c] * nc[k] * d;
    }
  if (den === 0) return 1;
  return 1 - ((n - 1) * num) / den;
}

export function alphaBand(a: number): string {
  if (a >= 0.8) return "High";
  if (a >= 0.667) return "Tentative";
  return "Low";
}

/** Cronbach's alpha. rows = respondents, cols = items. */
export function cronbach(rows: number[][]): number {
  const k = rows[0]?.length ?? 0;
  if (k < 2) return NaN;
  const itemVars = Array.from({ length: k }, (_, j) => sd(rows.map((r) => r[j])) ** 2);
  const totalVar = sd(rows.map((r) => r.reduce((a, b) => a + b, 0))) ** 2;
  return (k / (k - 1)) * (1 - itemVars.reduce((a, b) => a + b, 0) / totalVar);
}

export function likertBand(m: number): string {
  if (m >= 4.21) return "Very high";
  if (m >= 3.41) return "High";
  if (m >= 2.61) return "Moderate";
  if (m >= 1.81) return "Low";
  return "Very low";
}

function binom(n: number, k: number): number {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
}

/** I-CVI and modified kappa from 4-point relevance ratings. */
export function icvi(ratings: number[]) {
  const N = ratings.length;
  const A = ratings.filter((r) => r >= 3).length;
  const cvi = A / N;
  const pc = binom(N, A) * 0.5 ** N;
  const kstar = (cvi - pc) / (1 - pc);
  return { cvi, kstar, A, N };
}

export function kappaBand(k: number): string {
  if (k > 0.74) return "Excellent";
  if (k >= 0.6) return "Good";
  if (k >= 0.4) return "Fair";
  return "Poor";
}
