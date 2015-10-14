var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var plumber = require('gulp-plumber');
var gulpConfig = require('../gulp-config');
var taskConfig = gulpConfig.tasks.assemble;
var _ = require('lodash');

gulp.task('assemble', function(){
  browserify(taskConfig.browserify.config)
    .bundle()
    .pipe(plumber())
    .pipe(source(taskConfig.browserify.source))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('assemble:watch', ['assemble'], function() {
  var watchConfig = {
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  };
  var browserifyConfig = _.merge({}, taskConfig.browserify.config, watchConfig);
  var watcher  = watchify(browserify(browserifyConfig));

  return watcher.on('update', function () {
    watcher.bundle()
        .pipe(plumber())
        .pipe(source(taskConfig.browserify.source))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(taskConfig.files.dest));
  })
    .bundle()
        .pipe(plumber())
        .pipe(source(taskConfig.browserify.source))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(taskConfig.files.dest));
});
