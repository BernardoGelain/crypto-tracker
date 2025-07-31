import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ErrorBoundary from "@/components/error-boundary/error-boundary";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoTracker - Track Cryptocurrency Prices",
  description: "Track top cryptocurrencies, view detailed charts, and search for your favorite coins.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
