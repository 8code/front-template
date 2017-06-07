import checkModule from '../../utils/check_module_lib/check_module.js';
checkModule([
  'readline',
  'googleapis',
  'google-auth-library'
]);

import authorize from '../../utils/gapi_authorize/gapi_authorize.js';
const fs = require('fs-extra');

module.exports = (gulp, PATH, $) => {

  let option = {
        sheetId: '1og709ajh6JPG-uJA2nJCkFoq0tFITKX50gym4EL8ymE',
        sheetName: 'シート1'
      };

  let resources =  {
    function: 'spread2json',
    parameters: ['getData', option],
    devMode: true
  };

  let getJson = () => {
    authorize(resources, (translateJson) => {
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