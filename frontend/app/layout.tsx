import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/Sidebar";

export const metadata: Metadata = {
  title: "CoralOps AI — SRE Incident Investigation Agent",
  description: "Autonomous incident investigation. Root cause in seconds, not hours.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen overflow-hidden bg-canvas">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
