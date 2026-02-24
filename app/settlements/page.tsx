import Card from "@/components/Card";
import DataTable from "@/components/DataTable";
import settlementsData from "@/data/settlements.json";
import { SettlementDataset } from "@/types/settlement";

const data = settlementsData as SettlementDataset;

export default function SettlementsPage() {
  return (
    <div className="space-y-6">
      <Card title="Settlement Operations Queue" subtitle="Unified list for operations triage and escalation">
        <DataTable rows={data.settlements} />
      </Card>
    </div>
  );
}
