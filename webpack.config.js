var path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/NotTypist.jsx',
  output: {
    path: path.resolve('lib'),
    filename: 'NotTypist.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
