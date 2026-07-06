import type { UserConfigExport } from '@tarojs/cli';
import devConfig from './dev';
import prodConfig from './prod';

export default {
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  h5: {},
  rn: {
    appName: 'investApp',
    ios: {
      displayName: '智投金融'
    },
    android: {
      packageName: 'com.investapp.taro',
      applicationId: 'com.investapp.taro'
    }
  },
  ...mergeConfig(devConfig, prodConfig)
} as UserConfigExport;

function mergeConfig(dev: any, prod: any) {
  if (process.env.NODE_ENV === 'development') {
    return { ...dev };
  }
  return { ...prod };
}
