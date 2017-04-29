import through from 'through2'

module.exports = (gulp, PATH, $, app) => {

  if(!app) {
    return;
  }

  return () => {
    app.toStream('pages')
      .pipe(through.obj((chunk, enc, cb) => {

        chunk.data['assets'] = '/assets/themes/package';
        //console.log(JSON.stringify(chunk));

        return cb(null, chunk);
      }))
      .pipe(app.renderFile())
      .pipe($.rename({
        extname: '.html'
      }))
      .pipe(app.dest(`${ pkg.static_html }/`))
  }
}