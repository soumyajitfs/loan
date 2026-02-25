"use client";

import SLACountdown from "@/components/SLACountdown";
import StatusBadge from "@/components/StatusBadge";
import { calculatePredictiveDelayRisk, getPredictiveRiskBand, normalizeStage } from "@/lib/analytics";
import { filterSettlementsByRole } from "@/lib/role-access";
import { useRole } from "@/lib/role-context";
import { SettlementItem } from "@/types/settlement";
import { useMemo, useState } from "react";

type SortKey = "loanId" | "borrowerName" | "brokerName" | "currentStage" | "riskLevel" | "daysToSettlement" | "predictedDelayRisk";
type RowSortKey = Exclude<SortKey, "predictedDelayRisk">;

interface DataTableProps {
  rows: SettlementItem[];
  stageFilter?: string | null;
}

export default function DataTable({ rows, stageFilter = null }: DataTableProps) {
  const { role } = useRole();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("daysToSettlement");
  const [ascending, setAscending] = useState(true);

  const visibleRows = useMemo(() => {
    const roleFiltered = filterSettlementsByRole(role, rows);
    const lowered = query.toLowerCase();
    const filtered = roleFiltered.filter((row) => {
      const searchMatch = [row.loanId, row.borrowerName, row.brokerName, row.currentStage, row.riskLevel]
        .join(" ")
        .toLowerCase()
        .includes(lowered);
      if (!searchMatch) return false;
      if (!stageFilter) return true;
      return normalizeStage(row.currentStage) === stageFilter;
    });
    const sorted = [...filtered].sort((a, b) => {
      if (sortKey === "predictedDelayRisk") {
        const firstScore = calculatePredictiveDelayRisk(a);
        const secondScore = calculatePredictiveDelayRisk(b);
        return ascending ? firstScore - secondScore : secondScore - firstScore;
      }
      const rowSortKey = sortKey as RowSortKey;
      const first = a[rowSortKey];
      const second = b[rowSortKey];
      if (typeof first === "number" && typeof second === "number") {
        return ascending ? first - second : second - first;
      }
      return ascending ? String(first).localeCompare(String(second)) : String(second).localeCompare(String(first));
    });
    return sorted;
  }, [ascending, query, role, rows, sortKey, stageFilter]);

  const setSort = (key: SortKey) => {
    if (key === sortKey) {
      setAscending((prev) => !prev);
      return;
    }
    setSortKey(key);
    setAscending(true);
  };

  const riskTone = (level: SettlementItem["riskLevel"]) => {
    if (level === "High") return "red";
    if (level === "Medium") return "amber";
    return "green";
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter by loan, borrower, broker, stage..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-teal-600 focus:ring-2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="border-y border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {[
                ["loanId", "Loan ID"],
                ["borrowerName", "Borrower"],
                ["brokerName", "Broker"],
                ["currentStage", "Stage"],
                ["riskLevel", "Risk Level"],
                ["daysToSettlement", "Days Left"],
                ["predictedDelayRisk", "Predicted Delay Risk"],
              ].map(([key, label]) => (
                <th key={key} className="cursor-pointer px-4 py-3 font-semibold" onClick={() => setSort(key as SortKey)}>
                  {label}
                </th>
              ))}
              <th className="px-4 py-3 font-semibold">SLA Countdown</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {visibleRows.map((row) => (
              <tr key={row.loanId} className="bg-white">
                <td className="px-4 py-3 font-semibold text-slate-900">{row.loanId}</td>
                <td className="px-4 py-3 text-slate-700">{row.borrowerName}</td>
                <td className="px-4 py-3 text-slate-700">{row.brokerName}</td>
                <td className="px-4 py-3 text-slate-700">{row.currentStage}</td>
                <td className="px-4 py-3">
                  <StatusBadge label={row.riskLevel} tone={riskTone(row.riskLevel)} />
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">{row.daysToSettlement}</td>
                <td className="px-4 py-3">
                  {(() => {
                    const score = calculatePredictiveDelayRisk(row);
                    const band = getPredictiveRiskBand(score);
                    const likelyMiss = score > 70;
                    return (
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            title="AI-generated risk prediction based on case friction patterns"
                            className="text-sm font-semibold text-slate-800"
                          >
                            {score}/100
                          </span>
                          <StatusBadge label={band.label} tone={band.tone} />
                        </div>
                        {likelyMiss && <p className="text-xs font-semibold text-red-600">⚠ Likely to Miss Settlement</p>}
                      </div>
                    );
                  })()}
                </td>
                <td className="px-4 py-3">
                  <SLACountdown deadline={row.slaDeadline} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
