"use client";

import { AppRole } from "@/types/settlement";
import { createContext, useContext, useMemo, useState } from "react";

interface MockAuthContextValue {
  role: AppRole;
  setRole: (role: AppRole) => void;
}

const MockAuthContext = createContext<MockAuthContextValue | undefined>(undefined);

export const roleRoutes: Record<AppRole, string> = {
  borrower: "/borrower",
  broker: "/broker",
  lender: "/lender",
  pexa: "/pexa",
  compliance: "/compliance",
};

const defaultRole: AppRole = "lender";

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<AppRole>(defaultRole);
  const value = useMemo(() => ({ role, setRole }), [role]);
  return <MockAuthContext.Provider value={value}>{children}</MockAuthContext.Provider>;
}

export function useMockAuth() {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error("useMockAuth must be used within MockAuthProvider");
  }
  return context;
}
