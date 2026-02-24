import { RiskTone } from "@/types/settlement";

interface RiskIndicatorProps {
  tone: RiskTone;
  label?: string;
}

const toneMap: Record<RiskTone, string> = {
  green: "bg-emerald-500",
  amber: "bg-amber-500",
  red: "bg-red-500",
};

export default function RiskIndicator({ tone, label }: RiskIndicatorProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${toneMap[tone]}`} />
      {label && <span className="text-xs text-slate-600">{label}</span>}
    </div>
  );
}
