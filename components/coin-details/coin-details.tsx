"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown, Globe } from "lucide-react";
import PriceChart from "../price-chart/price-chart";
import { useCoinDetails } from "./hooks/api/useCoinDetails";

interface CoinDetailsProps {
  coinId: string;
}

export default function CoinDetails({ coinId }: CoinDetailsProps) {
  const { data: coin, isLoading: loading, error } = useCoinDetails(coinId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
    }).format(num);
  };

  const formatSupply = (supply: number) => {
    return new Intl.NumberFormat("en-US").format(supply);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-32" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-80 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error?.message || "Coin not found"}. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  const priceChangeColor = (change: number) => {
    return change >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Coin Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src={coin.image.large || "/placeholder.svg"} alt={coin.name} width={64} height={64} className="rounded-full" />
              <div>
                <h1 className="text-3xl font-bold">{coin.name}</h1>
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-muted-foreground uppercase">{coin.symbol}</span>
                  <Badge variant="secondary">#{coin.market_cap_rank}</Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-3xl font-bold">{formatPrice(coin.market_data.current_price.usd)}</div>
              <div className={`flex items-center justify-end space-x-1 ${priceChangeColor(coin.market_data.price_change_percentage_24h)}`}>
                {coin.market_data.price_change_percentage_24h >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="font-medium">{coin.market_data.price_change_percentage_24h.toFixed(2)}% (24h)</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Market Cap</h3>
              <p className="text-xl font-semibold">{formatPrice(coin.market_data.market_cap.usd)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">24h Volume</h3>
              <p className="text-xl font-semibold">{formatPrice(coin.market_data.total_volume.usd)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">7d Change</h3>
              <p className={`text-xl font-semibold ${priceChangeColor(coin.market_data.price_change_percentage_7d)}`}>
                {coin.market_data.price_change_percentage_7d.toFixed(2)}%
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">30d Change</h3>
              <p className={`text-xl font-semibold ${priceChangeColor(coin.market_data.price_change_percentage_30d)}`}>
                {coin.market_data.price_change_percentage_30d.toFixed(2)}%
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Circulating Supply</h3>
              <p className="text-lg font-semibold">
                {formatSupply(coin.market_data.circulating_supply)} {coin.symbol.toUpperCase()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Supply</h3>
              <p className="text-lg font-semibold">
                {coin.market_data.total_supply ? formatSupply(coin.market_data.total_supply) : "N/A"} {coin.symbol.toUpperCase()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Max Supply</h3>
              <p className="text-lg font-semibold">
                {coin.market_data.max_supply ? formatSupply(coin.market_data.max_supply) : "N/A"} {coin.symbol.toUpperCase()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Links</h3>
              <div className="flex space-x-2">
                {coin.links.homepage[0] && (
                  <a
                    href={coin.links.homepage[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Website
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price Chart (7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <PriceChart coinId={coinId} />
        </CardContent>
      </Card>

      {/* Description */}
      {coin.description.en && (
        <Card>
          <CardHeader>
            <CardTitle>About {coin.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{
                __html: coin.description.en.split(". ").slice(0, 3).join(". ") + ".",
              }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
