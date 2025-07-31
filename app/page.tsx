import { Suspense } from "react"
import CoinList from "@/components/coin-list"
import SearchBar from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">CryptoTracker</h1>
              <p className="text-muted-foreground">Track top cryptocurrencies in real-time</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <SearchBar />
          <div>
            <h2 className="text-2xl font-semibold mb-6">Top 20 Cryptocurrencies by Market Cap</h2>
            <Suspense fallback={<div className="text-center py-8">Loading cryptocurrencies...</div>}>
              <CoinList />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}
