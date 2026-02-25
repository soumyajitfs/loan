import Card from "@/components/Card";
import StatusBadge from "@/components/StatusBadge";
import { TrafficLightState, trafficLightTone } from "@/lib/control-tower";

interface ReadinessCardProps {
  loanId: string;
  borrowerName: string;
  borrowerDocumentCompletion: number;
  brokerConditionsCleared: number;
  brokerConditionsTotal: number;
  complianceStatus: "Pending" | "Passed" | "Failed";
  pexaWorkspaceStatus: "Not Created" | "Created" | "Ready";
  trafficLight: TrafficLightState;
}

export default function ReadinessCard({
  loanId,
  borrowerName,
  borrowerDocumentCompletion,
  brokerConditionsCleared,
  brokerConditionsTotal,
  complianceStatus,
  pexaWorkspaceStatus,
  trafficLight,
}: ReadinessCardProps) {
  const trafficLabel =
    trafficLight === "GREEN" ? "Ready" : trafficLight === "AMBER" ? "At Risk" : "Blocked";

  return (
    <Card title={loanId} subtitle={borrowerName} className={`border-l-4 ${
      trafficLight === "GREEN" ? "border-l-emerald-500" : trafficLight === "AMBER" ? "border-l-amber-500" : "border-l-red-500"
    }`}>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Borrower Docs</span>
          <span className="font-semibold text-slate-900">{borrowerDocumentCompletion}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Broker Conditions</span>
          <span className="font-semibold text-slate-900">{brokerConditionsCleared}/{brokerConditionsTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">Compliance</span>
          <StatusBadge label={complianceStatus} tone={complianceStatus === "Passed" ? "green" : complianceStatus === "Pending" ? "amber" : "red"} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-600">PEXA Workspace</span>
          <StatusBadge label={pexaWorkspaceStatus} tone={pexaWorkspaceStatus === "Ready" ? "green" : pexaWorkspaceStatus === "Created" ? "teal" : "amber"} />
        </div>
        <div className="pt-1">
          <StatusBadge label={`${trafficLight} · ${trafficLabel}`} tone={trafficLightTone(trafficLight)} />
        </div>
      </div>
    </Card>
  );
}
