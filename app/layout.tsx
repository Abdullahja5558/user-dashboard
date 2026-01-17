import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Home/Sidebar";

export const metadata: Metadata = {
  title: "Bucceo Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#F8FAFC] antialiased">
        {/* Sidebar remains constant */}
        <Sidebar />
        
        {/* Page content changes here */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}