import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Input } from '@tarojs/components';
import { Tag } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useStore } from '../../store';
import './index.scss';

export default function DashboardPage() {
  const { stocks, indices, fetchStocks, fetchIndices } = useStore();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    Promise.all([fetchStocks(), fetchIndices()]).finally(() => setLoading(false));
  }, []);

  const filteredStocks = stocks.filter(s =>
    s.name.includes(search) || s.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const onStockClick = (symbol: string) => {
    Taro.navigateTo({ url: `/pages/trading/index?symbol=${symbol}` });
  };

  if (loading) {
    return (
      <View className="page">
        <View className="skeleton-row">
          {[1,2,3,4].map(i => (
            <View key={i} className="skel-card" />
          ))}
        </View>
      </View>
    );
  }

  return (
    <View className="page">
      <ScrollView scrollX className="index-bar">
        {indices.map(idx => (
          <View key={idx.name} className="index-card">
            <Text className="index-name">{idx.name}</Text>
            <Text className="index-value" style={{ color: idx.change >= 0 ? '#cf1322' : '#3f8600' }}>
              {idx.value.toFixed(2)}
            </Text>
            <Text className="index-change" style={{ color: idx.change >= 0 ? '#cf1322' : '#3f8600' }}>
              {idx.change >= 0 ? '+' : ''}{idx.change.toFixed(2)} ({idx.changePercent.toFixed(2)}%)
            </Text>
          </View>
        ))}
      </ScrollView>

      <View className="search-wrap">
        <Input
          className="search-input"
          placeholder="搜索股票代码或名称"
          value={search}
          onInput={(e) => setSearch((e as any).detail?.value ?? '')}
        />
      </View>

      <ScrollView scrollY className="stock-list">
        {filteredStocks.map(stock => (
          <View
            key={stock.symbol}
            className="stock-item"
            onClick={() => onStockClick(stock.symbol)}
          >
            <View className="stock-left">
              <Text className="stock-name">{stock.name}</Text>
              <Text className="stock-symbol">{stock.symbol}</Text>
            </View>
            <View className="stock-right">
              <Text
                className="stock-price"
                style={{ color: stock.change >= 0 ? '#cf1322' : '#3f8600' }}
              >
                {stock.price.toFixed(2)}
              </Text>
              <Tag
                type={stock.changePercent >= 0 ? 'danger' : 'success'}
                className="stock-tag"
              >
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </Tag>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
