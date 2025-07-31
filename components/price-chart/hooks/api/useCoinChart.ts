// hooks/useCoinChart.ts
import { useQuery } from "@tanstack/react-query";
import { ChartData } from "recharts/types/state/chartDataSlice";

const fetchChartData = async (coinId: string): Promise<ChartData[]> => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`);

  if (!res.ok) throw new Error("Failed to fetch chart data");

  const data = await res.json();

  return data.prices.map(([timestamp, price]: [number, number]) => ({
    date: new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price,
    timestamp,
  }));
};

export function useCoinChart(coinId: string) {
  return useQuery<ChartData[]>({
    queryKey: ["coin-chart", coinId],
    queryFn: () => fetchChartData(coinId),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}
