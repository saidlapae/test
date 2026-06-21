import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = { title: "SPK Kopi Terbaik" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className="h-screen bg-primary-deep text-neutral-200 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-primary-deep via-primary to-primary-dark">
            <div className="max-w-7xl mx-auto animate-fade-in">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
