module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src(`${ PATH.static_html }/`)
        .pipe($.webserver({
            livereload: true,
            port: `${ PATH.port }`,
            host: '0.0.0.0',
            directoryListing: false//,
            //open: true
        }));
  }
}