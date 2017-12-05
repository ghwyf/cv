const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//scss单独打成文件,不在bundle中
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].min.css",
  disable: process.env.NODE_ENV === "development"
});
const PROD = process.env.NODE_ENV === "production";
console.log(`environment:${process.env.NODE_ENV}`);
console.log(`platform:${process.platform}`);
//开发环境 线上dev设置为true
module.exports = {
  entry: './src/ts/bootstrap',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: 'bundle'+(PROD ? '.[chunkhash]' : '')+'.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    //每次打包清空dist文件夹
    new CleanWebpackPlugin(['dist']),
    //单页应用 指定入口html文件 
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    extractSass,
  ]
};
