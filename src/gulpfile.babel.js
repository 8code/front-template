import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
import fs from 'fs-extra'

const pkg = require('./package.json')
const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*', 'fs-extra'],
  rename: { 'fs-extra': 'fs' }
})

function getTask(task, option = null) {
  return require(`${ pkg.gulp.tasks }/${ task }`)(gulp, pkg, $, option);
}

/**
 * javascript
 */
gulp.task('browserify', getTask('browserify'))


/**
 * assemble
 */
gulp.task('load', getTask('assemble_load'))
gulp.task('assemble', ['load'], getTask('assemble_load', app))


/**
 * prettify html files
 */
gulp.task('prettify', ['assemble'], getTask('prettify'))


/**
 * globbing
 */
gulp.task('sass_globbing', getTask('sass_globbing'))


/**
 * scss
 */
gulp.task('sass', getTask('sass'))


/**
 * autoprefixer
 */
gulp.task('autoprefixer', ['sass'], getTask('autoprefixer'))


/**
 * minify-css
 */
gulp.task('minify-css', ['autoprefixer'], getTask('clean_css'))


/**
 * copy
 */
gulp.task('copy', () => getTask('copy'))


/**
 * imagemin
 */
gulp.task('imagemin', getTask('imagemin'))


/**
 * compress
 */
gulp.task('compress', getTask('compress'))


/**
 * spritesmith
 */
gulp.task('sprite', getTask('sprite_smith'))


/**
 * serve
 * e.g. hostsに[127.0.0.1 localhost]が記載されている必要があります。
 */
gulp.task('serve', getTask('serve'))


/**
 * watch
 */
gulp.task('watch', () => {
  gulp.watch(`${ pkg.src.hbs }/**/*.{hbs,yml,json}`, ['prettify']);
  gulp.watch(`${ pkg.src.scss }/**/*.scss`, ['minify-css']);
  gulp.watch(`${ pkg.src.js }/**/*.js`, ['browserify']);
})

gulp.task('default', ['serve', 'sass_globbing', 'watch']);
gulp.task('publish', ['imagemin', 'copy', 'compress']);
//gulp.task('gas', ['spread2json']);