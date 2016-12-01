import gulp from 'gulp'
import assemble from 'assemble'
import browserify from 'browserify'
import babelify from 'babelify'
import watchify from 'watchify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import transform from 'vinyl-transform'
import through2 from 'through2'
import gulpLoadPlugins from 'gulp-load-plugins'

const $ = gulpLoadPlugins()
const app = assemble()
const pkg = require('./package.json')


/**
 * javascript
 */
gulp.task('browserify', () => {

  watchify(browserify(`${ pkg.src.js }/script.js`, { debug: true }))
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .on('error', (err) => { console.log(`Error : ${ err.message }`); /*console.log(err.stack);*/ })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe($.rename('build.min.js'))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.js }/`))
})


/**
 * assemble
 */
gulp.task('load', (cb) => {
  app.layouts(`${ pkg.src.hbs }/layouts/*.hbs`);
  app.pages(`${ pkg.src.hbs }/*.hbs`);
  app.partials(`${ pkg.src.hbs }/partials/**/*.hbs`);
  cb();
})

gulp.task('assemble', ['load'], () => {
  return app.toStream('pages')
    .pipe(app.renderFile())
    .pipe($.rename({
      extname: '.html'
    }))
    .pipe(app.dest(`${ pkg.static_html }/`))
})


/**
 * prettify html files
 */
gulp.task('prettify', ['assemble'], () => {
  gulp.src( `${ pkg.static_html }/**/*.html` )
    .pipe($.prettify({
      config: '.prettifyrc'
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/`))
})


/**
 * globbing
 */
gulp.task('sass_globbing', () => {

  let files = [
        'base',
        'constants',
        'layouts',
        'mixins',
        'modules',
        'utils'
      ];

  let globbing = (files) => {
    files.forEach(f => {
      gulp.src(`${f}/*.scss`, {cwd: `${ pkg.src.scss }/`})
        .pipe($.sassGlobbing(
          {
            path: `_${f}.scss`
          },
          {
            useSingleQuotes: true,
            signature: '/* generated with gulp-sass-globbing */'
          }
        ))
        //.pipe($.sass())
        .pipe(gulp.dest(`${ pkg.src.scss }/generated/`))
    });
  };

  // taskをforEachとか破壊力高いので何とかしたい
  globbing(files);
})


/**
 * scss
 */
gulp.task('sass', () => {
  return gulp.src(`${ pkg.src.scss }/{style,print}.scss`)
    .pipe($.plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe($.sass({
      sourceMap: true
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.css }/`))
})


/**
 * autoprefixer
 */
gulp.task('autoprefixer', ['sass'], () => {
  gulp.src(`${ pkg.static_html }/${ pkg.css }/style.css`)
    .pipe($.autoprefixer({
      browsers: [
        'last 2 versions',
        'ie 9',
        'safari 8'
      ]
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.css }/`))
})


/**
 * minify-css
 */
gulp.task('minify-css', ['autoprefixer'], () => {
  return gulp.src([
      `${ pkg.static_html }/${ pkg.css }/*.css`,
      `!${ pkg.static_html }/${ pkg.css }/*.min.css`,
    ])
    .pipe($.cleanCss({
      debug: true
    }, (details) => {
      console.log(`${ details.name }: ${ details.stats.originalSize } Byte > ${ details.stats.minifiedSize } Byte`);
    } ))
    .pipe($.rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.css}/`))
})


/**
 * copy
 */
gulp.task('copy', () => {
  return gulp.src(
    [
      `${ pkg.static_html }/${ pkg.img }`,
      `${ pkg.static_html }/${ pkg.css }`,
      `${ pkg.static_html }/${ pkg.js }`
    ],
    {
      base: `${ pkg.static_html }`
    })
    .pipe(gulp.dest(`${ pkg.public }/`));
})


/**
 * imagemin
 */
gulp.task('imagemin', () => {
  gulp.src([`${ pkg.static_html }/${ pkg.src.img }/**/*.{png,jpg,jpeg,svg}`,
            `!${ pkg.static_html }/${ pkg.src.img }/sprite/*.png`])
    .pipe($.imagemin({
      optimizationLevel: 3
    }))
    .pipe(gulp.dest(`${ pkg.static_html }/${ pkg.img }/`))
})


/**
 * compress
 */
gulp.task('compress', () => {
  let css = () => {
    gulp.src(`${ pkg.public }/${ pkg.css }/*.min.css`)
      .pipe($.gzip({
        append: true,
        gzipOptions: {
          level: 9
        }
      }))
      .pipe(gulp.dest(`${ pkg.public }/${ pkg.css }/`))
  };
  let js = () => {
    gulp.src(`${ pkg.public }/${ pkg.js }/*.min.js`)
      .pipe($.gzip({
        append: true,
        gzipOptions: {
          level: 9
        }
      }))
      .pipe(gulp.dest(`${ pkg.public }/${ pkg.js }/`))
  };
  css();
  js();
})


/**
 * spritesmith
 */
gulp.task('sprite', () => {
  let desktop = gulp.src(`${ pkg.src.img }/sprite/*.png`)
                  .pipe($.spritesmith({
                    imgName: 'spritesheet.png',
                    cssName: `_sprites.scss`,
                    imgPath: `/${ pkg.img }/spritesheet.png`,
                    padding: 20
                  }));
  let mobile = gulp.src(`${ pkg.src.img }/sprite/mobile/*.png`)
                .pipe($.spritesmith({
                  imgName: 'spritesheet.mobile.png',
                  cssName: '_sprites.mobile.scss',
                  imgPath: `/${ pkg.img }/spritesheet.mobile.png`,
                  padding: 40
                }));

  // 書き方次第でまとめられそう
  desktop.img.pipe(gulp.dest(`${ pkg.static_html }/${ pkg.img }/`));
  desktop.css.pipe(gulp.dest(`${ pkg.src.scss }/`));
  mobile.img.pipe(gulp.dest(`${ pkg.static_html }/${ pkg.img }/`));
  mobile.css.pipe(gulp.dest(`${ pkg.src.scss }/`));
})


/**
 * serve
 * e.g. hostsに[127.0.0.1 localhost]が記載されている必要があります。
 */
gulp.task('serve', () => {
  gulp.src(`${ pkg.static_html }/`)
      .pipe($.webserver({
          livereload: true,
          port: `${ pkg.port }`,
          host: '0.0.0.0',
          directoryListing: false//,
          //open: true
      }));
})


/**
 * watch
 */
gulp.task('watch', () => {
  gulp.watch(`${ pkg.src.hbs }/**/*.{hbs,yml,json}`, ['prettify']);
  gulp.watch(`${ pkg.src.scss }/**/*.scss`, ['minify-css']);
  gulp.watch(`${ pkg.src.js }/**/*.js`, ['browserify']);
})

gulp.task('default', ['serve', 'sass_globbing', 'watch']);

gulp.task('publish', [
  'imagemin',
  'copy',
  'compress'
]);