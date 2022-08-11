import { WebpackOptionsNormalized, Configuration } from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'

const srcDir = path.join(__dirname, "../src");
const devMode = process.env.NODE_ENV !== "production";
const baseConfig: Configuration = {
  entry: {
    main: path.join(__dirname, "../src/main.tsx"),
  },
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].[chunkhash:8].js",
    // publicPath: "/",
    chunkFilename: "chunk/[name].[chunkhash:8].js",
    clean: true,
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|jsx)$/,
      //   include: [srcDir],
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   options: {
      //     fix: true,
      //   },
      // },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          "ts-loader",
          {
            loader: "thread-loader",
            options: {
              workerParallelJobs: 2,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          // devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: ["url-loader"],
        include: [srcDir],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: ["url-loader"],
        include: [srcDir],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: ["url-loader"],
        include: [srcDir],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcDir}/index.html`,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: `${srcDir}/assets/images/nowthen.jpg`,
    //       to: 'nowthen.jpg',
    //     },
    //   ],
    // }),
    // new AntdDayjsWebpackPlugin()
  ],
  resolve: {
    alias: {
      "@": srcDir,
      "@views": `${srcDir}/views`,
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  // optimization: {
  //   removeAvailableModules: true, // 删除已解决的chunk (默认 true)
  //   removeEmptyChunks: true, // 删除空的chunks (默认 true)
  //   mergeDuplicateChunks: true // 合并重复的chunk (默认 true)
  // }
};
import SpeedMeasurePlugin from "speed-measure-webpack-plugin";

const smp = new SpeedMeasurePlugin();

export default baseConfig;
