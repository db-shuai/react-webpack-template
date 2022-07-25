import { WebpackOptionsNormalized, Configuration } from "webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
// import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
// import os from 'os'
// import HappyPack from 'happypack'

// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
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
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   include: [srcDir],
      //   exclude: /(node_modules|bower_components)/,
      //   use: ['happypack/loader?id=happybabel'],
      // },
      {
        test: /\.less$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
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
    // 开启 happypack 的线程池
    // new HappyPack({
    //   id: 'happybabel',
    //   loaders: ['babel-loader?cacheDirectory=true'],
    //   threadPool: happyThreadPool,
    //   // cache: true,
    //   verbose: true,
    // }),
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

export default baseConfig;
