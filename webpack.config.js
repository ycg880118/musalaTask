const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './app.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  externals: [nodeExternals()]
};