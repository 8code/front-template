const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const __root = process.env.PWD;

module.exports = (gulp, PATH, $, option = {}) => {

  let conf = {
    use: option.use || 'default'
  };
  const webpackConfig = require(`./config/${ conf.use }.webpack.config`)(PATH);

  return () => {
    return gulp.src(`${ PATH.src.js }/main.js`)
      .pipe($.plumber())
      .pipe(webpackStream(webpackConfig, webpack))
      .pipe(gulp.dest(`${ PATH.dist }/${ PATH.js }/`))
  }
}