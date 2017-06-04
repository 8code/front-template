import checkModule from '../../utils/check_module_lib/check_module.js';
checkModule([
  'fs-extra',
  'readline',
  'googleapis',
  'google-auth-library',
  'gulp-util',
  'del',
  'through2',
  'path',
  'layout-wrapper',
  'gulp-if'
]);

let authorize = require('../../utils/gapi_authorize/gapi_authorize.js');

module.exports = (gulp, PATH, $) => {

  let resources =  {
    function: 'spread2json',
    parameters: ['getData', { sheetId: '1ZRajbTNaDzj2DgWtxW5R4HYTCZHR6usjDY0k5q7TpME', sheetName: 'シート1' }],
    devMode: true
  };

  let getJson = () => {
    authorize(resources, (translateJson) => {
      //splitJson(translateJson, PATH.gulp.languages);
      // ---
      // let splitData;
      // let infoData = {};

      // infoData.language_count = Object.keys(jsonData).length;
      // fs.outputFile('./gulp/utils/spread2json_lib/info.json', JSON.stringify(infoData), 'utf-8');

      fs.mkdirsSync(PATH.gulp.languages);

      Object.keys(translateJson).forEach((key, i) => {
        let splitData = {};
        splitData[key] = translateJson[key];
        fs.writeFile(`${ PATH.gulp.languages }/${ key }.json`, JSON.stringify(splitData), (err) => {
          err ? console.log('Error: ' + err) : '';
        })
      })

    });
  }

  return getJson;
}