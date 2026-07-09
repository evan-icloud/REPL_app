const path = require('path');
const fs = require('fs');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { getMetroConfig } = require('@tarojs/rn-supporter');

const stubsDir = path.resolve(__dirname, 'stubs');

const REDIRECT = {
  'react-native-svg': path.join(stubsDir, 'react-native-svg.js'),
  'react-native-root-siblings': path.join(stubsDir, 'react-native-root-siblings.js'),
  '@nutui/nutui-react-taro': path.join(stubsDir, 'nutui-react-taro.js'),
  'expo-camera': path.join(stubsDir, 'expo.js'),
  'expo-permissions': path.join(stubsDir, 'expo.js'),
  'expo-modules-core': path.join(stubsDir, 'expo.js'),
};

module.exports = (async function () {
  const baseConfig = await getDefaultConfig(__dirname);
  const taroConfig = await getMetroConfig();
  const merged = mergeConfig(baseConfig, taroConfig, {});

  merged.resolver = merged.resolver || {};
  merged.resolver.extraNodeModules = Object.assign(
    {},
    merged.resolver.extraNodeModules,
    {
      'react-native-svg': stubsDir,
      'react-native-root-siblings': stubsDir,
      '@nutui/nutui-react-taro': path.join(stubsDir, 'nutui-react-taro.js'),
    }
  );
  merged.watchFolders = Array.from(new Set([...(merged.watchFolders || []), stubsDir]));

  const originalResolveRequest = merged.resolver.resolveRequest;
  merged.resolver.resolveRequest = (context, moduleName, platform) => {
    if (REDIRECT[moduleName]) {
      const stubPath = REDIRECT[moduleName];
      if (fs.existsSync(stubPath)) {
        return { type: 'sourceFile', filePath: stubPath };
      }
    }
    if (originalResolveRequest) {
      return originalResolveRequest(context, moduleName, platform);
    }
    return context.resolveRequest(context, moduleName, platform);
  };

  return merged;
})();