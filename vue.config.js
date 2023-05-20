const { defineConfig } = require("@vue/cli-service");
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
let target='http://localhost:8000'
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  devServer: {
  //穿透配置
    // historyApiFallback: true,
    // allowedHosts: "all",
    proxy:{
      '/api': {
        target: target,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        }
      }
     },
   },

  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  }
});
