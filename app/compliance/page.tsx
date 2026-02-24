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
      <section className="grid gap-6 md:grid-cols-2">
        {controls.map((control) => (
          <Card key={control.label} title={control.label}>
            <p className="mb-3 text-lg font-semibold text-slate-900">{control.value}</p>
            <StatusBadge label={control.mode} tone={control.tone} />
          </Card>
        ))}
      </section>

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
