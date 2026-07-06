import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/dashboard';
import PortfolioPage from './pages/portfolio';
import TradingPage from './pages/trading';
import WatchlistPage from './pages/watchlist';
import 'dayjs/locale/zh-cn';

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={{ token: { colorPrimary: '#1677ff' } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="portfolio" element={<PortfolioPage />} />
            <Route path="trading" element={<TradingPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}
