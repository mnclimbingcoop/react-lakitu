var gulp = require('gulp');
var plumber = require('gulp-plumber');
var s3 = require('gulp-s3');

gulp.task('publish', function(){
  gulp.src('./dist/**')
    .pipe(plumber())
    .pipe(s3(aws));
});
