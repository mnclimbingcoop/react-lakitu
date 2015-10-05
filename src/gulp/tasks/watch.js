var gulp = require('gulp');

gulp.task('watch', [
  'sass:watch',
  'assemble:watch',
  'html:watch',
  'images:watch'
]);
