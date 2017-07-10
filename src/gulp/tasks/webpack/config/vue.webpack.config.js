const webpack = require('webpack');
const __root = process.env.PWD;

module.exports = (PATH) => {

  return {
    watch: true,
    entry: {
      app: `${ __root }/${ PATH.src.js }/main.js`
    },
    output: {
      path: `${ __root }/${ PATH.dist }/${ PATH.js }/`,
      filename: "build.min.js"
    },
    // devServer: {
    //   contentBase: `${ __root }/${ PATH.dist }/`,
    //   hot: true,
    //   port: 6003,
    //   historyApiFallback: true
    // },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue: `${ __root }/${ PATH.src.vue }/app.js`
      }
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' }}),
      new webpack.ProvidePlugin({ $: "jquery" })
      //new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }})
      //new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        // {
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   enforce: 'pre',
        //   include: [`${__root}/${ PATH.src.vue }`]
        // },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: generateLoaders(['css-loader']),
              // postcss: generateLoaders(['css-loader']),
              // sass: generateLoaders(['css-loader', 'sass-loader?indentedSyntax']),
              scss: generateLoaders(['css-loader', 'sass-loader']),
              js: {
                loader: 'babel-loader',
                options: {
                  presets: ['es2015']
                }
              }
            },
            postcss: [
              require('autoprefixer')({
                browsers: ['last 2 versions']
              })
            ]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [`${__root}/${ PATH.src.vue }`],
          exclude: /node_modules/,
          query: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
          }
        }
      ]
    }
  };

  function generateLoaders(loaders) {

    const sourceLoader = loaders.map((loader) => {
      return `${loader}?sourceMap`;
    }).join('!')

    return ['vue-style-loader', sourceLoader].join('!')
  }
}