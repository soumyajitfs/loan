import { SettlementItem } from "@/types/settlement";

export type TrafficLightState = "GREEN" | "AMBER" | "RED";

export function getTrafficLightState(application: SettlementItem): TrafficLightState {
  const docsComplete = (application.borrowerDocumentCompletion ?? 0) === 100;
  const allConditionsCleared = (application.brokerConditionsCleared ?? 0) >= (application.brokerConditionsTotal ?? 0);
  const compliancePassed = application.complianceGateStatus === "Passed";
  const workspaceCreated = application.pexaWorkspaceStatus === "Created" || application.pexaWorkspaceStatus === "Ready";
  const settlementNear = application.daysToSettlement <= 2;

  const hasRedBlocker =
    application.criticalDocumentMissing ||
    application.complianceGateStatus === "Failed" ||
    application.kycStatus === "Failed" ||
    (application.pexaWorkspaceStatus === "Not Created" && settlementNear);

  if (hasRedBlocker) {
    return "RED";
  }

  if (docsComplete && allConditionsCleared && compliancePassed && workspaceCreated) {
    return "GREEN";
  }

  return "AMBER";
}

export function trafficLightTone(state: TrafficLightState): "green" | "amber" | "red" {
  if (state === "GREEN") return "green";
  if (state === "AMBER") return "amber";
  return "red";
}
