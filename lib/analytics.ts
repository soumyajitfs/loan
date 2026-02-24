import { RiskTone, SettlementItem } from "@/types/settlement";

export function getStageRiskFromDelayedRate(delayedPercentage: number): RiskTone {
  if (delayedPercentage > 25) return "red";
  if (delayedPercentage >= 10) return "amber";
  return "green";
}

export function calculatePredictiveDelayRisk(item: SettlementItem): number {
  let score = 0;

  if (item.missingDocuments) score += 20;
  if ((item.daysInPexa ?? 0) > 3) score += 15;
  if (item.validationFailedOnce) score += 25;
  if (item.daysToSettlement <= 2 && item.readinessScore < 85) score += 30;
  if (item.historicalDelayPattern) score += 10;

  return Math.min(100, score);
}

export function getPredictiveRiskBand(score: number): { label: "Low" | "Medium" | "High"; tone: "green" | "amber" | "red" } {
  if (score <= 40) return { label: "Low", tone: "green" };
  if (score <= 70) return { label: "Medium", tone: "amber" };
  return { label: "High", tone: "red" };
}

export function normalizeStage(stage: string): string {
  const value = stage.trim().toLowerCase();
  if (value.includes("pexa")) return "PEXA";
  if (value.includes("document")) return "Documents";
  if (value.includes("readiness")) return "Readiness";
  if (value.includes("validation")) return "Validation";
  if (value.includes("execution")) return "Execution";
  if (value.includes("handover")) return "Handover";
  return stage;
}
