"use client";

import roles from "@/data/roles.json";
import { roleRoutes, useMockAuth } from "@/lib/mock-auth";
import { AppRole } from "@/types/settlement";
import { useRouter } from "next/navigation";

interface RoleSwitcherProps {
  compact?: boolean;
}

export default function RoleSwitcher({ compact = false }: RoleSwitcherProps) {
  const { role, setRole } = useMockAuth();
  const router = useRouter();

  const handleRoleChange = (value: string) => {
    const nextRole = value as AppRole;
    setRole(nextRole);
    router.push(roleRoutes[nextRole]);
  };

  return (
    <div className="flex items-center gap-2">
      {!compact && <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Role</span>}
      <select
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-teal-600 transition focus:ring-2"
        value={role}
        onChange={(event) => handleRoleChange(event.target.value)}
      >
        {roles.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
