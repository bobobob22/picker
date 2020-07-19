var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/App.js',
  output: {
    path: path.resolve('lib'),
    filename: 'BobobobPicker.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
    ]
  }
}
