import Card from "@/components/Card";
import CircularGauge from "@/components/CircularGauge";
import StatusBadge from "@/components/StatusBadge";
import settlementsData from "@/data/settlements.json";
import { SettlementDataset } from "@/types/settlement";

const data = settlementsData as SettlementDataset;
const item = data.settlements[0];

const milestones = [
  { label: "Readiness", state: "complete" },
  { label: "Documents", state: "complete" },
  { label: "PEXA", state: "warning" },
  { label: "Validation", state: "pending" },
  { label: "Execution", state: "pending" },
  { label: "Handover", state: "pending" },
] as const;

const stateTone: Record<(typeof milestones)[number]["state"], "green" | "amber" | "slate"> = {
  complete: "green",
  warning: "amber",
  pending: "slate",
};

export default function BrokerPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <Card title="Settlement Header Summary">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Loan ID</p>
              <p className="mt-1 font-semibold text-slate-900">{item.loanId}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Borrower</p>
              <p className="mt-1 font-semibold text-slate-900">{item.borrowerName}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Broker</p>
              <p className="mt-1 font-semibold text-slate-900">{item.brokerName}</p>
            </div>
          </div>
        </Card>

        <Card title="Milestone Timeline">
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <div key={milestone.label} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                <StatusBadge label={milestone.state.toUpperCase()} tone={stateTone[milestone.state]} />
                <p className="font-medium text-slate-800">{milestone.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Communication Thread (Mock)">
          <div className="space-y-3 text-sm">
            <div className="rounded-lg bg-slate-100 p-3 text-slate-700">
              <p className="font-semibold text-slate-900">Ops Team</p>
              <p>Validation package reviewed. Pending signed mortgage upload.</p>
            </div>
            <div className="rounded-lg bg-teal-50 p-3 text-slate-700">
              <p className="font-semibold text-slate-900">Broker - Apex Finance Group</p>
              <p>Document expected by 2:00pm AEST. Will update PEXA immediately after.</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-6">
        <Card title="Readiness Gauge">
          <CircularGauge value={item.readinessScore} label="Readiness Score" />
        </Card>
        <Card title="Document Checklist">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Mortgage Contract</span><StatusBadge label="Received" tone="green" /></li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Signed Mortgage</span><StatusBadge label="Pending" tone="amber" /></li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>ID Verification</span><StatusBadge label="Complete" tone="green" /></li>
          </ul>
        </Card>
        <Card title="Next Action">
          <p className="text-sm text-slate-700">Broker to upload signed mortgage document and confirm trust account funding before SLA deadline.</p>
        </Card>
      </div>
    </div>
  );
}
