interface StatusBadgeProps {
  label: string;
  tone: "green" | "amber" | "red" | "slate" | "teal";
}

const toneMap: Record<StatusBadgeProps["tone"], string> = {
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  red: "bg-red-50 text-red-700 border-red-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
  teal: "bg-teal-50 text-teal-700 border-teal-200",
};

export default function StatusBadge({ label, tone }: StatusBadgeProps) {
  return <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${toneMap[tone]}`}>{label}</span>;
}
