"use client";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  ReferenceLine,
} from "recharts";

export const CASE_COLORS = ["#2852e0", "#0d9488", "#d97706", "#7c3aed", "#e11d48"];

export function MaturityRadar({
  axes,
  series,
  height = 340,
  legend = true,
}: {
  axes: string[];
  series: { name: string; values: number[]; color?: string }[];
  height?: number;
  legend?: boolean;
}) {
  const data = axes.map((a, i) => {
    const row: Record<string, string | number> = { axis: a };
    series.forEach((s) => (row[s.name] = s.values[i]));
    return row;
  });
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "#475569" }} />
        <PolarRadiusAxis domain={[0, 5]} tickCount={6} tick={{ fontSize: 9, fill: "#94a3b8" }} angle={90} />
        {series.map((s, i) => (
          <Radar
            key={s.name}
            name={s.name}
            dataKey={s.name}
            stroke={s.color ?? CASE_COLORS[i % CASE_COLORS.length]}
            fill={s.color ?? CASE_COLORS[i % CASE_COLORS.length]}
            fillOpacity={series.length > 2 ? 0.06 : 0.18}
            strokeWidth={2}
          />
        ))}
        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#e2e8f0" }} />
        {legend && <Legend wrapperStyle={{ fontSize: 12 }} />}
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function IMIBars({ data }: { data: { name: string; imi: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#475569" }} axisLine={false} tickLine={false} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <ReferenceLine y={60} stroke="#94a3b8" strokeDasharray="4 4" label={{ value: "Established", fontSize: 10, fill: "#64748b", position: "insideTopRight" }} />
        <Tooltip cursor={{ fill: "#f8fafc" }} formatter={(v: number) => v.toFixed(1)} contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#e2e8f0" }} />
        <Bar dataKey="imi" name="IMI" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((_, i) => (
            <Cell key={i} fill={CASE_COLORS[i % CASE_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SubscaleBars({ data, keys }: { data: Record<string, string | number>[]; keys: string[] }) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#f1f5f9" />
        <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#475569" }} axisLine={false} tickLine={false} interval={0} angle={-18} textAnchor="end" height={60} />
        <YAxis domain={[1, 5]} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: "#f8fafc" }} formatter={(v: number) => v.toFixed(2)} contentStyle={{ fontSize: 12, borderRadius: 8, borderColor: "#e2e8f0" }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} fill={CASE_COLORS[i]} radius={[3, 3, 0, 0]} maxBarSize={14} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
