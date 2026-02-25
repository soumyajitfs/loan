"use client";

import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import settlementsData from "@/data/settlements.json";
import { filterSettlementsByRole } from "@/lib/role-access";
import { useRole } from "@/lib/role-context";
import { SettlementDataset } from "@/types/settlement";

const data = settlementsData as SettlementDataset;

const brokerMapping = {
  brokerId: "Broker 21",
  borrowers: ["Borrower 123", "Borrower 126", "Borrower 131"],
};

const tracker = ["Readiness", "Documents", "PEXA", "Validation", "Execution", "Handover"] as const;

export default function StakeholderJourneyPage() {
  const { role } = useRole();
  const visible = filterSettlementsByRole(role, data.settlements);
  const current = visible[0];

  if (role === "Borrower" && current) {
    return (
      <div className="space-y-6">
        <Card title="Borrower Journey View" subtitle="Single-loan borrower experience">
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div><p className="text-slate-500">Borrower ID</p><p className="font-semibold text-slate-900">Borrower 123</p></div>
            <div><p className="text-slate-500">Application Number</p><p className="font-semibold text-slate-900">{current.loanId}</p></div>
            <div><p className="text-slate-500">Current Loan Status</p><p className="font-semibold text-slate-900">{current.currentStage}</p></div>
          </div>
        </Card>

        <Card title="6-Stage Settlement Tracker">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            {tracker.map((stage) => {
              const active = stage.toLowerCase() === current.currentStage.toLowerCase();
              return (
                <div key={stage} className={`rounded-lg border p-3 text-sm ${active ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white"}`}>
                  <p className="font-semibold text-slate-800">{stage}</p>
                  <p className="mt-1 text-xs text-slate-600">{active ? "In Progress" : "Tracked"}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card title="Upload Documents"><button className="w-full rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white">Upload Document</button></Card>
          <Card title="Pending Documents"><p className="text-sm text-slate-700">Signed Mortgage, Updated Income Evidence</p></Card>
          <Card title="Risk Status"><StatusBadge label={current.riskLevel} tone={current.riskLevel === "High" ? "red" : current.riskLevel === "Medium" ? "amber" : "green"} /></Card>
          <Card title="Support Required"><p className="text-sm text-slate-700">{current.riskReason}</p></Card>
        </section>
      </div>
    );
  }

  if (role === "Broker") {
    return (
      <div className="space-y-6">
        <Card title="Broker Mapping (Mock Logic)">
          <p className="text-sm text-slate-700 mb-3">{brokerMapping.brokerId} is mapped to 2-3 borrowers for demo.</p>
          <div className="flex flex-wrap gap-2">
            {brokerMapping.borrowers.map((name) => (
              <span key={name} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{name}</span>
            ))}
          </div>
        </Card>
        <Card title="Broker Files">
          <p className="text-sm text-slate-700">Visible files: {visible.length} (assigned broker scope only).</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card title="Lender Journey View">
        <p className="text-sm text-slate-700">Lender has full visibility across all applications for presentation demo.</p>
      </Card>
      <Card title="Total Visible Applications">
        <p className="text-3xl font-bold text-slate-900">{data.settlements.length}</p>
      </Card>
    </div>
  );
}
