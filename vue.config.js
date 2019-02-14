// const webpack = require("webpack");

module.exports = {
  productionSourceMap: !1,
  devServer: {
    port: 9029,
    proxy: {
      "/api": {
        target: "http://gank.io/",
        changeOrigin: !0,
        ws: !0
      }
    }
  },

  configureWebpack: {
    devtool: "source-map"
    //   plugins: [
    //     new webpack.ProvidePlugin({
    //       axios: "axios"
    //     })
    //   ]
  },

  css: {
    loaderOptions: {
      sass: {
        data: `@import "~@/style/main"`
      }
      // stylus: {
      //   import: [`~@/style/_color`, `~@/style/_mixin`]
      // }
    }
  },

  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
      config.module
        .rule("scss")
        .oneOf(match)
        .use("sass-loader")
        .tap(opt => Object.assign(opt, { data: `@import "~@/style/main";` }));
    });
  }
};
