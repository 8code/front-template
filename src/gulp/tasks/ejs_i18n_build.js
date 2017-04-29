import ejsBuild from '../utils/ejs_i18n_lib/ejsBuild'
import createTemplateData from '../utils/ejs_i18n_lib/createTemplateData'
import clean from '../utils/ejs_i18n_lib/clean'
import path from 'path'
import fs from 'fs-extra'

module.exports = (gulp, PATH, $) => {

  return () => {

    //clean(`${ PATH.static_html }/**/*.html`);

    gulp.src(`${ PATH.gulp.languages }/*.json`)
      .pipe($.foreach((stream, file) => {
        let pageLang = path.basename(file.path, '.json');
        let templateData = createTemplateData(PATH);
        templateData.locale = pageLang;

        global.translation = JSON.parse(fs.readFileSync(`${ file.base }${ pageLang }.json`))[pageLang];

        return ejsBuild(PATH, $, [
            `${ PATH.src.ejs }/**/*.ejs`,
            `!${ PATH.src.ejs }/**/_*.ejs`,
            `!${ PATH.src.ejs }/**/detail.ejs`
          ], pageLang, templateData, file);
      }))
  }
}