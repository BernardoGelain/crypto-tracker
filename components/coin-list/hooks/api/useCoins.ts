import { useQuery } from "@tanstack/react-query";

export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

const fetchCoins = async (): Promise<Coin[]> => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false");

  if (!res.ok) throw new Error("Failed to fetch cryptocurrency data");
  return res.json();
};

export function useCoins() {
  return useQuery<Coin[]>({
    queryKey: ["coins"],
    queryFn: fetchCoins,
    staleTime: 1000 * 60 * 5,
  });
}
