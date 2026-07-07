import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { Tag } from '@nutui/nutui-react-taro';
import { useStore } from '../../store';
import './index.scss';

export default function PortfolioPage() {
  const { portfolio, orders, fetchPortfolio, fetchOrders } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPortfolio(), fetchOrders()]).finally(() => setLoading(false));
  }, []);

  if (loading || !portfolio) {
    return <View className="page"><View className="skel-card" style={{ width: '100%', height: '200rpx' }} /></View>;
  }

  return (
    <View className="page">
      <View className="summary-grid">
        <View className="summary-card">
          <Text className="summary-label">总资产</Text>
          <Text className="summary-value">¥{portfolio.totalAssets.toFixed(2)}</Text>
        </View>
        <View className="summary-card">
          <Text className="summary-label">持仓市值</Text>
          <Text className="summary-value blue">¥{portfolio.totalMarketValue.toFixed(2)}</Text>
        </View>
        <View className="summary-card">
          <Text className="summary-label">累计盈亏</Text>
          <Text className="summary-value" style={{ color: portfolio.totalProfit >= 0 ? '#cf1322' : '#3f8600' }}>
            {portfolio.totalProfit >= 0 ? '+' : ''}¥{Math.abs(portfolio.totalProfit).toFixed(2)}
          </Text>
        </View>
        <View className="summary-card">
          <Text className="summary-label">可用资金</Text>
          <Text className="summary-value green">¥{portfolio.availableCash.toFixed(2)}</Text>
        </View>
      </View>

      <View className="section">
        <Text className="section-title">持仓明细</Text>
        {portfolio.positions.map(pos => (
          <View key={pos.symbol} className="position-item">
            <View className="pos-header">
              <Text className="pos-name">{pos.name}</Text>
              <Tag type={pos.profit >= 0 ? 'danger' : 'success'}>
                {pos.profit >= 0 ? '+' : ''}{pos.profitPercent.toFixed(2)}%
              </Tag>
            </View>
            <View className="pos-grid">
              <View className="pos-cell">
                <Text className="cell-label">持仓</Text>
                <Text className="cell-value">{pos.quantity}</Text>
              </View>
              <View className="pos-cell">
                <Text className="cell-label">成本</Text>
                <Text className="cell-value">{pos.avgPrice.toFixed(2)}</Text>
              </View>
              <View className="pos-cell">
                <Text className="cell-label">现价</Text>
                <Text className="cell-value">{pos.currentPrice.toFixed(2)}</Text>
              </View>
              <View className="pos-cell">
                <Text className="cell-label">市值</Text>
                <Text className="cell-value">¥{pos.marketValue.toLocaleString()}</Text>
              </View>
              <View className="pos-cell">
                <Text className="cell-label">盈亏</Text>
                <Text className="cell-value" style={{ color: pos.profit >= 0 ? '#cf1322' : '#3f8600' }}>
                  {pos.profit >= 0 ? '+' : ''}¥{Math.abs(pos.profit).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View className="section">
        <Text className="section-title">最近委托</Text>
        <ScrollView scrollY className="order-scroll">
          {orders.map(order => (
            <View key={order.id} className="order-item">
              <View className="order-row">
                <Tag type={order.type === 'buy' ? 'danger' : 'success'}>
                  {order.type === 'buy' ? '买入' : '卖出'}
                </Tag>
                <Text className="order-name">{order.name}</Text>
                <Text className="order-time">{order.createTime}</Text>
              </View>
              <View className="order-row">
                <Text className="order-detail">{order.price.toFixed(2)} × {order.quantity}股</Text>
                <Text className="order-amount">¥{order.amount.toLocaleString()}</Text>
                <Tag plain>{order.status === 'filled' ? '已成' : '待成交'}</Tag>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
