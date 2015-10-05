var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpConfig = require('../gulp-config');
var plumber = require('gulp-plumber');
var taskConfig = gulpConfig.tasks.sass;

gulp.task('sass', function () {
  gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(taskConfig.files.src, ['sass']);
});
