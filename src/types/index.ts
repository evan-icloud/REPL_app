export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  prevClose: number;
}

export interface Position {
  symbol: string;
  name: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  marketValue: number;
  profit: number;
  profitPercent: number;
}

export interface Order {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  amount: number;
  status: 'pending' | 'filled' | 'cancelled';
  createTime: string;
}

export interface PortfolioSummary {
  totalAssets: number;
  totalMarketValue: number;
  totalProfit: number;
  totalProfitPercent: number;
  todayProfit: number;
  todayProfitPercent: number;
  availableCash: number;
  positions: Position[];
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}
