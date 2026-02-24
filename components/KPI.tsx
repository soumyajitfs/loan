import Card from "@/components/Card";

interface KPIProps {
  label: string;
  value: string;
  trend: string;
  trendTone?: "positive" | "neutral" | "negative";
}

const trendStyle: Record<NonNullable<KPIProps["trendTone"]>, string> = {
  positive: "text-emerald-600",
  neutral: "text-slate-500",
  negative: "text-red-600",
};

export default function KPI({ label, value, trend, trendTone = "neutral" }: KPIProps) {
  return (
    <Card className="h-full">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
      <p className={`mt-2 text-xs font-medium ${trendStyle[trendTone]}`}>{trend}</p>
    </Card>
  );
}
