import { useEffect, useState } from 'react';
import { Card, Row, Col, Input, Table, Tag, Button, InputNumber, Form, message, Typography, Spin, Divider } from 'antd';
import { useStore } from '../../store';
import type { Stock } from '../../types';

const { Title, Text } = Typography;

export default function TradingPage() {
  const { stocks, fetchStocks } = useStore();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Stock | null>(null);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStocks().finally(() => setLoading(false));
  }, []);

  const filteredStocks = stocks.filter(s =>
    s.name.includes(search) || s.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleTrade = () => {
    form.validateFields().then(values => {
      const amount = values.price * values.quantity;
      message.success(`${orderType === 'buy' ? '买入' : '卖出'}委托已提交：${selected?.name} ${values.quantity}股 @ ¥${values.price.toFixed(2)}，总金额 ¥${amount.toFixed(2)}`);
      form.resetFields();
    });
  };

  const stockColumns = [
    { title: '代码', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { title: '名称', dataIndex: 'name', key: 'name', width: 80 },
    { title: '最新价', dataIndex: 'price', key: 'price', width: 80, render: (v: number) => v.toFixed(2) },
    { title: '涨跌幅', dataIndex: 'changePercent', key: 'changePercent', width: 80, render: (v: number) => <Tag color={v >= 0 ? 'red' : 'green'}>{v >= 0 ? '+' : ''}{v.toFixed(2)}%</Tag> },
  ];

  return (
    <Spin spinning={loading}>
      <div style={{ padding: 24 }}>
        <Title level={4}>交易</Title>
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <Card title="选择股票" size="small">
              <Input.Search placeholder="搜索股票代码或名称" value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 12 }} />
              <Table
                columns={stockColumns}
                dataSource={filteredStocks}
                rowKey="symbol"
                size="small"
                pagination={{ pageSize: 8 }}
                onRow={(record) => ({
                  onClick: () => { setSelected(record); form.setFieldsValue({ price: record.price }); },
                  style: { cursor: 'pointer', background: selected?.symbol === record.symbol ? '#e6f4ff' : undefined },
                })}
              />
            </Card>
          </Col>
          <Col span={14}>
            <Card title="交易面板" size="small">
              {selected ? (
                <>
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={8}>
                      <div style={{ fontSize: 14, color: '#999' }}>股票名称</div>
                      <div style={{ fontSize: 18, fontWeight: 'bold' }}>{selected.name}</div>
                    </Col>
                    <Col span={8}>
                      <div style={{ fontSize: 14, color: '#999' }}>股票代码</div>
                      <div style={{ fontSize: 18 }}>{selected.symbol}</div>
                    </Col>
                    <Col span={8}>
                      <div style={{ fontSize: 14, color: '#999' }}>最新价</div>
                      <div style={{ fontSize: 18, fontWeight: 'bold', color: selected.change >= 0 ? '#cf1322' : '#3f8600' }}>
                        {selected.price.toFixed(2)}
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ marginBottom: 16 }}>
                    <Col span={6}><Text type="secondary">今开</Text><br /><Text>{selected.open.toFixed(2)}</Text></Col>
                    <Col span={6}><Text type="secondary">昨收</Text><br /><Text>{selected.prevClose.toFixed(2)}</Text></Col>
                    <Col span={6}><Text type="secondary">最高</Text><br /><Text style={{ color: '#cf1322' }}>{selected.high.toFixed(2)}</Text></Col>
                    <Col span={6}><Text type="secondary">最低</Text><br /><Text style={{ color: '#3f8600' }}>{selected.low.toFixed(2)}</Text></Col>
                  </Row>
                  <Divider style={{ margin: '12px 0' }} />
                  <div style={{ marginBottom: 16 }}>
                    <Button type="primary" danger={orderType === 'buy'} onClick={() => setOrderType('buy')} style={{ marginRight: 8, background: orderType === 'buy' ? '#cf1322' : undefined, borderColor: orderType === 'buy' ? '#cf1322' : undefined }}>买入</Button>
                    <Button type="primary" danger={orderType === 'sell'} onClick={() => setOrderType('sell')} style={{ background: orderType === 'sell' ? '#3f8600' : undefined, borderColor: orderType === 'sell' ? '#3f8600' : undefined }}>卖出</Button>
                  </div>
                  <Form form={form} layout="vertical">
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item name="price" label="委托价格" rules={[{ required: true, message: '请输入价格' }]}>
                          <InputNumber style={{ width: '100%' }} step={0.01} min={0.01} precision={2} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item name="quantity" label="委托数量" rules={[{ required: true, message: '请输入数量' }]}>
                          <InputNumber style={{ width: '100%' }} step={100} min={100} precision={0} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Form.Item shouldUpdate>
                      {() => {
                        const price = form.getFieldValue('price') || 0;
                        const qty = form.getFieldValue('quantity') || 0;
                        const amount = price * qty;
                        return <div style={{ textAlign: 'right', marginBottom: 16 }}><Text type="secondary">预计金额: </Text><Text strong style={{ fontSize: 18 }}>"¥{amount.toFixed(2)}</Text></div>;
                      }}
                    </Form.Item>
                    <Button type="primary" block size="large" onClick={handleTrade}
                      style={{ background: orderType === 'buy' ? '#cf1322' : '#3f8600', borderColor: orderType === 'buy' ? '#cf1322' : '#3f8600' }}>
                      {orderType === 'buy' ? '确认买入' : '确认卖出'}
                    </Button>
                  </Form>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: 60, color: '#999' }}>请从左侧列表选择股票</div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
}
