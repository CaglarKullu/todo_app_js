const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Switch to 'production' when ready to deploy
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map', // Useful for development, switch to a different option for production
  devServer: {
    static: './dist/',
    devMiddleware: {
        publicPath: '/dist/',
        writeToDisk: true,
     },    
   },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Restaurant Page',
      template: './src/index.html', // Template file for your HTML
      cache:false
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/', // Ensure correct base path for all assets, especially important for GitHub Pages
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Transpile JavaScript files using Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Compile ES6+ down to ES5
          },
        },
      },
      {
        test: /\.module\.css$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader',
            options: {
              modules: true, 
            },
          },
        ],
      },
      {
        // For global CSS (not CSS modules)
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/', 
              publicPath: 'assets/', 
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      // Additional loaders for other file types can be added here
    ],
  },
  watch: true,
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  cache: false, // Disable cache for development
};