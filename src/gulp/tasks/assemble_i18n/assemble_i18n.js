import checkModule from '../../utils/check_module_lib/check_module.js';
checkModule([
  'assemble',
  //'gulp-assemble',
  'gulp-handlebars',
  'gulp-prettify',
  'handlebars-helpers',
  'js-yaml',
  'gulp-foreach',
  'path'
]);


const fs = require('fs-extra');
const path = require('path');
const foreach = require('gulp-foreach');
const through = require('through2');

const assemble = require('assemble');
const prettify = require('gulp-prettify');
const prettifyrc = require('./prettifyrc.json');
const app = assemble();
const yaml = require('js-yaml');

var PAGELANG, TRANSLATION;

module.exports = (gulp, PATH, $) => {

  return () => {

    var LOOP_COUNT = 0;

    gulp.src(`${ PATH.gulp.languages }/*.json`)
      .pipe(foreach((stream, file) => {

        // 翻訳データを取得
        PAGELANG = path.basename(file.path, '.json');
        TRANSLATION = JSON.parse(fs.readFileSync(`${ file.base }${ PAGELANG }.json`))[PAGELANG];

        app.layouts(`${ PATH.src.hbs }/layouts/*.hbs`);
        app.pages(`${ PATH.src.hbs }/**/*.hbs`);
        app.partials(`${ PATH.src.hbs }/partials/**/*.hbs`);
        app.dataLoader('yml', (str, fp) => {
          return yaml.safeLoad(str);
        });

        app.data(`${ PATH.src.hbs }/data/config.yml`);

        return app.toStream('pages')
          .pipe(through.obj((chunk, enc, cb) => {

            chunk.data['assets'] = PATH.assets;
            chunk.data['layoutsDir'] = `${ PATH.src.hbs }/layouts`;
            chunk.data['partialsDir'] = '${ PATH.src.hbs }/partials';
            chunk.data['dataDir'] = `${ PATH.src.hbs }/data`;
            chunk.data['locale'] = PAGELANG;
            chunk.data['localeNum'] = LOOP_COUNT;
            chunk.data['slug'] = path.basename(chunk.path, '.hbs');
            chunk.data['absolutePath'] = chunk.path.substring(chunk.path.indexOf('hbs/') + 4, chunk.path.length);
            chunk.data['relativePath'] = '../'.repeat([chunk.data['absolutePath'].split('/').length - 1]) + (PAGELANG === 'ja' ? '' : '../');
            chunk.data['__'] = TRANSLATION;
            // console.log(chunk.data);
            // console.log(PAGELANG);
            LOOP_COUNT = LOOP_COUNT + 1;

            return cb(null, chunk);
          }))
          .pipe(app.renderFile())
          .pipe($.rename({
            extname: '.html'
          }))
          .pipe(prettify( prettifyrc ))
          .pipe(app.dest(`${ PATH.static_html }/${ (PAGELANG == 'ja' ? '' : `${ PAGELANG }`) }`))
      }));

  }
}