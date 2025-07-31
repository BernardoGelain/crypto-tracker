"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useSearchCoins } from "./hooks/api/useSearchCoins";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: results = [], isLoading } = useSearchCoins(debouncedQuery);

  useEffect(() => {
    setShowResults(results.length > 0 && query.length >= 2);
  }, [results, query]);

  const handleResultClick = (coinId: string) => {
    setQuery("");
    setShowResults(false);
    router.push(`/coin/${coinId}`);
  };

  const clearSearch = () => {
    setQuery("");
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search cryptocurrencies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button variant="ghost" size="sm" onClick={clearSearch} className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-80 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">Searching...</div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((coin) => (
                  <button
                    key={coin.id}
                    onClick={() => handleResultClick(coin.id)}
                    className="w-full p-4 text-left hover:bg-muted/50 transition-colors flex items-center space-x-3"
                  >
                    <Image src={coin.thumb || "/placeholder.svg"} alt={coin.name} width={24} height={24} className="rounded-full" />
                    <div>
                      <div className="font-medium">{coin.name}</div>
                      <div className="text-sm text-muted-foreground uppercase">{coin.symbol}</div>
                    </div>
                    {coin.market_cap_rank && <div className="ml-auto text-sm text-muted-foreground">#{coin.market_cap_rank}</div>}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">No results found</div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
