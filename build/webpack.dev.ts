import { WebpackOptionsNormalized, Configuration } from "webpack";
import { merge } from "webpack-merge";
import commonConfig from "./webpack.base";
import 'webpack-dev-server';

 const config = merge<WebpackOptionsNormalized | Configuration>(commonConfig, {
  mode: "development",
  // 开发环境本地启动的服务配置
  devServer: {
    port: 9001,
    hot: true,
    open: true,
    historyApiFallback: true,
    compress: true,
    // 接口代理转发
    proxy: {
      "/testapi": {
        target:
          "https://www.easy-mock.com/mock/5dff0acd5b188e66c6e07329/react-template",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/testapi": "" },
      },
    },
  },
  devtool: "eval-source-map",
  // optimization: {
  //   moduleIds: 'named',
  // },
});

export default config