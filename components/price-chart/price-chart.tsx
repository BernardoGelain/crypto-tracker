"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useCoinChart } from "./hooks/api/useCoinChart";

interface PriceChartProps {
  coinId: string;
}

export default function PriceChart({ coinId }: PriceChartProps) {
  const { data: chartData, isLoading, isError } = useCoinChart(coinId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price);
  };

  if (isLoading) {
    return <Skeleton className="h-80 w-full" />;
  }

  if (isError || !chartData) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Failed to load chart data. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-xs" />
          <YAxis axisLine={false} tickLine={false} className="text-xs" tickFormatter={(value) => `$${value.toFixed(2)}`} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <div className="bg-background border rounded-lg p-3 shadow-lg">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-sm text-blue-600">Price: {formatPrice(payload[0].value as number)}</p>
                </div>
              ) : null
            }
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, stroke: "hsl(var(--primary))", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
