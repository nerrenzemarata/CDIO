import { DraftingCompass, Lock } from "lucide-react";
import { SurveyForm } from "./survey-form";

export default function PublicSurvey() {
  return (
    <div className="min-h-screen">
      <div className="blueprint h-2 w-full" />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-safety-500 text-ink-950">
            <DraftingCompass size={20} />
          </div>
          <div>
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-700">Faculty CDIO Institutionalization Survey</p>
            <h1 className="text-xl font-semibold text-slate-900">Your experience with CDIO in your program</h1>
          </div>
        </div>
        <div className="mb-6 rounded-xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600">
          <p>
            Dear Faculty Member: This survey asks about your experience with CDIO in your program. It takes about <b>15 minutes</b>. Your answers are anonymous and
            are reported only as group results. Participation is voluntary.
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
            <Lock size={12} /> No name or email is collected. Data handled under RA 10173 (Data Privacy Act).
          </p>
        </div>
        <SurveyForm />
      </div>
    </div>
  );
}
