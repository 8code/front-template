
module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src(`${ PATH.src.scss }/{style,print}.scss`)
      .pipe($.plumber({
        errorHandler: function(err) {
          console.log(err.messageFormatted);
          this.emit('end');
        }
      }))
      .pipe($.sass({
        sourceMap: true
      }))
      .pipe(gulp.dest(`${ PATH.static_html }/${ PATH.css }/`))
  }
}