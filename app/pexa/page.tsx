import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";

export default function PexaPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <Card title="Workspace Creation Status">
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-slate-900">105 / 128 workspaces auto-created</p>
          <StatusBadge label="82% Auto Creation Rate" tone="teal" />
        </div>
      </Card>

      <Card title="Auto vs Manual">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Auto</span><span className="font-semibold text-emerald-700">82%</span></div>
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Manual</span><span className="font-semibold text-amber-700">18%</span></div>
        </div>
      </Card>

      <Card title="Fund Balancing Status">
        <div className="space-y-2">
          <p className="text-sm text-slate-700">All scheduled settlements balanced except two pending trust ledger sync confirmations.</p>
          <StatusBadge label="2 Exceptions Open" tone="amber" />
        </div>
      </Card>

      <Card title="API Sync Log" className="md:col-span-2">
        <div className="space-y-2 text-sm text-slate-700">
          <p className="rounded-md bg-slate-50 px-3 py-2">10:43:12 AEST - Workspace sync success - RZ-2026-00131</p>
          <p className="rounded-md bg-slate-50 px-3 py-2">10:45:39 AEST - Funds API warning - delayed trust update</p>
          <p className="rounded-md bg-slate-50 px-3 py-2">10:47:51 AEST - Workspace lock confirmed - RZ-2026-00127</p>
        </div>
      </Card>

      <Card title="Exception Alerts">
        <ul className="space-y-2 text-sm">
          <li className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">Manual workspace adjustment required for RZ-2026-00131</li>
          <li className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-800">Title mismatch blocking auto progression for RZ-2026-00139</li>
        </ul>
      </Card>
    </div>
  );
}
