import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/search-bar/search-bar";
import jest from "jest"; // Import jest to fix the undeclared variable error

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

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

const mockPush = jest.fn();

describe("SearchBar", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (fetch as jest.Mock).mockClear();
    mockPush.mockClear();
  });

  it("renders search input", () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText("Search cryptocurrencies...")).toBeInTheDocument();
  });

  it("shows search results when typing", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResults,
    });

    render(<SearchBar />);

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

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search cryptocurrencies...");
    fireEvent.change(input, { target: { value: "bitcoin" } });

    await waitFor(() => {
      const bitcoinResult = screen.getByText("Bitcoin");
      fireEvent.click(bitcoinResult);
    });

    expect(mockPush).toHaveBeenCalledWith("/coin/bitcoin");
  });

  it("clears search when clear button is clicked", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search cryptocurrencies...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "bitcoin" } });

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);

    expect(input.value).toBe("");
  });
});
