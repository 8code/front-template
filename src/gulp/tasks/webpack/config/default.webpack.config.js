const webpack = require('webpack');
const __root = process.env.PWD;

module.exports = (PATH) => {

  return {
    bail: true,
    watch: true,
    entry: `${ __root }/${ PATH.src.js }/main.js`,
    output: {
      path: `${ __root }/${ PATH.dist }/${ PATH.js }/`,
      filename: "build.min.js"
    },
    plugins: [
      //new webpack.optimize.UglifyJsPlugin()
      //new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js']
    }
  };
}