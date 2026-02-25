"use client";

import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import settlementsData from "@/data/settlements.json";
import Link from "next/link";
import { useMemo, useState } from "react";

interface BrokerApplication {
  loanId: string;
  borrowerName: string;
  brokerName: string;
  currentStage: string;
  readinessScore: number;
  riskLevel: string;
  missingDocuments?: boolean;
  validationFailedOnce?: boolean;
}

const assignedApps = settlementsData.settlements as BrokerApplication[];

export default function BrokerPage() {
  const groupedByCustomer = useMemo(() => {
    return assignedApps.reduce<Record<string, BrokerApplication[]>>((acc, item) => {
      if (!acc[item.borrowerName]) {
        acc[item.borrowerName] = [];
      }
      acc[item.borrowerName].push(item);
      return acc;
    }, {});
  }, []);

  const customers = Object.keys(groupedByCustomer);
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0] ?? "");
  const selectedApps = groupedByCustomer[selectedCustomer] ?? [];

  const totalRequiredDocs = assignedApps.length * 6;
  const submittedDocs = assignedApps.reduce((sum, item) => sum + (item.missingDocuments ? 4 : 6), 0);
  const compliancePercent = Math.round((submittedDocs / totalRequiredDocs) * 100);
  const readiness = Math.round(assignedApps.reduce((sum, item) => sum + item.readinessScore, 0) / assignedApps.length);
  const riskFlags = assignedApps.filter((item) => item.riskLevel === "High" || item.validationFailedOnce).length;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <Card title="Assigned Customers"><p className="text-3xl font-bold text-slate-900">{customers.length}</p></Card>
        <Card title="Assigned Applications"><p className="text-3xl font-bold text-slate-900">{assignedApps.length}</p></Card>
        <Card title="Documents Submitted"><p className="text-3xl font-bold text-slate-900">{submittedDocs}/{totalRequiredDocs}</p></Card>
        <Card title="Compliance %"><p className="text-3xl font-bold text-slate-900">{compliancePercent}%</p></Card>
        <Card title="Settlement Readiness"><p className="text-3xl font-bold text-slate-900">{readiness}%</p></Card>
        <Card title="Risk Flags"><p className="text-3xl font-bold text-slate-900">{riskFlags}</p></Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card title="Customers" subtitle="Click a customer to drill into applications" className="xl:col-span-1">
          <div className="space-y-2">
            {customers.map((customer) => (
              <button
                key={customer}
                onClick={() => setSelectedCustomer(customer)}
                className={`w-full rounded-md border px-3 py-2 text-left text-sm ${
                  selectedCustomer === customer ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {customer}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Applications per Customer" subtitle={`Applications for ${selectedCustomer}`} className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Application</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Readiness</th>
                  <th className="px-4 py-3">Risk</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedApps.map((item) => (
                  <tr key={item.loanId}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{item.loanId}</td>
                    <td className="px-4 py-3 text-slate-700">{item.currentStage}</td>
                    <td className="px-4 py-3 text-slate-700">{item.readinessScore}%</td>
                    <td className="px-4 py-3">
                      <StatusBadge label={item.riskLevel} tone={item.riskLevel === "High" ? "red" : item.riskLevel === "Medium" ? "amber" : "green"} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/broker/application/${item.loanId}`} className="text-sm font-semibold text-teal-700 hover:underline">
                        Open Workflow Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Documents Required vs Submitted by Category">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>ID & VOI</span><span>8 / 8</span></li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Income Evidence</span><span>6 / 8</span></li>
            <li className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2"><span>Settlement Forms</span><span>5 / 8</span></li>
          </ul>
        </Card>
        <Card title="Compliance Status Tracking">
          <div className="space-y-2">
            <StatusBadge label="Signed Documents: 83%" tone="teal" />
            <StatusBadge label="Attested Files: 79%" tone="amber" />
          </div>
        </Card>
        <Card title="Party Involvement Tracking">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-md bg-slate-50 px-3 py-2">Borrower - Active</li>
            <li className="rounded-md bg-slate-50 px-3 py-2">Lender Ops - Active</li>
            <li className="rounded-md bg-slate-50 px-3 py-2">Conveyancer - Pending Confirmation</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
