import webpack from "webpack";
import { merge } from "webpack-merge";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
// import {  DllReferencePlugin } from "webpack";
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import WebpackBundleAnalyzer from "webpack-bundle-analyzer";

import commonConfig from "./webpack.base";

let config = merge(commonConfig, {
  mode: "production",
  plugins: [
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].[contenthash:8].css",
    //   chunkFilename: "chunk/[id].[contenthash:8].css",
    // }),
    // new DllReferencePlugin({
    //   // 描述 react 动态链接库的文件内容
    //   manifest: require('../dist/react.manifest.json'),
    // }),

    new webpack.ids.HashedModuleIdsPlugin(),
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         name: "commons",
  //         chunks: "initial",
  //         minChunks: 2
  //       }
  //     }
  //   }
  // }
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 800000,
  },
  optimization: {
    runtimeChunk: {
      name: "manifest",
    },
    splitChunks: {
      chunks: "all", // 默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
      cacheGroups: {
        dll: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router|babel-polyfill|mobx|mobx-react|mobx-react-dom|antd|@ant-design)/,
          minChunks: 1,
          priority: 2,
          name: "dll",
        },
        codeMirror: {
          test: /[\\/]node_modules[\\/](react-codemirror|codemirror)/,
          minChunks: 1,
          priority: 2,
          name: "codemirror",
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 1,
          priority: 1,
          name: "vendors",
        },
      },
    },
  },
});

if (process.env.npm_lifecycle_event === "build:watch") {
  config = merge(config, {
    devtool: "cheap-source-map",
  });
}
if (process.env.npm_lifecycle_event === 'build:report') {
  const BundleAnalyzerPlugin = WebpackBundleAnalyzer.BundleAnalyzerPlugin;
  config?.plugins?.push(new BundleAnalyzerPlugin());
}

const smp = new SpeedMeasurePlugin();


export default smp.wrap(config as any);
