import gulp from 'gulp';
import fs from 'fs-extra';
import gulpLoadPlugins from 'gulp-load-plugins';
import PackageManager from 'front-package-manager';

const cyan    = '\u001b[36m';
const reset   = '\u001b[0m';
const conf = require('./config/config.json');
const $ = gulpLoadPlugins({
  pattern: ['gulp-*', 'gulp.*', 'fs-extra'],
  rename: { 'fs-extra': 'fs' }
})

const packageManager = new PackageManager({
  uses: conf.uses,
  globalPlugins: $,
  taskRunner: gulp,
  taskConfig: conf,
  taskPrefix: 'gulp-module-task-',
  taskPath: './gulp/tasks'
});

packageManager.checkPackages();


/**
 * Spread2Json
 */
gulp.task('spread2json', packageManager.getTask('spread2json'))


/**
 * TemplateEngine
 */
gulp.task('assemble', packageManager.getTask('assemble'))
gulp.task('assemble_i18n', packageManager.getTask('assemble_i18n'))


/**
 * JavaScript
 */
gulp.task('browserify', packageManager.getTask('browserify'))
gulp.task('webpack', packageManager.getTask('webpack'))
gulp.task('webpack-react', packageManager.getTask('webpack', { 'use': 'react' }))
gulp.task('webpack-vue', packageManager.getTask('webpack', { 'use': 'vue' }))


/**
 * SCSS
 */
gulp.task('sass_globbing', packageManager.getTask('sass_globbing'))
gulp.task('sass', packageManager.getTask('sass'))


/**
 * Compresser/Optimizer
 */
gulp.task('imagemin', packageManager.getTask('imagemin'))
gulp.task('sprite', packageManager.getTask('sprite_smith'))
gulp.task('compress', packageManager.getTask('compress'))


/**
 * Hosting
 */
gulp.task('browser-sync', packageManager.getTask('browser_sync', { 'hmr': false, 'use': 'vue' }))


/**
 * watch
 */
gulp.task('watch', () => {
  gulp.watch(`${ conf.src.hbs }/**/*.{hbs,yml,json}`, ['assemble']);
  gulp.watch(`${ conf.src.scss }/**/*.scss`, ['sass']);
  //gulp.watch(`${ conf.src.js }/**/*.js`, ['browserify']);
  gulp.watch(`${ conf.src.js }/**/*.js`, ['webpack']);
  //gulp.watch(`${ conf.src.js }/**/*.js`, ['webpack-vue']);
  //gulp.watch(`${ conf.src.vue }/**/*.{vue,js}`, ['webpack-vue']);
})

gulp.task('default', ['browser-sync', 'sass_globbing', 'watch']);
gulp.task('build', ['imagemin', 'compress']);
gulp.task('get', ['spread2json']);