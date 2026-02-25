import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import settlementsData from "@/data/settlements.json";
import { notFound } from "next/navigation";

interface BrokerWorkflowDetailProps {
  params: Promise<{ loanId: string }>;
}

export default async function BrokerWorkflowDetailPage({ params }: BrokerWorkflowDetailProps) {
  const { loanId } = await params;
  const application = settlementsData.settlements.find((item) => item.loanId === loanId);

  if (!application) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Card title="Application Workflow Detail" subtitle={`Broker workflow detail for ${application.loanId}`}>
        <div className="grid gap-4 md:grid-cols-3 text-sm">
          <div><p className="text-slate-500">Borrower</p><p className="font-semibold text-slate-900">{application.borrowerName}</p></div>
          <div><p className="text-slate-500">Current Stage</p><p className="font-semibold text-slate-900">{application.currentStage}</p></div>
          <div><p className="text-slate-500">Risk</p><StatusBadge label={application.riskLevel} tone={application.riskLevel === "High" ? "red" : application.riskLevel === "Medium" ? "amber" : "green"} /></div>
        </div>
      </Card>

      <section className="grid gap-6 md:grid-cols-2">
        <Card title="Document Workflow">
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="rounded-md bg-slate-50 px-3 py-2">Mortgage Contract - Received</li>
            <li className="rounded-md bg-slate-50 px-3 py-2">Signed Mortgage - Pending</li>
            <li className="rounded-md bg-slate-50 px-3 py-2">VOI Pack - Complete</li>
          </ul>
        </Card>
        <Card title="Next Actions">
          <p className="text-sm text-slate-700">{application.riskReason}</p>
          <button className="mt-3 rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white">Mark Broker Follow-up Complete</button>
        </Card>
      </section>
    </div>
  );
}
