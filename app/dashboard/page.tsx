"use client";

import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import KPI from "@/components/KPI";
import PipelineStage from "@/components/PipelineStage";
import settlementsData from "@/data/settlements.json";
import { getStageRiskFromDelayedRate } from "@/lib/analytics";
import { SettlementDataset } from "@/types/settlement";
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

export default function DashboardPage() {
  const [stageFilter, setStageFilter] = useState<string | null>(null);

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

  const manualRate = data.compliance.manualInterventionRate;
  const autoRate = 100 - manualRate;
  const donutStyle = `conic-gradient(#0f766e 0% ${autoRate}%, #e2e8f0 ${autoRate}% 100%)`;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <KPI label="Total Loans" value={String(data.kpis.totalSettlementsThisWeek)} trend="Portfolio in scope" trendTone="positive" />
        <KPI label="At Risk" value={String(data.kpis.settlementsAtRisk)} trend="+2 from yesterday" trendTone="negative" />
        <KPI label="Average Delays (Days)" value={`${data.kpis.averageTimeToSettlementDays}d`} trend="-0.6d week over week" trendTone="positive" />
        <KPI label="SLA Breach %" value={`${data.kpis.slaBreachPercentage}%`} trend="-1.1pp trend" trendTone="positive" />
        <KPI label="PEXA Automation %" value={`${data.kpis.pexaAutoCreationRate}%`} trend="105 auto-created workspaces" trendTone="positive" />
        <KPI label="Compliance Exceptions" value={String(data.kpis.complianceExceptions)} trend="Same as last week" trendTone="neutral" />
      </section>

      <Card title="6-Stage Settlement Pipeline" subtitle="Connected stage flow with volume, risk, trend, and one-click filtering">
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

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="Compliance Intelligence Panel" subtitle="Compliance automation and intervention telemetry" className="xl:col-span-1">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Audit Trail Auto-Generated</span>
              <span className="font-semibold text-emerald-700">{data.compliance.autoAuditPercent}%</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Auto Archived</span>
              <span className="font-semibold text-emerald-700">{data.compliance.autoArchivePercent}%</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2">
              <span>Exception Count</span>
              <span className="font-semibold text-red-700">{data.compliance.complianceExceptionCount}</span>
            </div>
            <div className="rounded-md bg-slate-50 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Manual vs Auto Split</p>
              <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full" style={{ background: donutStyle }} />
                <div className="text-xs text-slate-600">
                  <p>Auto: {autoRate}%</p>
                  <p>Manual: {manualRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Analytical Friction Heatmap" subtitle="Impact %, trend movement, and dominant root cause by stage" className="xl:col-span-2">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {data.friction.map((item) => (
              <div key={item.stage} className="rounded-lg border border-slate-200 p-3 text-sm">
                <p className="font-semibold text-slate-900">{item.stage}</p>
                <p className="mt-1 text-slate-700">{item.impactedPercent}% impacted</p>
                <p className={`mt-1 font-medium ${item.trendDelta > 0 ? "text-red-600" : "text-emerald-600"}`}>
                  {item.trendDelta > 0 ? "↑" : "↓"} {Math.abs(item.trendDelta)}% vs last week
                </p>
                <p className="mt-1 text-xs text-slate-600">Top cause: {item.topRootCause}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card title="At-Risk Settlements Table" subtitle="Sortable and filterable operating queue with predictive delay intelligence" className="xl:col-span-3">
          <DataTable rows={data.settlements} stageFilter={stageFilter} />
        </Card>
      </div>

      <Card title="Pipeline Risk Logic" subtitle="Green <10%, Amber 10-25%, Red >25% delayed cases">
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700">Green: &lt;10% delayed</span>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 font-semibold text-amber-700">Amber: 10-25% delayed</span>
          <span className="rounded-full bg-red-50 px-2.5 py-1 font-semibold text-red-700">Red: &gt;25% delayed</span>
        </div>
      </Card>
    </div>
  );
}
