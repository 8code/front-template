import gulp from 'gulp'

import transform from 'vinyl-transform'
import browserify from 'browserify'
//import watchify from 'watchfy'
import assemble from 'assemble'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const app = assemble()
const pkg = require('package.json')


/**
 * javascript
 */
gulp.task('browserify', () => {
  return gulp.src( `${ pkg.src.js }/script.js` )
    .pipe($.babel())
    .pipe(transform((filename)=> {
      return browserify(filename, {
        debug: true
      }).bundle()
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.js }/build.js`))
})

gulp.task('uglify', () => {
  gulp.src( `${ pkg.static_html }/${ pkg.js }/build.js` )
    .pipe($.babel())
    .pipe($.uglify())
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.js }/${ pkg.js }/build.min.js`))
})


/**
 * assemble
 */
gulp.task('load', (cb) => {
  app.layouts(`${ pkg.src.hbs }/layouts/`);
  app.pages(`${ pkg.src.hbs }/*.hbs`);
  app.partials(`${ pkg.src.hbs }/partials/**/*.hbs`);
  cb();
})

gulp.task('assemble', ['load'], () => {
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe(app.dest(`${ pkg.static_html }/`))
})


/**
 * prettify html files
 */
gulp.task('prettify', () => {
  gulp.src( `${ pkg.static_html }/**/*.html` )
    .pipe($.prettify({
      config: '.prettifyrc'
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/`))
})


/**
 * scss
 */
gulp.task('sass', () => {
  return gulp.src(`${ pkg.src.scss }/(style|print)+.scss`)
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe($.sass({
      sourceMap: false
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.css }/`))
})


/**
 * globbing
 */
gulp.task('sass_globbing', () => {
  return gulp.src(`${ pkg.src.scss }/base/*.scss`)
    .pipe($.sassGlob({
      useSingleQuotes: true
    }))
    .pipe($.sass())
    .pipe(gulp.dest(`${ pkg.src.scss }/generated/_base.scss`))

      // '<%= pkg.src.scss %>/generated/_constants.scss': [
      //   '<%= pkg.src.scss %>/constants/*.scss'
      // ],
      // '<%= pkg.src.scss %>/generated/_layouts.scss': [
      //   '<%= pkg.src.scss %>/layouts/*.scss'
      // ],
      // '<%= pkg.src.scss %>/generated/_mixins.scss': [
      //   '<%= pkg.src.scss %>/mixins/*.scss'
      // ],
      // '<%= pkg.src.scss %>/generated/_modules.scss': [
      //   '<%= pkg.src.scss %>/modules/*.scss'
      // ],
      // '<%= pkg.src.scss %>/generated/_utils.scss': [
      //   '<%= pkg.src.scss %>/utils/*.scss'
      // ]
})


/**
 * autoprefixer
 */
gulp.task('autoprefixer', () => {
  gulp.src(`${ pkg.static_html }/${ pkg.css }/style.css`)
    .pipe($.autoprefixer({
      browsers: [
        'last 2 versions',
        'ie 9',
        'safari 8'
      ]
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.css }/style.css`))
})


/**
 * copy
 */
// gulp.task('copy', () => {
//   return gulp.src(``)

//   image: {
//     expand: true,
//     cwd: '<%= pkg.static_html %>/<%= pkg.img %>/',
//     src: '**/*',
//     dest: '<%= pkg.public %>/<%= pkg.img %>/',
//     filter: 'isFile',
//   },
//   css: {
//     expand: true,
//     cwd: '<%= pkg.static_html %>/<%= pkg.css %>/',
//     src: '**/*',
//     dest: '<%= pkg.public %>/<%= pkg.css %>/',
//     filter: 'isFile',
//   },
//   js: {
//     expand: true,
//     cwd: '<%= pkg.static_html %>/<%= pkg.js %>/',
//     src: 'build.min.js',
//     dest: '<%= pkg.public %>/<%= pkg.js %>/',
//     filter: 'isFile',
//   }
// })


/**
 * minify-css
 */
gulp.task('minify-css', () => {
  return gulp.src(`${ pkg.static_html }/${ pkg.css }/(*|!*.min).css`)
    .pipe($.cleanCSS({
      debug: true
    }, (details) => {
      console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
    } ))
    .pipe($.rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.css}/`))
})


/**
 * imagemin
 */
// gulp.task('imagemin', () => {
//   gulp.src(`${ pkg.static_html }/${ pkg.src.img }/**/(*|!sprite).+(png|jpg|jpeg|svg)`)
//     .pipe($.imagemin({
//       optimizationLevel: 3
//     }))
//     .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.img }/`)
// })


/**
 * compress
 */
gulp.task('compress', () => {
  let css = () => {
    gulp.src(`${ pkg.public }/${ pkg.css }/*.min.css`)
      .pipe($.gzip({
        append: true,
        preExtension: 'gz',
        gzipOptions: {
          level: 9
        }
      }))
      .pipe(gulp.dest('./'))
  };
  let js = () => {
    gulp.src(`${ pkg.public }/${ pkg.js }/*.min.js`)
      .pipe($.gzip({
        append: true,
        preExtension: 'gz',
        gzipOptions: {
          level: 9
        }
      }))
      .pipe(gulp.dest('./'))
  }
})


/**
 * spritesmith
 */
gulp.task('sprite', () => {
  let all = () => {
    return gulp.src(`${ pkg.src.img }/sprite/*.png`)
      .pipe($.spritesmith({
        imgName: 'spritesheet.png',
        cssName: '_sprites.scss',
        imgPath: `${ pkg.img }/spritesheet.png`
      }))
      .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.img }/`))
  };
  let mobile = () => {
    return gulp.src(`${ pkg.src.img }/sprite/mobile/*.png`)
      .pipe($.spritesmith({
        imgName: 'spritesheet.mobile.png',
        cssName: '_sprites.mobile.scss',
        imgPath: `${ pkg.img }/spritesheet.mobile.png`
      }))
      .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.img }/`))
  }
})


/**
 * serve
 */
gulp.task('serve', () => {
  gulp.src(`${ pkg.static_html }/`)
      .pipe(webserver({
          livereload: true,
          port: `${ pkg.port }`,
          host: 'localhost'
      }));
})

/**
 * serve
 */
// connect: {
//   server: {
//     options: {
//       livereload: true,
//       keepalive: true,
//       port: '<%= pkg.port %>',
//       base: '<%= pkg.static_html %>',
//       open: 'http://localhost:<%= pkg.port %>',
//     }
//   }
// }

/**
 * watch
 */

galp.task('watch', () => {
  gulp.watch(`${ pkg.src.hbs }/**/*.+(hbs|yml|json)`, ['browserify']);
  gulp.watch(`${ pkg.src.scss }/**/*.scss`, ['sass']);
  gulp.watch(`${ pkg.src.js }/**/*.js`, ['browserify']);

  // 'sass_globbing',
  // 'sass',
  // 'autoprefixer',
  // 'cssmin',
  // 'copy:css'

  // 'assemble',
  // 'prettify'

  // 'browserify',
  // 'uglify',
  // 'copy:js'
})

gulp.task('default', ['babel', 'watch']);
gulp.task('publish', [
  'imagemin'/*,
  'copy:image'*/
]);