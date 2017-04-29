import del from 'del'

module.exports = (gulp, PATH, $) => {
  return (cb) => {
    del([`${ PATH.static_html }/**/*.html`]).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
    }, cb)
  }
}