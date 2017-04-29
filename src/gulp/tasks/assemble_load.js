import assemble from 'assemble'

const app = assemble()

module.exports = (gulp, PATH, $) => {
  return () => {
    app.layouts(`${ pkg.src.hbs }/layouts/*.hbs`);
    app.pages(`${ pkg.src.hbs }/*.hbs`);
    app.partials(`${ pkg.src.hbs }/partials/**/*.hbs`);
  }
}