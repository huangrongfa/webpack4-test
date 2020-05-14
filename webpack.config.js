const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const  apiConfig = require('./config/api')
const HappyPack  = require('happypack')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/ //忽略时时监听
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true
/*     proxyTable: { // 设置代理
      '^/api': {
        target: 'http://rongfa.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }, */
  },
  optimization: {
    // 分割代码块
    splitChunks: {
      // 缓存组
      cacheGroups: {
        // 公共模块
        common: {
          minSize: 0,
          minChunks: 2, 
          chunks: 'initial'
        }
      }
    },
    minimizer: []
  },
  resolve: { // 解析第三方包
    modules: [path.resolve('node_modules')],
    alias: { // 配置别名称
      '@': './src' 
    },
    extensions: ['.js', '.json', '.css'] //可以省略文件后缀名
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash:8].js',
    // publicPath: ''
  },
  devtool: 'cheap-module-eval-source-map', // 建议使用在开发环境
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        hash:true
      }
    }),
    new OptimizeCssAssetsPlugin({ // 压缩css代码
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { 
        safe: true, 
        discardComments: { removeAll: true } 
      },
      canPrint: true
    }),
    new UglifyJsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), // 忽略 moment 的本地化内容
    new CleanWebpackPlugin({}),
/*     new webpack.DllReferencePlugin({ // 查找任务清单
      manifest: path.resolve(__dirname, 'dist', 'manifest.json')
    }), */
    new MiniCssExtractPlugin({
      filename: '/style/[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      { from: 'document/index.txt', to: 'document/'},
    ]),
    new webpack.ProvidePlugin({
      '$': 'jquery'
    }),
    new webpack.DefinePlugin({ // 区分环境变量
      API_CONFIG: JSON.stringify(apiConfig)
    }),
    new HappyPack({
      id: 'js',
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }]
    })
  ],
  externals: {
    jquery: 'jquery'
  },
  module: { // 模块
    noParse: '/jquery/', // 不去解析里面的依赖关系
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
/*         use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        } */
        use: 'HappyPack/loader?id=js',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              outputPath: '/images/',
              publicPath: './images/',
            }
          }
        ]
      }
    ]
  }
}