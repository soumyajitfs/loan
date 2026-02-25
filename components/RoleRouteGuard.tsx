"use client";

import { roleRoutes, useMockAuth } from "@/lib/mock-auth";
import { AppRole } from "@/types/settlement";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const allowedByPrefix: Array<{ prefix: string; roles: AppRole[] }> = [
  { prefix: "/borrower", roles: ["borrower"] },
  { prefix: "/broker", roles: ["broker"] },
  { prefix: "/lender", roles: ["lender"] },
  { prefix: "/pexa", roles: ["pexa"] },
  { prefix: "/compliance", roles: ["compliance"] },
  { prefix: "/validation", roles: ["compliance", "lender"] },
  { prefix: "/settlements", roles: ["borrower", "broker", "lender", "pexa", "compliance"] },
];

function isAllowed(pathname: string, role: AppRole) {
  const routeRule = allowedByPrefix.find((rule) => pathname.startsWith(rule.prefix));
  if (!routeRule) return true;
  return routeRule.roles.includes(role);
}

export default function RoleRouteGuard({ children }: { children: React.ReactNode }) {
  const { role } = useMockAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAllowed(pathname, role)) {
      router.replace(roleRoutes[role]);
    }
  }, [pathname, role, router]);

  if (!isAllowed(pathname, role)) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Redirecting to your authorized role dashboard...
      </div>
    );
  }

  return <>{children}</>;
}
