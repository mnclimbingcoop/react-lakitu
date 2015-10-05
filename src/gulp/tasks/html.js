var gulp = require('gulp');
var gulpConfig = require('../gulp-config');
var plumber = require('gulp-plumber');
var taskConfig = gulpConfig.tasks.html;

gulp.task('html', function(){
  gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('html:watch', ['html'], function () {
  gulp.watch(taskConfig.files.src, ['html']);
});
