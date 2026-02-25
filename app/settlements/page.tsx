"use client";

import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import settlementsData from "@/data/settlements.json";
import { useMockAuth } from "@/lib/mock-auth";
import { SettlementDataset } from "@/types/settlement";
import { useMemo } from "react";

const data = settlementsData as SettlementDataset;

export default function SettlementsPage() {
  const { role } = useMockAuth();

  const visibleRows = useMemo(() => {
    if (role === "borrower") {
      return data.settlements.slice(0, 2);
    }
    if (role === "broker") {
      return data.settlements.filter((item) => item.brokerName === "Apex Finance Group");
    }
    return data.settlements;
  }, [role]);

  return (
    <div className="space-y-6">
      <Card title="Settlement Operations Queue" subtitle="Role-filtered list for triage, tracking, and escalation">
        <DataTable rows={visibleRows} />
      </Card>
    </div>
  );
}
