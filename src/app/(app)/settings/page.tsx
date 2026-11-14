import { Card, PageHeader } from "@/components/ui";
import { SETTINGS } from "@/lib/data";

export default function SettingsPage() {
  const groups = [...new Set(SETTINGS.map((s) => s.group))];
  return (
    <>
      <PageHeader
        eyebrow="System"
        title="Thresholds & settings"
        description="Decision rules from Chapter III. They are stored as settings so they can be changed (e.g. after the defense) without code changes."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {groups.map((g) => (
          <Card key={g} title={g} bodyClass="p-0">
            <dl className="divide-y divide-slate-100">
              {SETTINGS.filter((s) => s.group === g).map((s) => (
                <div key={s.key} className="flex items-center justify-between gap-4 px-5 py-3">
                  <dt className="text-sm text-slate-600">{s.key}</dt>
                  <dd>
                    <input
                      defaultValue={s.value}
                      className="w-72 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-right text-sm text-slate-800 focus:border-brand-500 focus:bg-white focus:outline-none"
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
      </div>
    </>
  );
}
