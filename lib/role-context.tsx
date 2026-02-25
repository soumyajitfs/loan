"use client";

import { UserRole } from "@/types/settlement";
import { createContext, useContext, useMemo, useState } from "react";

interface RoleContextValue {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("Lender");
  const value = useMemo(() => ({ role, setRole }), [role]);
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within RoleProvider");
  }
  return context;
}
