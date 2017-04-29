import ejsBuild from '../utils/ejs_i18n_lib/ejsBuild'
import createTemplateData from '../utils/ejs_i18n_lib/createTemplateData'
import path from 'path'
import fs from 'fs-extra'
import __ from '../utils/spread2json_lib/__'
import metaLocales from '../utils/spread2json_lib/locales'

const infoData = require('../utils/spread2json_lib/info.json');
global.__ = __;
global.metaLocales = metaLocales;

module.exports = (gulp, PATH, $) => {
  return () => {

    gulp.src(`${ PATH.gulp.languages }/*.json`)
      .pipe($.foreach((stream, file) => {
        let pageLang = path.basename(file.path, '.json');
        let templateData = createTemplateData(PATH);
        let compiled;

        templateData.locale = pageLang;
        global.translation = JSON.parse(fs.readFileSync(`${ file.base }${ pageLang }.json`))[pageLang];

        for(var i = 0; i < infoData.language_count; i++){

          compiled = ejsBuild(PATH, $, [
              `${ PATH.src.ejs }/**/detail.ejs`
            ], pageLang, templateData, file, __('theme_' + (i + 1) + '_meta_name'), i + 1);
          // if(i == (infoData.language_count - 1)) {
          //   return compiled;
          // }
        }
        return compiled;

        // return stream;
      }))
  }
}