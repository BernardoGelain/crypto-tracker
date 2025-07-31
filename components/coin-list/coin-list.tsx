"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useCoins } from "./hooks/api/useCoins";

export default function CoinList() {
  const { data: coins, isLoading, isError, error } = useCoins();

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);

  const formatMarketCap = (marketCap: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(marketCap);

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton role="status" className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton role="status" className="h-4 w-[100px]" />
                  <Skeleton role="status" className="h-4 w-[60px]" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <Skeleton role="status" className="h-4 w-[80px]" />
                <Skeleton role="status" className="h-4 w-[120px]" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError || !coins) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{(error as Error)?.message || "Failed to load coins."} Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {coins.map((coin) => (
        <Link key={coin.id} href={`/coin/${coin.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image src={coin.image || "/placeholder.svg"} alt={coin.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <h3 className="font-semibold">{coin.name}</h3>
                    <p className="text-sm text-muted-foreground uppercase">{coin.symbol}</p>
                  </div>
                </div>
                <Badge variant="secondary">#{coin.market_cap_rank}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Price</span>
                  <span className="font-semibold">{formatPrice(coin.current_price)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">24h Change</span>
                  <div className={`flex items-center space-x-1 ${coin.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {coin.price_change_percentage_24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">{Math.abs(coin.price_change_percentage_24h).toFixed(2)}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Market Cap</span>
                  <span className="text-sm">{formatMarketCap(coin.market_cap)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
