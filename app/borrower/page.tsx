"use client";

import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import settlementsData from "@/data/settlements.json";
import { filterSettlementsByRole } from "@/lib/role-access";
import { useRole } from "@/lib/role-context";
import { SettlementDataset } from "@/types/settlement";
import { useMemo } from "react";

const data = settlementsData as SettlementDataset;

const tracker = ["Readiness", "Documents", "Validation", "Execution", "Handover"] as const;

export default function BorrowerPage() {
  const { role } = useRole();
  const myApplications = useMemo(() => filterSettlementsByRole(role, data.settlements), [role]);
  const currentApplication = myApplications[0];

  if (!currentApplication) {
    return (
      <Card title="Borrower Dashboard">
        <p className="text-sm text-slate-700">No applications available for the selected role profile.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-6 xl:grid-cols-3">
        <Card title="Application Submitted">
          <p className="text-3xl font-bold text-slate-900">Yes</p>
          <p className="mt-2 text-sm text-slate-600">Your latest application has been submitted and is under review.</p>
        </Card>
        <Card title="Current Application Status">
          <p className="text-lg font-semibold text-slate-900">{currentApplication.loanId}</p>
          <p className="mt-2 text-sm text-slate-700">Current stage: {currentApplication.currentStage}</p>
          <p className="text-sm text-slate-700">Days to settlement: {currentApplication.daysToSettlement}</p>
        </Card>
        <Card title="Create New Application">
          <p className="mb-3 text-sm text-slate-700">Start a new home loan application with guided document requirements.</p>
          <button className="w-full rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white">Create Application</button>
        </Card>
      </section>

      <Card title="Application Status Tracker" subtitle="Readiness to handover journey for your current file">
        <div className="grid gap-3 md:grid-cols-5">
          {tracker.map((stage) => {
            const active = stage.toLowerCase() === currentApplication.currentStage.toLowerCase();
            const complete = tracker.indexOf(stage) < tracker.findIndex((item) => item.toLowerCase() === currentApplication.currentStage.toLowerCase());
            return (
              <div key={stage} className={`rounded-lg border p-3 text-sm ${active ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white"}`}>
                <p className="font-semibold text-slate-800">{stage}</p>
                <p className="mt-1 text-xs text-slate-600">{complete ? "Completed" : active ? "In Progress" : "Pending"}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Pending Documents">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-md bg-slate-50 px-3 py-2">Signed Mortgage Document</li>
            <li className="rounded-md bg-slate-50 px-3 py-2">Updated Income Evidence</li>
          </ul>
        </Card>
        <Card title="Support Required">
          <p className="text-sm text-slate-700">Please upload the missing signed mortgage document to avoid settlement delays.</p>
        </Card>
        <Card title="Risk Alerts">
          <div className="space-y-2">
            <StatusBadge label="Document Gap Alert" tone="amber" />
            <p className="text-sm text-slate-700">Risk exposure elevated until pending documents are submitted.</p>
          </div>
        </Card>
      </section>

      <Card title="My Applications">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Loan ID</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Settlement Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myApplications.map((app) => (
                <tr key={app.loanId}>
                  <td className="px-4 py-3 font-semibold text-slate-900">{app.loanId}</td>
                  <td className="px-4 py-3 text-slate-700">{app.currentStage}</td>
                  <td className="px-4 py-3 text-slate-700">{app.riskLevel}</td>
                  <td className="px-4 py-3 text-slate-700">{app.settlementDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
