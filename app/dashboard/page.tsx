"use client";

import { roleRoutes, useMockAuth } from "@/lib/mock-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { role } = useMockAuth();
  const router = useRouter();

  useEffect(() => {
    router.replace(roleRoutes[role]);
  }, [role, router]);

  return <div className="text-sm text-slate-500">Routing to your role dashboard...</div>;
}
