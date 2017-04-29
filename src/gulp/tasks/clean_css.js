module.exports = (gulp, PATH, $) => {
  return () => {

    gulp.src([
        `${ PATH.static_html }/${ PATH.css }/*.css`,
        `!${ PATH.static_html }/${ PATH.css }/*.min.css`,
      ])
      .pipe($.cleanCss({
        debug: true
      }, (details) => {
        console.log(`${ details.name }: ${ details.stats.originalSize } Byte > ${ details.stats.minifiedSize } Byte`);
      } ))
      .pipe($.rename({
        extname: '.min.css'
      }))
      .pipe(gulp.dest(`${ PATH.static_html }/${ PATH.css}/`))

  }
}