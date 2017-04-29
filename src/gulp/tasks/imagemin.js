import pngquant from 'imagemin-pngquant'
import gifsicle from 'imagemin-gifsicle'
import mozjpeg from 'imagemin-mozjpeg'

module.exports = (gulp, PATH, $) => {
  return () => {
    gulp.src([
      `${ PATH.src.img }/{,**/}*.{jpg,png,gif,svg,ico}`,
      `!${ PATH.src.img }/sprite/{,**/}*.png`,
      ])
      .pipe($.imagemin(
        [
          pngquant({
            quality: '65-80',
            speed: 1,
            floyd: 0
          }),
          mozjpeg({
            quality: 85,
            progressive: true
          }),
          $.imagemin.svgo(),
          $.imagemin.optipng(),
          $.imagemin.gifsicle()
        ], {
        multipass: true
      }))
      .pipe(gulp.dest(`${ PATH.static_html }/${ PATH.img }/`))
  }
}