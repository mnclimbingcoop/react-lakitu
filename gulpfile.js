/*
Thanks:
  http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var s3 = require('gulp-s3');
var fs = require('fs');
var requireDir = require('require-dir');

requireDir('./src/gulp/tasks');

aws = JSON.parse(fs.readFileSync('./aws.json'));

var path = {
  DEST: 'dist',
  DEST_BUILD: 'dist/js',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js',
  HTML: 'src/index.html',
  FAVICON: 'src/favicon.ico',
  MINIFIED_OUT: 'app.min.js',
  OUT: 'app.js',
  SASS: 'src/sass/**/*.scss',
};

gulp.task('html', function(){
  gulp.src(path.HTML)
    .pipe(plumber())
    .pipe(gulp.dest(path.DEST));
});

gulp.task('html:watch', ['html'], function () {
  gulp.watch(path.HTML, ['html']);
});

gulp.task('favicon', function(){
  gulp.src(path.FAVICON)
    .pipe(plumber())
    .pipe(gulp.dest(path.DEST));
});

gulp.task('assemble', function(){
  browserify({
    entries: [path.ENTRY_POINT],
  })
    .bundle()
    .pipe(plumber())
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('assemble:watch', ['assemble'], function() {
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
        .pipe(plumber())
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DEST_BUILD));
  })
    .bundle()
        .pipe(plumber())
        .pipe(source(path.MINIFIED_OUT))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('sass', function () {
  gulp.src('src/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.DEST + '/css'));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch(path.SASS, ['sass']);
});

gulp.task('publish', function(){
  gulp.src('./dist/**')
    .pipe(plumber())
    .pipe(s3(aws));
});

gulp.task('clean', function(cb) {
  del(path.DEST, cb);
});

gulp.task('watch', [
  'sass:watch',
  'assemble:watch',
  'html:watch',
  'images:watch'
]);

gulp.task('serve', ['watch'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['**/*.*'], {cwd: 'dist'}, reload);
});

gulp.task('build', ['html', 'favicon', 'assemble', 'sass', 'images']);

gulp.task('default', ['serve']);
