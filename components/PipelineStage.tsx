import Card from "@/components/Card";
import RiskIndicator from "@/components/RiskIndicator";
import { RiskTone } from "@/types/settlement";

interface PipelineStageProps {
  name: string;
  stageCount: number;
  stagePercentage: number;
  stageRiskLevel: RiskTone;
  stageTrendDelta: number;
  isActive: boolean;
  onClick: () => void;
}

export default function PipelineStage({
  name,
  stageCount,
  stagePercentage,
  stageRiskLevel,
  stageTrendDelta,
  isActive,
  onClick,
}: PipelineStageProps) {
  const trendUp = stageTrendDelta > 0;
  const trendText = `${trendUp ? "+" : ""}${stageTrendDelta}% vs 7d`;

  return (
    <button className="min-w-[170px] flex-1 text-left" onClick={onClick}>
      <Card className={`h-full border-l-4 ${isActive ? "border-l-teal-600 ring-2 ring-teal-100" : "border-l-slate-200"}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{name}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900">{stageCount}</p>
        <p className="text-sm text-slate-600">{stagePercentage}% of pipeline</p>
        <div className="mt-3 flex items-center justify-between">
          <RiskIndicator tone={stageRiskLevel} label={`Risk: ${stageRiskLevel}`} />
          <span className={`text-xs font-semibold ${trendUp ? "text-red-600" : "text-emerald-600"}`}>
            {trendUp ? "↑" : "↓"} {trendText}
          </span>
        </div>
      </Card>
    </button>
  );
}
