import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import transform from 'vinyl-transform'

module.exports = (gulp, PATH, $) => {
  return () => {
    watchify(browserify(`${ PATH.src.js }/main.js`, { debug: true }))
      .transform(babelify, { presets: ['es2015'] })
      .bundle()
      .on('error', (err) => { console.log(`Error : ${ err.message }`); /*console.log(err.stack);*/ })
      .pipe(source('build.js'))
      .pipe(buffer())
      .pipe($.uglify())
      .pipe($.rename('build.min.js'))
      .pipe(gulp.dest(`${ PATH.static_html }/${ PATH.js }/`))
  }
}