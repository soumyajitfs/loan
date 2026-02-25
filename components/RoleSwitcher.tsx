"use client";

import roles from "@/data/roles.json";
import { UserRole } from "@/types/settlement";
import { useState } from "react";

interface RoleSwitcherProps {
  compact?: boolean;
}

export default function RoleSwitcher({ compact = false }: RoleSwitcherProps) {
  const [role, setRole] = useState<UserRole>(roles[0] as UserRole);

  return (
    <div className="flex items-center gap-2">
      {!compact && <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Role</span>}
      <select
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-teal-600 transition focus:ring-2"
        value={role}
        onChange={(event) => setRole(event.target.value as UserRole)}
      >
        {roles.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
