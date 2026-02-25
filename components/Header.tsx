"use client";

import { usePathname } from "next/navigation";

const titleMap: Record<string, string> = {
  "/dashboard": "Unified Digital Settlement Control Tower",
  "/borrower": "Borrower Dashboard",
  "/settlements": "Settlement Workbench",
  "/broker": "Broker View",
  "/lender": "Lender Command Center",
  "/pexa": "PEXA Automation",
  "/validation": "Validation Engine",
  "/compliance": "Compliance",
};

export default function Header() {
  const pathname = usePathname();
  const titleMatch = Object.entries(titleMap).find(([route]) => pathname === route || pathname.startsWith(`${route}/`));
  const title = titleMatch?.[1] ?? "Unified Digital Settlement Control Tower";

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100" aria-label="Notifications">
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
            <path d="M15 18H9m9-1v-5a6 6 0 10-12 0v5l-2 2h16l-2-2z" />
          </svg>
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-white">RM</div>
      </div>
    </header>
  );
}
