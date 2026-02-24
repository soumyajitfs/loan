interface CircularGaugeProps {
  value: number;
  label: string;
}

export default function CircularGauge({ value, label }: CircularGaugeProps) {
  const safeValue = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (safeValue / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" stroke="#e2e8f0" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="#0f766e"
            strokeWidth="10"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{safeValue}%</span>
        </div>
      </div>
      <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}
