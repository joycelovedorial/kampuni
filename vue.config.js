const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('background_img')
      .test(/\.PNG$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'img/[name].[hash:8].[ext]',
      });
  },
};

// module.exports = {
//   entry: './path/to/my/entry/file.js',
// };