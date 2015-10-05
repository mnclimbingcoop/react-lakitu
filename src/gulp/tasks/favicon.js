var gulp = require('gulp');
var gulpConfig = require('../gulp-config');
var plumber = require('gulp-plumber');
var taskConfig = gulpConfig.tasks.favicon;

gulp.task('favicon', function(){
  gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(taskConfig.files.dest));
});
