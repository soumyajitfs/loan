"use client";

import RoleSwitcher from "@/components/RoleSwitcher";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Control Tower", href: "/control-tower" },
  { label: "Borrower Journey", href: "/stakeholder-journey" },
  { label: "Settlements", href: "/settlements" },
  { label: "Broker View", href: "/broker" },
  { label: "Lender View", href: "/lender" },
  { label: "PEXA Automation", href: "/pexa" },
  { label: "Validation Engine", href: "/validation" },
  { label: "Compliance", href: "/compliance" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 flex h-screen w-72 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-[#0f172a] px-5 py-6">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-teal-300">Control Tower</p>
        <h2 className="mt-2 text-lg font-semibold text-white">Settlement Operations</h2>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                active ? "bg-teal-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="rounded-lg bg-slate-900 p-3">
        <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">View as</p>
        <RoleSwitcher />
      </div>

    </aside>
  );
}
