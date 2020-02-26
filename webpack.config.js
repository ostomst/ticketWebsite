// import './script.exec.js';

// const path = require('path');

module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
  },
  mode: 'development',
  entry: ['./src/routes/account.route.js', './src/routes/frontend.route.js'],
  output: {
    filename: 'bundles.js',
  },
  // performance: { hints: false },
  watch: true,

  module: {
    rules: [
      {
        test: /\.script\.js$/,
        exclude: /node_modules/,
        use: 'script-loader',
      },

    ],
  },
  resolve: {
    extensions: ['.js', '.es6'],
  },
};
