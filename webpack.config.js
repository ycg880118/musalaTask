const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './app.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'server.js'
  },
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to:'public',
        },
        {
          from: '.env',          
        },
      ],
    }),
  ]
};