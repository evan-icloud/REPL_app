import type { UserConfigExport } from '@tarojs/cli';
import devConfig from './dev';
import prodConfig from './prod';

export default {
  projectName: 'invest-app-taro',
  framework: 'react',
  logger: {
    quiet: false,
    stats: true
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
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
