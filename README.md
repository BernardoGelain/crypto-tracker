# CryptoTracker

A modern cryptocurrency tracking application built with Next.js, TypeScript, and the CoinGecko API.

## Features

- 📊 **Top 20 Cryptocurrencies**: View the top cryptocurrencies by market cap
- 🔍 **Search Functionality**: Search for any cryptocurrency by name
- 📈 **Detailed Charts**: 7-day price charts for individual coins
- 🌙 **Dark/Light Theme**: Toggle between dark and light modes
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- ⚡ **Fast Loading**: Optimized performance with loading states
- 🛡️ **Error Handling**: Comprehensive error boundaries and handling
- ♿ **Accessible**: Built with accessibility best practices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **API**: CoinGecko API
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel (Docker ready)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd crypto-tracker
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

\`\`\`
├── app/                    # Next.js App Router pages
│   ├── coin/[id]/         # Dynamic coin detail pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── coin-details.tsx  # Coin detail component
│   ├── coin-list.tsx     # Coin list component
│   ├── price-chart.tsx   # Chart component
│   └── search-bar.tsx    # Search component
├── __tests__/            # Unit tests
├── Dockerfile            # Docker configuration
└── README.md
\`\`\`

## API Usage

This application uses the [CoinGecko API](https://www.coingecko.com/api/documentation) to fetch cryptocurrency data:

- **Market Data**: `/coins/markets` - Top cryptocurrencies by market cap
- **Search**: `/search` - Search cryptocurrencies by name
- **Coin Details**: `/coins/{id}` - Detailed information about a specific coin
- **Price History**: `/coins/{id}/market_chart` - Historical price data for charts

## Testing

The project includes comprehensive unit tests:

\`\`\`bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch
\`\`\`

## Docker Deployment

Build and run with Docker:

\`\`\`bash
# Build the image
docker build -t crypto-tracker .

# Run the container
docker run -p 3000:3000 crypto-tracker
\`\`\`

## Deployment on Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

## Features in Detail

### Cryptocurrency List
- Displays top 20 cryptocurrencies by market cap
- Shows current price, 24h change, and market cap
- Color-coded price changes (green for positive, red for negative)
- Click any coin to view detailed information

### Search Functionality
- Real-time search as you type
- Debounced API calls for performance
- Click search results to navigate to coin details
- Clear search functionality

### Coin Details Page
- Comprehensive coin information
- Interactive 7-day price chart
- Market statistics (market cap, volume, supply)
- Price change indicators for multiple timeframes
- Links to official websites

### Theme Support
- System theme detection
- Manual dark/light mode toggle
- Persistent theme preference
- Smooth transitions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.
