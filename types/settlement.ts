export type RiskTone = "green" | "amber" | "red";
export type RiskLevel = "Low" | "Medium" | "High";

export interface KPIData {
  totalSettlementsThisWeek: number;
  settlementsAtRisk: number;
  averageTimeToSettlementDays: number;
  slaBreachPercentage: number;
  pexaAutoCreationRate: number;
  complianceExceptions: number;
}

export interface PipelineStageData {
  count: number;
  percentage: number;
  risk: RiskTone;
  delayedPercentage: number;
  trendDelta: number;
}

export interface PipelineData {
  readiness: PipelineStageData;
  documents: PipelineStageData;
  pexaPreparation: PipelineStageData;
  validation: PipelineStageData;
  execution: PipelineStageData;
  handover: PipelineStageData;
}

export interface SettlementItem {
  loanId: string;
  borrowerName: string;
  brokerName: string;
  settlementDate: string;
  daysToSettlement: number;
  currentStage: string;
  readinessScore: number;
  riskScore: number;
  riskLevel: RiskLevel;
  riskReason: string;
  slaDeadline: string;
  missingDocuments?: boolean;
  daysInPexa?: number;
  validationFailedOnce?: boolean;
  historicalDelayPattern?: boolean;
}

export interface ComplianceData {
  autoAuditPercent: number;
  autoArchivePercent: number;
  complianceExceptionCount: number;
  manualInterventionRate: number;
}

export interface FrictionItem {
  stage: string;
  impactedPercent: number;
  trendDelta: number;
  topRootCause: string;
}

export interface SettlementDataset {
  kpis: KPIData;
  pipeline: PipelineData;
  compliance: ComplianceData;
  friction: FrictionItem[];
  settlements: SettlementItem[];
}

export type UserRole =
  | "COO"
  | "Head of Operations"
  | "Compliance Leader"
  | "Broker Manager";
