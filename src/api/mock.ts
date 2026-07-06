import type { Stock, Position, Order, PortfolioSummary, MarketIndex } from '../types';

const mockStocks: Stock[] = [
  { symbol: 'SH600519', name: '贵州茅台', price: 1689.50, change: 12.30, changePercent: 0.73, volume: 23456700, marketCap: 2120000000000, high: 1698.00, low: 1675.00, open: 1680.00, prevClose: 1677.20 },
  { symbol: 'SH601318', name: '中国平安', price: 48.65, change: -0.35, changePercent: -0.71, volume: 45678900, marketCap: 886000000000, high: 49.20, low: 48.30, open: 49.00, prevClose: 49.00 },
  { symbol: 'SZ000858', name: '五粮液', price: 156.80, change: 3.25, changePercent: 2.12, volume: 12345600, marketCap: 608000000000, high: 158.00, low: 153.50, open: 154.00, prevClose: 153.55 },
  { symbol: 'SH600036', name: '招商银行', price: 35.42, change: 0.28, changePercent: 0.80, volume: 34567800, marketCap: 894000000000, high: 35.68, low: 35.10, open: 35.14, prevClose: 35.14 },
  { symbol: 'SZ300750', name: '宁德时代', price: 218.50, change: -4.20, changePercent: -1.89, volume: 56789000, marketCap: 960000000000, high: 223.00, low: 217.00, open: 222.80, prevClose: 222.70 },
  { symbol: 'SH601012', name: '隆基绿能', price: 23.45, change: 0.52, changePercent: 2.27, volume: 78901200, marketCap: 178000000000, high: 23.68, low: 22.90, open: 22.95, prevClose: 22.93 },
  { symbol: 'SZ002594', name: '比亚迪', price: 245.60, change: 5.80, changePercent: 2.42, volume: 23456700, marketCap: 715000000000, high: 247.00, low: 240.00, open: 240.50, prevClose: 239.80 },
  { symbol: 'SH600276', name: '恒瑞医药', price: 47.85, change: 0.15, changePercent: 0.31, volume: 12345600, marketCap: 305000000000, high: 48.20, low: 47.60, open: 47.70, prevClose: 47.70 },
  { symbol: 'SZ000333', name: '美的集团', price: 78.30, change: 1.20, changePercent: 1.56, volume: 34567800, marketCap: 549000000000, high: 78.80, low: 77.10, open: 77.20, prevClose: 77.10 },
  { symbol: 'SH600887', name: '伊利股份', price: 28.95, change: -0.25, changePercent: -0.86, volume: 45678900, marketCap: 184000000000, high: 29.30, low: 28.80, open: 29.20, prevClose: 29.20 },
];

const mockPositions: Position[] = [
  { symbol: 'SH600519', name: '贵州茅台', quantity: 100, avgPrice: 1620.00, currentPrice: 1689.50, marketValue: 168950, profit: 6950, profitPercent: 4.29 },
  { symbol: 'SZ000858', name: '五粮液', quantity: 500, avgPrice: 148.00, currentPrice: 156.80, marketValue: 78400, profit: 4400, profitPercent: 5.95 },
  { symbol: 'SH600036', name: '招商银行', quantity: 2000, avgPrice: 33.50, currentPrice: 35.42, marketValue: 70840, profit: 3840, profitPercent: 5.73 },
  { symbol: 'SZ300750', name: '宁德时代', quantity: 300, avgPrice: 235.00, currentPrice: 218.50, marketValue: 65550, profit: -4950, profitPercent: -7.02 },
  { symbol: 'SZ002594', name: '比亚迪', quantity: 200, avgPrice: 230.00, currentPrice: 245.60, marketValue: 49120, profit: 3120, profitPercent: 6.78 },
];

const mockIndices: MarketIndex[] = [
  { name: '上证指数', value: 3289.45, change: 15.32, changePercent: 0.47 },
  { name: '深证成指', value: 10456.78, change: -23.45, changePercent: -0.22 },
  { name: '创业板指', value: 2156.30, change: 8.76, changePercent: 0.41 },
  { name: '沪深300', value: 3845.60, change: 12.15, changePercent: 0.32 },
];

const mockOrders: Order[] = [
  { id: 'ORD20240115001', symbol: 'SH600519', name: '贵州茅台', type: 'buy', price: 1620.00, quantity: 100, amount: 162000, status: 'filled', createTime: '2024-01-15 09:35' },
  { id: 'ORD20240120002', symbol: 'SZ000858', name: '五粮液', type: 'buy', price: 148.00, quantity: 500, amount: 74000, status: 'filled', createTime: '2024-01-20 14:20' },
  { id: 'ORD20240201003', symbol: 'SZ300750', name: '宁德时代', type: 'buy', price: 235.00, quantity: 300, amount: 70500, status: 'filled', createTime: '2024-02-01 10:05' },
  { id: 'ORD20240210004', symbol: 'SH600036', name: '招商银行', type: 'buy', price: 33.50, quantity: 2000, amount: 67000, status: 'filled', createTime: '2024-02-10 09:32' },
  { id: 'ORD20240215005', symbol: 'SZ002594', name: '比亚迪', type: 'buy', price: 230.00, quantity: 200, amount: 46000, status: 'filled', createTime: '2024-02-15 11:15' },
  { id: 'ORD20240301006', symbol: 'SZ300750', name: '宁德时代', type: 'sell', price: 228.00, quantity: 100, amount: 22800, status: 'filled', createTime: '2024-03-01 14:45' },
];

export const api = {
  getStocks: async (): Promise<Stock[]> => {
    await delay(300);
    return mockStocks;
  },
  getPositions: async (): Promise<Position[]> => {
    await delay(300);
    return mockPositions;
  },
  getOrders: async (): Promise<Order[]> => {
    await delay(300);
    return mockOrders;
  },
  getPortfolioSummary: async (): Promise<PortfolioSummary> => {
    await delay(300);
    const totalMarketValue = mockPositions.reduce((sum, p) => sum + p.marketValue, 0);
    const totalCost = mockPositions.reduce((sum, p) => sum + p.quantity * p.avgPrice, 0);
    const totalProfit = totalMarketValue - totalCost;
    const availableCash = 156800.50;
    return {
      totalAssets: totalMarketValue + availableCash,
      totalMarketValue,
      totalProfit,
      totalProfitPercent: (totalProfit / totalCost) * 100,
      todayProfit: 2340.50,
      todayProfitPercent: 0.89,
      availableCash,
      positions: mockPositions,
    };
  },
  getMarketIndices: async (): Promise<MarketIndex[]> => {
    await delay(200);
    return mockIndices;
  },
};

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
