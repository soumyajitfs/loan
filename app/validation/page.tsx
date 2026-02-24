import Card from "@/components/Card";
import SLACountdown from "@/components/SLACountdown";
import StatusBadge from "@/components/StatusBadge";
import settlementsData from "@/data/settlements.json";
import { SettlementDataset } from "@/types/settlement";

const data = settlementsData as SettlementDataset;
const item = data.settlements[0];

const checks = [
  { name: "Documents Signed", state: "warning" as const },
  { name: "Compliance Cleared", state: "pass" as const },
  { name: "Funds Confirmed", state: "pass" as const },
  { name: "Title Verified", state: "fail" as const },
  { name: "AML Complete", state: "pass" as const },
];

const toBadge = (state: "pass" | "warning" | "fail") => {
  if (state === "pass") return { label: "Pass", tone: "green" as const };
  if (state === "warning") return { label: "Warning", tone: "amber" as const };
  return { label: "Fail", tone: "red" as const };
};

export default function ValidationPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {checks.map((check) => {
          const badge = toBadge(check.state);
          return (
            <Card key={check.name} title={check.name}>
              <StatusBadge label={badge.label} tone={badge.tone} />
            </Card>
          );
        })}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Predictive Risk Score">
          <p className="text-4xl font-bold text-slate-900">{item.riskScore}/100</p>
          <p className="mt-2 text-sm text-slate-600">{item.riskReason}</p>
        </Card>
        <Card title="SLA Countdown Timer">
          <SLACountdown deadline={item.slaDeadline} />
        </Card>
      </div>
    </div>
  );
}
