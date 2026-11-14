import clsx from "clsx";
import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          {eyebrow && (
            <p className="flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-700">
              <span className="h-2 w-2 rotate-45 bg-safety-500" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-ink-950">{title}</h1>
          {description && <p className="mt-1 max-w-3xl text-sm text-slate-600">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="ruler mt-4 text-brand-600" />
    </div>
  );
}

export function Card({
  title,
  subtitle,
  action,
  children,
  className,
  bodyClass,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClass?: string;
}) {
  return (
    <section className={clsx("rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_2px_rgba(11,17,18,0.06)]", className)}>
      {(title || action) && (
        <header className="flex items-start justify-between gap-3 border-b border-dashed border-slate-200 px-5 py-3.5">
          <div>
            {title && (
              <h2 className="flex items-center gap-2 text-sm font-semibold text-ink-950">
                <span className="h-3.5 w-1 shrink-0 rounded-full bg-safety-500" />
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={clsx("p-5", bodyClass)}>{children}</div>
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="reg-marks rounded-xl border border-slate-200/90 bg-white p-4 shadow-[0_1px_2px_rgba(11,17,18,0.06)]">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
        {icon && <span className="grid h-7 w-7 place-items-center rounded-md bg-brand-50 text-brand-600">{icon}</span>}
      </div>
      <p className="tabular mt-2 font-mono text-2xl font-semibold tracking-tight text-ink-950">{value}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

const TONES: Record<string, string> = {
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  teal: "bg-teal-50 text-teal-700 ring-teal-200",
  amber: "bg-amber-50 text-amber-800 ring-amber-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  rose: "bg-rose-50 text-rose-700 ring-rose-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-200",
};

export function Badge({ tone = "slate", children, className }: { tone?: string; children: React.ReactNode; className?: string }) {
  return (
    <span className={clsx("inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset", TONES[tone] ?? TONES.slate, className)}>
      {children}
    </span>
  );
}

export function Button({
  children,
  variant = "primary",
  href,
  className,
  ...rest
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = clsx(
    "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:opacity-50",
    variant === "primary" && "bg-brand-600 text-white shadow-sm hover:bg-brand-700",
    variant === "secondary" && "border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
    variant === "ghost" && "text-slate-600 hover:bg-slate-100",
    className,
  );
  if (href)
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function Progress({ value, tone = "brand" }: { value: number; tone?: "brand" | "emerald" | "amber" | "rose" }) {
  const color = { brand: "bg-brand-600", emerald: "bg-emerald-500", amber: "bg-amber-500", rose: "bg-rose-500" }[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={clsx("h-full rounded-full", color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}

export function Table({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("overflow-x-auto", className)}>
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}
export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={clsx("whitespace-nowrap border-b border-slate-200 bg-brand-50/50 px-3 py-2 font-mono text-[10.5px] font-medium uppercase tracking-wider text-slate-500", className)}>{children}</th>;
}
export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={clsx("border-b border-slate-100 px-3 py-2.5 align-top text-slate-700", className)}>{children}</td>;
}

/** Colour scale for 0–5 rubric scores. */
export function scoreClass(v: number) {
  return [
    "bg-rose-100 text-rose-800",
    "bg-orange-100 text-orange-800",
    "bg-amber-100 text-amber-800",
    "bg-lime-100 text-lime-800",
    "bg-teal-100 text-teal-800",
    "bg-emerald-200 text-emerald-900",
  ][Math.round(v)] ?? "bg-slate-100";
}

export function SampleDataNotice() {
  return (
    <div className="mb-5 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
      <span className="font-semibold">Preview mode:</span> all figures are synthetic sample data, not study results. They will be replaced by live data once Supabase is connected.
    </div>
  );
}
