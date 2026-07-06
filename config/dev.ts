export default {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false,
        config: {
          namingPattern: 'module',
          generateScopedName: '[local]--[hash:base64:5]'
        }
      }
    }
  },
  rn: {
    debug: true
  }
};
