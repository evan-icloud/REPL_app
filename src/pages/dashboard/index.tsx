import { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Tag, Input, Typography, Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useStore } from '../../store';
import type { Stock } from '../../types';

const { Text, Title } = Typography;

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

  const indexCards = indices.map(idx => (
    <Col span={6} key={idx.name}>
      <Card hoverable size="small">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 14, color: '#666' }}>{idx.name}</div>
          <div style={{ fontSize: 24, fontWeight: 'bold', color: idx.change >= 0 ? '#cf1322' : '#3f8600', margin: '8px 0' }}>
            {idx.value.toFixed(2)}
          </div>
          <div style={{ fontSize: 13, color: idx.change >= 0 ? '#cf1322' : '#3f8600' }}>
            {idx.change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {' '}{Math.abs(idx.change).toFixed(2)} ({Math.abs(idx.changePercent).toFixed(2)}%)
          </div>
        </div>
      </Card>
    </Col>
  ));

  const columns = [
    { title: '代码', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '最新价', dataIndex: 'price', key: 'price', width: 100, render: (v: number) => <span style={{ fontWeight: 'bold' }}>{v.toFixed(2)}</span> },
    { title: '涨跌额', dataIndex: 'change', key: 'change', width: 100, render: (v: number) => <span style={{ color: v >= 0 ? '#cf1322' : '#3f8600' }}>{v >= 0 ? '+' : ''}{v.toFixed(2)}</span> },
    { title: '涨跌幅', dataIndex: 'changePercent', key: 'changePercent', width: 100, render: (v: number) => <Tag color={v >= 0 ? 'red' : 'green'}>{v >= 0 ? '+' : ''}{v.toFixed(2)}%</Tag> },
    { title: '成交量', dataIndex: 'volume', key: 'volume', width: 120, render: (v: number) => (v / 10000).toFixed(1) + '万' },
    { title: '最高', dataIndex: 'high', key: 'high', width: 80, render: (v: number) => v.toFixed(2) },
    { title: '最低', dataIndex: 'low', key: 'low', width: 80, render: (v: number) => v.toFixed(2) },
  ];

  return (
    <Spin spinning={loading}>
      <div style={{ padding: 24 }}>
        <Title level={4}>行情看板</Title>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>{indexCards}</Row>
        <Card>
          <Input.Search placeholder="搜索股票代码或名称" value={search} onChange={e => setSearch(e.target.value)} style={{ width: 300, marginBottom: 16 }} />
          <Table columns={columns} dataSource={filteredStocks} rowKey="symbol" size="small" pagination={{ pageSize: 10 }} />
        </Card>
      </div>
    </Spin>
  );
}
