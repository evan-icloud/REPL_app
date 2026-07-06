import { useEffect, useState } from 'react';
import { Card, Table, Tag, Button, Typography, Spin, Space, Popconfirm, message } from 'antd';
import { StarOutlined, StarFilled, DeleteOutlined } from '@ant-design/icons';
import { useStore } from '../../store';

const { Title } = Typography;

export default function WatchlistPage() {
  const { stocks, watchlist, fetchStocks, toggleWatch } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks().finally(() => setLoading(false));
  }, []);

  const watchedStocks = stocks.filter(s => watchlist.includes(s.symbol));
  const otherStocks = stocks.filter(s => !watchlist.includes(s.symbol));

  const columns = [
    { title: '代码', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '最新价', dataIndex: 'price', key: 'price', width: 100, render: (v: number) => <span style={{ fontWeight: 'bold' }}>{v.toFixed(2)}</span> },
    { title: '涨跌额', dataIndex: 'change', key: 'change', width: 100, render: (v: number) => <span style={{ color: v >= 0 ? '#cf1322' : '#3f8600' }}>{v >= 0 ? '+' : ''}{v.toFixed(2)}</span> },
    { title: '涨跌幅', dataIndex: 'changePercent', key: 'changePercent', width: 100, render: (v: number) => <Tag color={v >= 0 ? 'red' : 'green'}>{v >= 0 ? '+' : ''}{v.toFixed(2)}%</Tag> },
    { title: '成交量', dataIndex: 'volume', key: 'volume', width: 120, render: (v: number) => (v / 10000).toFixed(1) + '万' },
    {
      title: '操作', key: 'action', width: 80,
      render: (_: unknown, record: { symbol: string }) => (
        <Popconfirm title="确定移出自选吗？" onConfirm={() => { toggleWatch(record.symbol); message.success('已移出自选'); }}>
          <Button type="text" danger icon={<DeleteOutlined />} size="small">移出</Button>
        </Popconfirm>
      ),
    },
  ];

  const addColumns = [
    { title: '代码', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '最新价', dataIndex: 'price', key: 'price', width: 100, render: (v: number) => v.toFixed(2) },
    { title: '涨跌幅', dataIndex: 'changePercent', key: 'changePercent', width: 100, render: (v: number) => <Tag color={v >= 0 ? 'red' : 'green'}>{v >= 0 ? '+' : ''}{v.toFixed(2)}%</Tag> },
    {
      title: '操作', key: 'action', width: 80,
      render: (_: unknown, record: { symbol: string }) => (
        <Button type="text" icon={<StarOutlined />} size="small" onClick={() => { toggleWatch(record.symbol); message.success('已加入自选'); }}>加自选</Button>
      ),
    },
  ];

  return (
    <Spin spinning={loading}>
      <div style={{ padding: 24 }}>
        <Title level={4}>
          <Space><StarFilled style={{ color: '#faad14' }} />自选列表</Space>
        </Title>
        <Card title={`我的自选 (${watchedStocks.length})`} style={{ marginBottom: 16 }}>
          <Table columns={columns} dataSource={watchedStocks} rowKey="symbol" size="small" pagination={false} locale={{ emptyText: '暂无自选股票' }} />
        </Card>
        <Card title="推荐添加">
          <Table columns={addColumns} dataSource={otherStocks} rowKey="symbol" size="small" pagination={{ pageSize: 5 }} />
        </Card>
      </div>
    </Spin>
  );
}
