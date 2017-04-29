module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src(`${ PATH.static_html }/${ PATH.css }/style.css`)
      .pipe($.autoprefixer({
        browsers: [
          'last 2 versions',
          'ie 9',
          'safari 8'
        ]
      }))
      .pipe(gulp.dest(`${ PATH.static_html }/${ PATH.css }/`))
  }
}