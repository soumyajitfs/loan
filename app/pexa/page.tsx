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

      <Card title="Settlement Document Validation">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Lender Details Availability</span><span className="font-semibold text-emerald-700">97%</span></div>
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Document Readiness</span><span className="font-semibold text-amber-700">88%</span></div>
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Compliance Validation</span><span className="font-semibold text-emerald-700">92%</span></div>
        </div>
      </Card>

      <Card title="Banking & Funds Validation">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Fund Transfer Details</span><span className="font-semibold text-emerald-700">Verified</span></div>
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Banking Entries Validation</span><span className="font-semibold text-amber-700">2 Pending</span></div>
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>Borrower Activation Status</span><span className="font-semibold text-emerald-700">96%</span></div>
          <div className="flex justify-between rounded-md bg-slate-50 px-3 py-2"><span>KYC Validation</span><span className="font-semibold text-emerald-700">93%</span></div>
        </div>
      </Card>

      <Card title="API Sync Log" className="md:col-span-2 xl:col-span-2">
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
        <button className="mt-3 w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">Trigger Settlement Execution</button>
      </Card>
    </div>
  );
}
