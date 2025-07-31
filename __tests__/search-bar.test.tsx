import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "@/components/search-bar/search-bar";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock global fetch
global.fetch = jest.fn();

const mockPush = jest.fn();
const mockSearchResults = {
  coins: [
    {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      thumb: "https://example.com/bitcoin-thumb.png",
      market_cap_rank: 1,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      thumb: "https://example.com/ethereum-thumb.png",
      market_cap_rank: 2,
    },
  ],
};

// Utilitário para renderizar com React Query Provider
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("SearchBar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders search input", () => {
    render(<SearchBar />, { wrapper: createWrapper() });
    expect(screen.getByPlaceholderText("Search cryptocurrencies...")).toBeInTheDocument();
  });

  it("shows search results when typing", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResults,
    });

    render(<SearchBar />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search cryptocurrencies...");
    fireEvent.change(input, { target: { value: "bitcoin" } });

    await waitFor(() => {
      expect(screen.getByText("Bitcoin")).toBeInTheDocument();
      expect(screen.getByText("BTC")).toBeInTheDocument();
    });
  });

  it("navigates to coin page when result is clicked", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResults,
    });

    render(<SearchBar />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search cryptocurrencies...");
    fireEvent.change(input, { target: { value: "bitcoin" } });

    await waitFor(() => {
      const result = screen.getByText("Bitcoin");
      fireEvent.click(result);
    });

    expect(mockPush).toHaveBeenCalledWith("/coin/bitcoin");
  });

  it("clears search when clear button is clicked", async () => {
    render(<SearchBar />, { wrapper: createWrapper() });

    const input = screen.getByPlaceholderText("Search cryptocurrencies...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "bitcoin" } });

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
  });
});
