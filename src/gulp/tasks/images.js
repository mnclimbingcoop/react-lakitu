var gulp = require('gulp');
var config = require('../gulp-config');
var taskConfig = config.tasks.images;
var plumber = require('gulp-plumber');

gulp.task('images', function(){
  gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('images:watch', ['images'], function () {
  gulp.watch(taskConfig.files.src, ['images']);
});
