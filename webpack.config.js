const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: './src/main.js',
  output: {
    path: __dirname,
    filename: 'dist/bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        test: /\.js$/,
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
};
