// const webpack = require("webpack");

module.exports = {
  outputDir: "dist",
  publicPath: process.env.BASE_URL,
  productionSourceMap: !1,
  devServer: {
    port: 9029,
    proxy: {
      "/api": {
        target: "https://gank.io/api/v2",
        changeOrigin: !0,
        ws: !0,
        pathRewrite: {
          "^/api": "/",
        },
      },
    },
  },

  configureWebpack: {
    devtool: "source-map",
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     axios: "axios",
    //   }),
    // ],
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/main";`,
      },
    },
  },

  transpileDependencies: ["vuetify"],
};
