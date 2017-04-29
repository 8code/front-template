import through2 from 'through2'
import path from 'path'
import wrapper from 'layout-wrapper'

module.exports = (gulp, PATH, $) => {
  return () => {
    let pageSlug;
    let pagePath;
    let relativePath;

    let templateData = {
      layoutsDir: `${ PATH.src.ejs }/layouts`,
      assets: PATH.assets,
      partials: 'partials',
      data: `${ PATH.src.ejs }/data`,
      slug: pageSlug,
      path: pagePath,
      relativePath: relativePath
    };

    gulp.src([
          `${ PATH.src.ejs }/*.ejs`,
          `!${ PATH.src.ejs }/**/_*.ejs`
        ])
        .pipe($.plumber())
        .pipe(through2.obj((chunk, enc , cb) => {
          pageSlug = path.basename(chunk.path, '.ejs');
          pagePath = chunk.path.substring(chunk.path.indexOf('ejs/')+4, chunk.path.length);
          relativePath = '../'.repeat([pagePath.split('/').length -1]);

          templateData.slug = pageSlug;
          templateData.path = pagePath;
          templateData.relativePath = relativePath;
  //console.log(pageSlug);
          return cb(null, chunk);
        }))
        .pipe($.frontMatter({
          property: 'fm'
        }))
        .pipe($.ejs({
          data: templateData
        }))
        .pipe(wrapper({
          layout: `${ PATH.src.ejs }/layouts`,
          data: templateData,
          engine: 'ejs',
          frontMatterProp: 'fm'
        }))
        .pipe($.ejs())
        .pipe($.rename({ extname: '.html' }))
        .pipe(gulp.dest(`${ PATH.static_html }/`));
  }
}