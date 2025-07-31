import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CoinList from "@/components/coin-list/coin-list";

global.fetch = jest.fn();

const mockCoinsData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image: "https://example.com/bitcoin.png",
    current_price: 50000,
    market_cap: 1000000000,
    market_cap_rank: 1,
    price_change_percentage_24h: 5.5,
    total_volume: 50000000,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    image: "https://example.com/ethereum.png",
    current_price: 3000,
    market_cap: 500000000,
    market_cap_rank: 2,
    price_change_percentage_24h: -2.3,
    total_volume: 30000000,
  },
];

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("CoinList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state initially", () => {
    (fetch as jest.Mock).mockImplementation(() => new Promise(() => {}));

    render(<CoinList />, { wrapper: createWrapper() });

    expect(screen.getAllByRole("status").length).toBeGreaterThan(0);
  });

  it("renders coin list after successful fetch", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCoinsData,
    });

    render(<CoinList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("Ethereum")).toBeInTheDocument();
      expect(screen.getByText("$50,000.00")).toBeInTheDocument();
      expect(screen.getByText("$3,000.00")).toBeInTheDocument();
    });
  });

  it("renders error state when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(<CoinList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/API Error/)).toBeInTheDocument();
      expect(screen.getByText(/Please try again later/i)).toBeInTheDocument();
    });
  });

  it("displays price change indicators correctly", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCoinsData,
    });

    render(<CoinList />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText("5.50%")).toBeInTheDocument();
      expect(screen.getByText("2.30%")).toBeInTheDocument();
    });
  });
});
