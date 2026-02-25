import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RoleProviderClient from "@/components/RoleProviderClient";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Unified Digital Settlement Control Tower",
  description: "Enterprise settlement orchestration prototype for Australian non-bank lending operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-slate-100 text-slate-900 antialiased`}>
        <RoleProviderClient>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex min-h-screen flex-1 flex-col">
              <Header />
              <main className="flex-1 p-6">{children}</main>
            </div>
          </div>
        </RoleProviderClient>
      </body>
    </html>
  );
}
