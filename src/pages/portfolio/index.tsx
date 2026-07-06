import { useEffect, useState } from 'react';
import { Card, Row, Col, Table, Tag, Typography, Spin, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useStore } from '../../store';

const { Title } = Typography;

export default function PortfolioPage() {
  const { portfolio, orders, fetchPortfolio, fetchOrders } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPortfolio(), fetchOrders()]).finally(() => setLoading(false));
  }, []);

  if (loading || !portfolio) return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', padding: 100 }} />;

  const positionColumns = [
    { title: '代码', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '持仓量', dataIndex: 'quantity', key: 'quantity', width: 100, render: (v: number) => v.toLocaleString() },
    { title: '成本价', dataIndex: 'avgPrice', key: 'avgPrice', width: 100, render: (v: number) => v.toFixed(2) },
    { title: '现价', dataIndex: 'currentPrice', key: 'currentPrice', width: 100, render: (v: number) => v.toFixed(2) },
    { title: '市值', dataIndex: 'marketValue', key: 'marketValue', width: 120, render: (v: number) => '¥' + v.toLocaleString(undefined, { minimumFractionDigits: 2 }) },
    { title: '盈亏', dataIndex: 'profit', key: 'profit', width: 120, render: (v: number) => <span style={{ color: v >= 0 ? '#cf1322' : '#3f8600', fontWeight: 'bold' }}>{v >= 0 ? '+' : ''}¥{Math.abs(v).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span> },
    { title: '收益率', dataIndex: 'profitPercent', key: 'profitPercent', width: 100, render: (v: number) => <Tag color={v >= 0 ? 'red' : 'green'}>{v >= 0 ? '+' : ''}{v.toFixed(2)}%</Tag> },
  ];

  const orderColumns = [
    { title: '委托编号', dataIndex: 'id', key: 'id', width: 160 },
    { title: '代码', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 100 },
    { title: '方向', dataIndex: 'type', key: 'type', width: 80, render: (v: string) => <Tag color={v === 'buy' ? 'red' : 'green'}>{v === 'buy' ? '买入' : '卖出'}</Tag> },
    { title: '价格', dataIndex: 'price', key: 'price', width: 100, render: (v: number) => v.toFixed(2) },
    { title: '数量', dataIndex: 'quantity', key: 'quantity', width: 100, render: (v: number) => v.toLocaleString() },
    { title: '金额', dataIndex: 'amount', key: 'amount', width: 120, render: (v: number) => '¥' + v.toLocaleString() },
    { title: '状态', dataIndex: 'status', key: 'status', width: 80, render: (v: string) => { const map: Record<string, { color: string; text: string }> = { filled: { color: 'blue', text: '已成' }, pending: { color: 'orange', text: '待成交' }, cancelled: { color: 'default', text: '已撤单' } }; const m = map[v] || map.pending; return <Tag color={m.color}>{m.text}</Tag>; } },
    { title: '时间', dataIndex: 'createTime', key: 'createTime', width: 180 },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={4}>投资组合</Title>
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <Card><Statistic title="总资产" value={portfolio.totalAssets} precision={2} prefix="¥" valueStyle={{ fontWeight: 'bold' }} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="持仓市值" value={portfolio.totalMarketValue} precision={2} prefix="¥" valueStyle={{ color: '#1677ff' }} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="累计盈亏" value={portfolio.totalProfit} precision={2} prefix="¥" valueStyle={{ color: portfolio.totalProfit >= 0 ? '#cf1322' : '#3f8600' }} suffix={portfolio.totalProfit >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} /></Card>
        </Col>
        <Col span={6}>
          <Card><Statistic title="可用资金" value={portfolio.availableCash} precision={2} prefix="¥" valueStyle={{ color: '#52c41a' }} /></Card>
        </Col>
      </Row>
      <Card title="持仓明细" style={{ marginBottom: 16 }}>
        <Table columns={positionColumns} dataSource={portfolio.positions} rowKey="symbol" size="small" pagination={false} />
      </Card>
      <Card title="最近委托">
        <Table columns={orderColumns} dataSource={orders} rowKey="id" size="small" pagination={{ pageSize: 10 }} />
      </Card>
    </div>
  );
}
