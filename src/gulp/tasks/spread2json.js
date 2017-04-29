import fetchJson from '../utils/spread2json_lib/fetch_json.js'
import splitJson from '../utils/spread2json_lib/split_json.js'

module.exports = (gulp, PATH, $) => {

  let resources =  {
      function: 'spreadsheetlib_doTranslate'
    , parameters: ['', ''] // sheetID, sheetName
    , devMode: true
  };

  return () => {
    fetchJson(resources, (translateJson) => {
      splitJson(translateJson, PATH.gulp.languages);
    })
  }
}