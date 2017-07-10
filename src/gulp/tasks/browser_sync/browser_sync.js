const browserSync = require('browser-sync').create();
const history = require('connect-history-api-fallback');
const __root = process.env.PWD;

module.exports = (gulp, PATH, $, option = {}) => {

  let conf = {
    use: option.use || 'default',
    hmr: option.hmr || 'false'
  };

  // if(conf.hmr) {
  //   const webpack = require('webpack');
  //   const webpackConfig = require(`${ __root }/config/${ conf.use }.webpack.config`)(PATH);
  //   const bundler = webpack(webpackConfig);
  //   const webpackDevMiddleware = require('webpack-dev-middleware');
  //   const webpackHotMiddleware = require('webpack-hot-middleware');

  //   return () => {
  //     return browserSync.init({
  //       port: 6003,
  //       browser: 'Google Chrome',
  //       server: {
  //         baseDir: `${ PATH.dist }/`,
  //         middleware: [
  //           // webpackDevMiddleware(bundler, {
  //           //   publicPath: webpackConfig.output.path,
  //           //   stats: { colors: true }
  //           // }),
  //           webpackHotMiddleware(bundler)
  //         ]
  //       },
  //       files: [
  //         `${ PATH.dist }/**/*.html`,
  //         `${ PATH.dist }/${ PATH.css }/**/*.css`,
  //         `${ PATH.dist }/${ PATH.img }/**`
  //       ]
  //     });
  //   }
  // }

  return () => {

    return browserSync.init({
      port: 6003,
      browser: 'Google Chrome',
      server: {
        baseDir: `${ PATH.dist }/`,
        middleware: [history()]
      },
      https: false,
      files: [
        `${ PATH.dist }/**`
      ]
    })
  }
}