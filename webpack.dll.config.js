/* const path = require('path')
const webpack = require('webpack')


// 建立任务清单配置
module.exports = {
  mode: 'development',
  entry: {
    vuerouter: ['vue-router', 'vuex']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name].js',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]',
      path: path.resolve(__dirname, 'dist', 'manifest.json')
    }),
  ]
} */