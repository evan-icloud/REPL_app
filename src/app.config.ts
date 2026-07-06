export default definePagesConfig({
  pages: [
    'pages/dashboard/index',
    'pages/portfolio/index',
    'pages/trading/index',
    'pages/watchlist/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1677ff',
    navigationBarTitleText: '智投金融',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1677ff',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      { pagePath: 'pages/dashboard/index', text: '行情' },
      { pagePath: 'pages/portfolio/index', text: '持仓' },
      { pagePath: 'pages/trading/index', text: '交易' },
      { pagePath: 'pages/watchlist/index', text: '自选' }
    ]
  }
});

function definePagesConfig(config: any) {
  return config;
}
