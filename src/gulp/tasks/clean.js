var gulp = require('gulp');
var del = require('del');
var gulpConfig = require('../gulp-config');

gulp.task('clean', function(done) {
  del(gulpConfig.paths.dist, done);
});
