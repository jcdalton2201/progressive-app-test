var path = require('path');
module.exports = {
  devtool: 'source-map',
  entry: './src/build.js',
  output: {
    filename: 'weather-web.js',
    path: path.resolve(__dirname, '.temp')
  },
  module:{
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(process.cwd(), 'src'),
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options:{
          fix: true,
          failOnWarning: false,
          failOnError: true

        }
      }
    ]
  }
};
