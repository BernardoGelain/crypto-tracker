import { useQuery } from "@tanstack/react-query";
import { SearchResult } from "../../types/SearchResult";

const fetchSearchResults = async (query: string): Promise<SearchResult[]> => {
  const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to fetch search results");
  const data = await res.json();
  return data.coins.slice(0, 5);
};

export function useSearchCoins(query: string) {
  return useQuery<SearchResult[]>({
    queryKey: ["search", query],
    queryFn: () => fetchSearchResults(query),
    enabled: query.length >= 2,
    staleTime: 1000 * 60 * 5,
  });
}
