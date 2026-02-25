"use client";

import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import KPI from "@/components/KPI";
import PipelineStage from "@/components/PipelineStage";
import ReadinessCard from "@/components/ReadinessCard";
import settlementsData from "@/data/settlements.json";
import { getStageRiskFromDelayedRate, normalizeStage } from "@/lib/analytics";
import { getTrafficLightState } from "@/lib/control-tower";
import { SettlementDataset } from "@/types/settlement";
import Link from "next/link";
import { useMemo, useState } from "react";

const data = settlementsData as SettlementDataset;

const pipelineLabels = [
  { key: "readiness", label: "Readiness" },
  { key: "documents", label: "Documents" },
  { key: "pexaPreparation", label: "PEXA" },
  { key: "validation", label: "Validation" },
  { key: "execution", label: "Execution" },
  { key: "handover", label: "Handover" },
] as const;

export default function LenderPage() {
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const [fundingRef, setFundingRef] = useState("FND-88231");
  const [fundingAmount, setFundingAmount] = useState("1,250,000");

  const derivedPipeline = useMemo(
    () =>
      pipelineLabels.map((stage) => {
        const raw = data.pipeline[stage.key];
        return {
          key: stage.key,
          label: stage.label,
          stageCount: raw.count,
          stagePercentage: raw.percentage,
          stageRiskLevel: getStageRiskFromDelayedRate(raw.delayedPercentage),
          stageTrendDelta: raw.trendDelta,
        };
      }),
    []
  );

  const visibleApplications = useMemo(() => {
    if (!stageFilter) return data.settlements;
    return data.settlements.filter((item) => normalizeStage(item.currentStage) === stageFilter);
  }, [stageFilter]);

  const trafficSummary = useMemo(() => {
    const total = data.settlements.length || 1;
    const green = data.settlements.filter((item) => getTrafficLightState(item) === "GREEN").length;
    const amber = data.settlements.filter((item) => getTrafficLightState(item) === "AMBER").length;
    const red = data.settlements.filter((item) => getTrafficLightState(item) === "RED").length;
    return {
      green,
      amber,
      red,
      readinessPercent: Math.round((green / total) * 100),
    };
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KPI label="Portfolio Loans" value={String(data.settlements.length)} trend="Enterprise visibility enabled" trendTone="positive" />
        <KPI label="Ready (Green)" value={String(trafficSummary.green)} trend="All readiness gates passed" trendTone="positive" />
        <KPI label="At Risk (Amber)" value={String(trafficSummary.amber)} trend="Minor blockers under watch" trendTone="neutral" />
        <KPI label="Blocked (Red)" value={String(trafficSummary.red)} trend="Critical blockers active" trendTone="negative" />
      </section>

      <Card
        title="Settlement Readiness Control Tower"
        subtitle="Unified real-time readiness view across borrower, broker, compliance, and PEXA"
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleApplications.map((item) => (
            <ReadinessCard
              key={item.loanId}
              loanId={item.loanId}
              borrowerName={item.borrowerName}
              borrowerDocumentCompletion={item.borrowerDocumentCompletion ?? 0}
              brokerConditionsCleared={item.brokerConditionsCleared ?? 0}
              brokerConditionsTotal={item.brokerConditionsTotal ?? 0}
              complianceStatus={item.complianceGateStatus ?? "Pending"}
              pexaWorkspaceStatus={item.pexaWorkspaceStatus ?? "Not Created"}
              trafficLight={getTrafficLightState(item)}
            />
          ))}
        </div>
      </Card>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card title="Loan Review Panel" subtitle="Enterprise review queue across all borrowers and brokers" className="xl:col-span-2">
          <DataTable rows={data.settlements} stageFilter={stageFilter} />
        </Card>
        <div className="space-y-6">
          <Card title="Funding Details Entry">
            <div className="space-y-3 text-sm">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Funding Reference</span>
                <input
                  value={fundingRef}
                  onChange={(event) => setFundingRef(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Funding Amount (AUD)</span>
                <input
                  value={fundingAmount}
                  onChange={(event) => setFundingAmount(event.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none ring-teal-600 focus:ring-2"
                />
              </label>
              <button className="w-full rounded-md bg-teal-600 px-3 py-2 font-semibold text-white">Save Funding Details</button>
            </div>
          </Card>
          <Card title="Settlement Readiness Confirmation">
            <p className="text-sm text-slate-700">
              {trafficSummary.readinessPercent}% of applications meet readiness threshold. Confirm release batch for green-state files.
            </p>
            <button className="mt-3 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
              Confirm Readiness Batch
            </button>
          </Card>
          <Card title="Validation Engine Access">
            <p className="text-sm text-slate-700">Lender validation access enabled for policy and exception review.</p>
            <Link
              href="/validation"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white"
            >
              Open Validation Engine
            </Link>
          </Card>
        </div>
      </section>

      <Card title="Global 6-Stage Pipeline View" subtitle="Click a stage to filter lender review table">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
          <button
            onClick={() => setStageFilter(null)}
            className={`rounded-full px-3 py-1.5 font-semibold ${stageFilter ? "bg-slate-100 text-slate-700" : "bg-teal-600 text-white"}`}
          >
            All Stages
          </button>
          {stageFilter && <span className="rounded-full bg-teal-50 px-3 py-1.5 font-semibold text-teal-700">Filtered: {stageFilter}</span>}
        </div>
        <div className="flex flex-wrap items-stretch gap-2 xl:gap-3">
          {derivedPipeline.map((item, index) => (
            <div key={item.key} className="flex min-w-[180px] flex-1 items-center gap-2">
              <PipelineStage
                name={item.label}
                stageCount={item.stageCount}
                stagePercentage={item.stagePercentage}
                stageRiskLevel={item.stageRiskLevel}
                stageTrendDelta={item.stageTrendDelta}
                isActive={stageFilter === item.label}
                onClick={() => setStageFilter((prev) => (prev === item.label ? null : item.label))}
              />
              {index < derivedPipeline.length - 1 && <span className="hidden text-slate-300 xl:inline">→</span>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
