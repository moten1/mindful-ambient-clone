// webpack.config.js
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development', // 'development' or 'production'
  
  entry: {
    popup: './src/popup.js',        // Your popup logic
    background: './src/background.js', // Your background script
    content: './src/content.js'     // Optional content script
  },
  
  output: {
    filename: '[name].bundle.js', // popup.bundle.js, background.bundle.js, etc.
    path: path.resolve(__dirname, 'dist'),
    clean: true // Clears dist folder before each build
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // For modern JS features
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // Allows importing CSS in JS
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource', // Handles images/icons
        generator: {
          filename: 'assets/[name][ext]'
        }
      }
    ]
  },
  
  resolve: {
    extensions: ['.js', '.json']
  },
  
  devtool: 'cheap-module-source-map', // Good for debugging
  optimization: {
    minimize: process.env.NODE_ENV === 'production' // Minify only in prod
  }
};
