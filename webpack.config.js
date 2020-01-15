var webpack = require('webpack')
var path = require('path');

var config = {
    entry: [
      path.resolve(__dirname, 'main.mainprocess.js')
    ],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, ''),
    },
    target: 'electron-renderer',
    mode: 'production',
    module: {
        rules: [
            {
            test: /\.js$/,
            type: 'javascript/esm',
            include: [
                path.resolve(__dirname, "mainprocess")
            ],
            exclude: /node_modules/
            }
        ]
    },
    plugins: [
    ]
  };

  module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.output.filename = 'main.dev.js';
        config.devtool = 'source-map';
        config.mode = null;
        config.plugins = [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('DEV')
              })
        ]
    }

    return config;
  }