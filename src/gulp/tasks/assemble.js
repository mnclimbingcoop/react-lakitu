import {merge} from 'lodash';
import browserify from 'browserify';
import gulp from 'gulp';
import gulpConfig from '../gulp-config';
import plumber from 'gulp-plumber';
import source from 'vinyl-source-stream';
import streamify from 'gulp-streamify';
import uglify from 'gulp-uglify';
import watchify from 'watchify';

const taskConfig = gulpConfig.tasks.assemble;

gulp.task('assemble', () => {
  return browserify(taskConfig.browserify.config)
    .external(taskConfig.browserify.external)
    .bundle()
    .pipe(plumber())
    .pipe(source(taskConfig.browserify.source))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('assemble:watch', ['assemble'], () =>  {
  let watchConfig = {
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  };
  let browserifyConfig = merge({}, taskConfig.browserify.config, watchConfig);
  let watcher  = watchify(browserify(browserifyConfig));

  return watcher.on('update', () => {
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
