import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";

const controls = [
  { label: "Audit Trail Generated", value: "Yes", mode: "Auto Generated", tone: "green" as const },
  { label: "Archive Status", value: "Archived to Vault", mode: "Auto Generated", tone: "green" as const },
  { label: "Retention Policy Applied", value: "7-year Policy", mode: "Auto Generated", tone: "teal" as const },
  { label: "Regulator Alignment Status", value: "Compliant", mode: "Manual Review", tone: "amber" as const },
];

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <Card title="Compliance Validation Engine" subtitle="Data protection, classification, immutability, and completion controls">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 text-sm">
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Data Protection Verification</p>
            <p className="mt-1 font-semibold text-slate-900">Enabled</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Document Classification</p>
            <p className="mt-1 font-semibold text-slate-900">All Mandatory Categories Present</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Post-Approval Edit Lock</p>
            <p className="mt-1 font-semibold text-slate-900">Active</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-slate-500">Party Requirement Completion</p>
            <p className="mt-1 font-semibold text-slate-900">91%</p>
          </div>
        </div>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        {controls.map((control) => (
          <Card key={control.label} title={control.label}>
            <p className="mb-3 text-lg font-semibold text-slate-900">{control.value}</p>
            <StatusBadge label={control.mode} tone={control.tone} />
          </Card>
        ))}
      </section>

      <Card title="Document Immutability & Audit Log" subtitle="Lock state and event trail after compliance approval">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Document</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Approval</th>
                <th className="px-4 py-3">Edit State</th>
                <th className="px-4 py-3">Audit Event</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-900">Signed Mortgage Pack</td>
                <td className="px-4 py-3">Settlement</td>
                <td className="px-4 py-3"><StatusBadge label="Approved" tone="green" /></td>
                <td className="px-4 py-3"><StatusBadge label="Locked" tone="teal" /></td>
                <td className="px-4 py-3">Lock applied 2026-02-21 11:42 AEST</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-900">VOI Evidence</td>
                <td className="px-4 py-3">KYC</td>
                <td className="px-4 py-3"><StatusBadge label="Approved" tone="green" /></td>
                <td className="px-4 py-3"><StatusBadge label="Locked" tone="teal" /></td>
                <td className="px-4 py-3">No edits allowed after attestation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Exceptions Log Table" subtitle="Auto Generated vs Manual exception handling">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Exception ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Mode</th>
                <th className="px-4 py-3">Owner</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-900">CX-4412</td>
                <td className="px-4 py-3">Document retention mismatch</td>
                <td className="px-4 py-3"><StatusBadge label="Auto Generated" tone="teal" /></td>
                <td className="px-4 py-3">Compliance Engine</td>
                <td className="px-4 py-3"><StatusBadge label="Open" tone="amber" /></td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-semibold text-slate-900">CX-4420</td>
                <td className="px-4 py-3">Regulator mapping review</td>
                <td className="px-4 py-3"><StatusBadge label="Manual" tone="slate" /></td>
                <td className="px-4 py-3">Compliance Officer</td>
                <td className="px-4 py-3"><StatusBadge label="In Progress" tone="amber" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
