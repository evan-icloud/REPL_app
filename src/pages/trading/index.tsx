import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Input, InputProps } from '@tarojs/components';
import { Button, Tag, Toast, InputNumber, SearchBar } from '@nutui/nutui-react-taro';
import Taro from '@tarojs/taro';
import { useStore } from '../../store';
import type { Stock } from '../../types';
import './index.scss';

export default function TradingPage() {
  const { stocks, fetchStocks } = useStore();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  useEffect(() => {
    fetchStocks().finally(() => setLoading(false));
  }, []);

  // 从路由参数获取股票代码
  useEffect(() => {
    const instance = Taro.getCurrentInstance();
    const symbol = instance?.router?.params?.symbol;
    if (symbol && stocks.length > 0) {
      const stock = stocks.find(s => s.symbol === symbol);
      if (stock) {
        setSelected(stock);
        setPrice(stock.price.toFixed(2));
      }
    }
  }, [stocks]);

  const filteredStocks = stocks.filter(s =>
    s.name.includes(search) || s.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleTrade = () => {
    if (!selected) { Toast.show('请先选择股票'); return; }
    if (!price || !quantity) { Toast.show('请输入价格和数量'); return; }
    const p = parseFloat(price);
    const q = parseInt(quantity);
    if (isNaN(p) || isNaN(q) || p <= 0 || q < 100) { Toast.show('请输入有效数值'); return; }
    const amount = p * q;
    Toast.show({
      content: `${orderType === 'buy' ? '买入' : '卖出'}委托已提交\n${selected.name} ${q}股 @ ¥${p.toFixed(2)}\n总金额 ¥${amount.toFixed(2)}`,
      duration: 3
    });
    setPrice('');
    setQuantity('');
  };

  return (
    <View className="page">
      <View className="search-wrap">
        <SearchBar placeholder="搜索股票" value={search} onChange={(v) => setSearch(v)} />
      </View>

      <ScrollView scrollY className="stock-select">
        {filteredStocks.map(stock => (
          <View
            key={stock.symbol}
            className={`stock-row ${selected?.symbol === stock.symbol ? 'active' : ''}`}
            onClick={() => { setSelected(stock); setPrice(stock.price.toFixed(2)); }}
          >
            <View className="stock-info">
              <Text className="stock-name">{stock.name}</Text>
              <Text className="stock-code">{stock.symbol}</Text>
            </View>
            <View className="stock-price-col">
              <Text className="stock-price" style={{ color: stock.change >= 0 ? '#cf1322' : '#3f8600' }}>
                {stock.price.toFixed(2)}
              </Text>
              <Tag type={stock.changePercent >= 0 ? 'danger' : 'success'}>
                {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
              </Tag>
            </View>
          </View>
        ))}
      </ScrollView>

      {selected && (
        <View className="trade-panel">
          <View className="panel-header">
            <View className="header-left">
              <Text className="panel-name">{selected.name}</Text>
              <Text className="panel-code">{selected.symbol}</Text>
            </View>
            <Text className="panel-price" style={{ color: selected.change >= 0 ? '#cf1322' : '#3f8600' }}>
              {selected.price.toFixed(2)}
            </Text>
          </View>

          <View className="price-row">
            <View className="price-cell">
              <Text className="price-label">今开</Text>
              <Text className="price-val">{selected.open.toFixed(2)}</Text>
            </View>
            <View className="price-cell">
              <Text className="price-label">昨收</Text>
              <Text className="price-val">{selected.prevClose.toFixed(2)}</Text>
            </View>
            <View className="price-cell">
              <Text className="price-label">最高</Text>
              <Text className="price-val" style={{ color: '#cf1322' }}>{selected.high.toFixed(2)}</Text>
            </View>
            <View className="price-cell">
              <Text className="price-label">最低</Text>
              <Text className="price-val" style={{ color: '#3f8600' }}>{selected.low.toFixed(2)}</Text>
            </View>
          </View>

          <View className="btn-row">
            <Button
              size="large"
              type={orderType === 'buy' ? 'danger' : 'default'}
              onClick={() => setOrderType('buy')}
              className={orderType === 'buy' ? 'btn-active' : ''}
            >买入</Button>
            <Button
              size="large"
              type={orderType === 'sell' ? 'success' : 'default'}
              onClick={() => setOrderType('sell')}
              className={orderType === 'sell' ? 'btn-active-sell' : ''}
            >卖出</Button>
          </View>

          <View className="input-row">
            <Text className="input-label">委托价格</Text>
            <Input
              className="trade-input"
              type="digit"
              placeholder="0.00"
              value={price}
              onInput={(e) => setPrice(e.detail.value)}
            />
          </View>

          <View className="input-row">
            <Text className="input-label">委托数量</Text>
            <Input
              className="trade-input"
              type="number"
              placeholder="100"
              value={quantity}
              onInput={(e) => setQuantity(e.detail.value)}
            />
          </View>

          <View className="amount-row">
            <Text className="amount-label">预计金额</Text>
            <Text className="amount-val">
              ¥{(parseFloat(price || '0') * parseInt(quantity || '0')).toFixed(2)}
            </Text>
          </View>

          <Button
            block
            type="primary"
            size="large"
            onClick={handleTrade}
            style={{
              background: orderType === 'buy' ? '#cf1322' : '#3f8600',
              borderColor: orderType === 'buy' ? '#cf1322' : '#3f8600',
              marginTop: '20rpx'
            }}
          >
            确认{orderType === 'buy' ? '买入' : '卖出'}
          </Button>
        </View>
      )}
    </View>
  );
}
