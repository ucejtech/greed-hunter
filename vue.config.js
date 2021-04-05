module.exports = {
  publicPath: '/greedy-hunter/',
  transpileDependencies: [
    'vuetify',
  ],
  chainWebpack: (config) => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
          options: {
            svgo: false,
          },
        },
      ],
    },
  },
};
