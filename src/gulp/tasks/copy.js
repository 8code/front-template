module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src(
      [
        `${ PATH.static_html }/${ PATH.img }`,
        `${ PATH.static_html }/${ PATH.css }`,
        `${ PATH.static_html }/${ PATH.js }`
      ],
      {
        base: `${ PATH.static_html }`
      })
      .pipe(gulp.dest(`${ PATH.public }/`));
  }
}