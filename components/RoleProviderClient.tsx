"use client";

import { RoleProvider } from "@/lib/role-context";

export default function RoleProviderClient({ children }: { children: React.ReactNode }) {
  return <RoleProvider>{children}</RoleProvider>;
}
