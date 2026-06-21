import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const workSans = Work_Sans({ subsets: ["latin"], variable: "--font-work-sans" });

export const metadata: Metadata = { title: "SPK Kopi Terbaik" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${workSans.variable}`}
    >
      <body className="flex h-screen flex-col overflow-hidden text-ink">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-5 sm:p-7 lg:p-10">
            <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
