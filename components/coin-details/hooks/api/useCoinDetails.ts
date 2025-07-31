import { useQuery } from "@tanstack/react-query";
import { CoinDetail } from "../../types/CoinDetail";

const fetchCoinDetails = async (coinId: string): Promise<CoinDetail> => {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (!res.ok) throw new Error("Failed to fetch coin details");
  return res.json();
};

export function useCoinDetails(coinId: string) {
  return useQuery<CoinDetail>({
    queryKey: ["coin-details", coinId],
    queryFn: () => fetchCoinDetails(coinId),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5,
  });
}
