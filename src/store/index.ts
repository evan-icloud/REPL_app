import { create } from 'zustand';
import type { Stock, Position, Order, PortfolioSummary, MarketIndex } from '../types';
import { api } from '../api/mock';

interface AppState {
  stocks: Stock[];
  positions: Position[];
  orders: Order[];
  portfolio: PortfolioSummary | null;
  indices: MarketIndex[];
  watchlist: string[];
  loading: boolean;
  fetchStocks: () => Promise<void>;
  fetchPositions: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchPortfolio: () => Promise<void>;
  fetchIndices: () => Promise<void>;
  toggleWatch: (symbol: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  stocks: [],
  positions: [],
  orders: [],
  portfolio: null,
  indices: [],
  watchlist: ['SH600519', 'SZ000858', 'SZ300750'],
  loading: false,

  fetchStocks: async () => {
    const stocks = await api.getStocks();
    set({ stocks });
  },
  fetchPositions: async () => {
    const positions = await api.getPositions();
    set({ positions });
  },
  fetchOrders: async () => {
    const orders = await api.getOrders();
    set({ orders });
  },
  fetchPortfolio: async () => {
    const portfolio = await api.getPortfolioSummary();
    set({ portfolio });
  },
  fetchIndices: async () => {
    const indices = await api.getMarketIndices();
    set({ indices });
  },
  toggleWatch: (symbol: string) => {
    const list = get().watchlist;
    if (list.includes(symbol)) {
      set({ watchlist: list.filter(s => s !== symbol) });
    } else {
      set({ watchlist: [...list, symbol] });
    }
  },
}));
