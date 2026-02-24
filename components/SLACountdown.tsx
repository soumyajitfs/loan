"use client";

import { useEffect, useMemo, useState } from "react";

interface SLACountdownProps {
  deadline: string;
}

const initialNow = Date.now();

function formatRemaining(ms: number) {
  if (ms <= 0) return "Overdue";
  const totalMinutes = Math.floor(ms / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;
  return `${days}d ${hours}h ${minutes}m`;
}

export default function SLACountdown({ deadline }: SLACountdownProps) {
  const [now, setNow] = useState(initialNow);
  const deadlineMs = useMemo(() => new Date(deadline).getTime(), [deadline]);
  const remaining = deadlineMs - now;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const toneClass = remaining <= 0 ? "text-red-600" : remaining < 12 * 60 * 60 * 1000 ? "text-amber-600" : "text-slate-700";

  return <span className={`text-sm font-semibold ${toneClass}`}>{formatRemaining(remaining)}</span>;
}
