export default {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: { filename: 'js/[name].[hash:8].js', chunkFilename: 'js/[name].[chunkhash:8].js' },
    postcss: {
      autoprefixer: { enable: true, config: {} },
      cssModules: { enable: false, config: { namingPattern: 'module', generateScopedName: '[local]--[hash:base64:5]' } }
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    }
  },
  rn: {
    debug: false
  }
};
