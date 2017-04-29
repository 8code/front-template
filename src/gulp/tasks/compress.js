module.exports = (gulp, PATH, $) => {

  let css = () => {
    gulp.src(`${ PATH.public }/${ PATH.css }/*.min.css`)
      .pipe($.gzip({
        append: true,
        gzipOptions: {
          level: 9
        }
      }))
      .pipe(gulp.dest(`${ PATH.public }/${ PATH.css }/`))
  };

  let js = () => {
    gulp.src(`${ PATH.public }/${ PATH.js }/*.min.js`)
      .pipe($.gzip({
        append: true,
        gzipOptions: {
          level: 9
        }
      }))
      .pipe(gulp.dest(`${ PATH.public }/${ PATH.js }/`))
  };

  return () => {
    css();
    js();
  }
}