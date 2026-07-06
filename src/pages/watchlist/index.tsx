import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from '@tarojs/components';
import { Tag, Button, Skeleton, Dialog } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useStore } from '../../store';
import './index.scss';

export default function WatchlistPage() {
  const { stocks, watchlist, fetchStocks, toggleWatch } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <View className="page"><Skeleton width="100%" height="200rpx" animated /></View>;
  }

  const watchedStocks = stocks.filter(s => watchlist.includes(s.symbol));
  const otherStocks = stocks.filter(s => !watchlist.includes(s.symbol));

  const onRemove = (symbol: string, name: string) => {
    Dialog.open({
      title: '确认移出',
      content: `确定将 ${name} 移出自选吗？`,
      onConfirm: () => {
        toggleWatch(symbol);
        Taro.showToast({ title: '已移出自选', icon: 'success' });
      }
    });
  };

  const onAdd = (symbol: string) => {
    toggleWatch(symbol);
    Taro.showToast({ title: '已加入自选', icon: 'success' });
  };

  return (
    <View className="page">
      <View className="section">
        <Text className="section-title">我的自选 ({watchedStocks.length})</Text>
        {watchedStocks.length === 0 ? (
          <View className="empty">
            <Text className="empty-text">暂无自选股票</Text>
          </View>
        ) : (
          watchedStocks.map(stock => (
            <View key={stock.symbol} className="stock-item">
              <View className="stock-left">
                <Text className="stock-name">{stock.name}</Text>
                <Text className="stock-code">{stock.symbol}</Text>
              </View>
              <View className="stock-mid">
                <Text
                  className="stock-price"
                  style={{ color: stock.change >= 0 ? '#cf1322' : '#3f8600' }}
                >
                  {stock.price.toFixed(2)}
                </Text>
                <Tag type={stock.changePercent >= 0 ? 'danger' : 'success'}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </Tag>
              </View>
              <Button
                size="mini"
                type="danger"
                plain
                onClick={() => onRemove(stock.symbol, stock.name)}
              >移出</Button>
            </View>
          ))
        )}
      </View>

      <View className="section">
        <Text className="section-title">推荐添加</Text>
        {otherStocks.map(stock => (
          <View key={stock.symbol} className="stock-item">
            <View className="stock-left">
              <Text className="stock-name">{stock.name}</Text>
              <Text className="stock-code">{stock.symbol}</Text>
            </View>
            <View className="stock-mid">
              <Text className="stock-price">{stock.price.toFixed(2)}</Text>
              <Tag type={stock.changePercent >= 0 ? 'danger' : 'success'}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </Tag>
            </View>
            <Button
              size="mini"
              type="primary"
              plain
              onClick={() => onAdd(stock.symbol)}
            >加自选</Button>
          </View>
        ))}
      </View>
    </View>
  );
}
