const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'src/common/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      src: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        query: { modules: true },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.LAMBDA_ENDPOINT': JSON.stringify(
        process.env.LAMBDA_ENDPOINT,
      ),
      'process.env.LAMBDA_API_KEY': JSON.stringify(process.env.LAMBDA_API_KEY),
      'process.env.ACCESS_KEY_ID': JSON.stringify(process.env.ACCESS_KEY_ID),
      'process.env.SECRET_ACCESS_KEY': JSON.stringify(process.env.SECRET_ACCESS_KEY),
      'process.env.REGION': JSON.stringify(process.env.REGION),
      'process.env.S3_BUCKET': JSON.stringify(process.env.S3_BUCKET),
    }),
  ],
}
