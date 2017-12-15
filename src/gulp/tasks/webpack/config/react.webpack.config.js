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
          test: /\.js[x]?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    devServer: {
      //hot: true,
      contentBase: `${ PATH.dist }/`,
      port: 6003,
      inline: true
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };
}