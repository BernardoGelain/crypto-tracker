import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoinDetails from "@/components/coin-details/coin-details";
import { ThemeToggle } from "@/components/theme-togle/theme-toggle";

interface PageProps {
  params: {
    id: string;
  };
}

export default function CoinPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to List
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">Cryptocurrency Details</h1>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-8">Loading coin details...</div>}>
          <CoinDetails coinId={params.id} />
        </Suspense>
      </main>
    </div>
  );
}
