const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'yawin.min.js',
    library: 'yawin',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // css 提取成单独打包文件
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.ts(x)?$/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: false,
              appendTsSuffixTo: [],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'yawin.min.css' }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDom',
  },
};

module.exports = config;
