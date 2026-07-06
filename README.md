# REPL_app Taro - 智投金融投资交易App

基于 Taro 4.x + React + TypeScript + NutUI 构建的投资交易跨端 App，支持编译为微信小程序、H5 和 Android/iOS 原生应用。

## 技术栈

- Taro 4.2.0 (跨端框架)
- React 18 + TypeScript
- NutUI-React-Taro (UI 组件库)
- Zustand (状态管理)
- React Native (Android/iOS 原生编译)

## 核心功能

- 行情看板：大盘指数卡片、股票列表搜索、点击跳转交易
- 投资组合：资产总览、持仓明细、委托记录
- 交易：买入/卖出委托、价格数量录入、金额预估
- 自选列表：自选管理、添加/移除

## 快速开始

```bash
# 安装依赖
npm install --legacy-peer-deps

# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:weapp

# React Native 开发（Android/iOS）
npm run dev:rn

# 打包
npm run build:h5      # H5
npm run build:weapp   # 微信小程序
npm run build:rn      # React Native
```

## Android/iOS 原生打包

```bash
# 安装 Taro RN CLI
npx @tarojs/cli@4.2.0 rn-init

# Android 打包
npm run build:rn -- --platform android

# iOS 打包
npm run build:rn -- --platform ios
```

## 项目结构

```
src/
├── api/            # Mock API 数据
├── pages/          # 页面
│   ├── dashboard/  # 行情看板
│   ├── portfolio/  # 投资组合
│   ├── trading/    # 交易
│   └── watchlist/  # 自选
├── store/          # Zustand 状态管理
├── types/          # TypeScript 类型定义
├── components/     # 公共组件
├── app.ts          # 应用入口
├── app.config.ts   # 路由 & TabBar 配置
└── app.scss        # 全局样式

config/
├── index.ts        # Taro 构建配置（含 RN 配置）
├── dev.ts          # 开发环境配置
└── prod.ts         # 生产环境配置
```

## RN 原生配置

- App 名称：investApp
- iOS 显示名：智投金融
- Android 包名：com.investapp.taro
```
