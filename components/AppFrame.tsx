"use client";

import Header from "@/components/Header";
import RoleRouteGuard from "@/components/RoleRouteGuard";
import Sidebar from "@/components/Sidebar";
import { MockAuthProvider } from "@/lib/mock-auth";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Header />
          <main className="flex-1 p-6">
            <RoleRouteGuard>{children}</RoleRouteGuard>
          </main>
        </div>
      </div>
    </MockAuthProvider>
  );
}
