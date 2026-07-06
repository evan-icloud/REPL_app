# REPL_app

智投金融 - 投资交易平台

## 技术栈

React 18 + TypeScript + Vite + Ant Design Pro

## 核心功能

- 行情看板：大盘指数、股票行情列表
- 投资组合：持仓明细、盈亏分析、委托记录
- 交易：买入/卖出委托、实时行情
- 自选：自选股管理

## 快速开始

```bash
npm install
npm run dev
```

## 项目结构

```
src/
├── layouts/        # ProLayout 布局
├── pages/          # 页面
│   ├── dashboard/  # 行情看板
│   ├── portfolio/  # 投资组合
│   ├── trading/    # 交易
│   └── watchlist/  # 自选
├── api/            # Mock API
├── store/          # Zustand 状态管理
├── types/          # TypeScript 类型定义
└── components/     # 公共组件
```
