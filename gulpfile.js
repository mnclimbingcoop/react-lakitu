/*
Thanks:
  http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/
 */

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var path = {
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js',
  HTML: 'src/index.html',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  SASS: 'src/sass/**/*.scss',
  SVG: 'src/images/*.svg'
};

gulp.task('html', function(){
  gulp.src(path.HTML)
    .pipe(plumber())
    .pipe(gulp.dest(path.DEST));
});

gulp.task('html:watch', ['html'], function () {
  gulp.watch(path.HTML, ['html']);
});


gulp.task('assemble', ['replaceHTML'], function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('assemble:watch', ['assemble'], function() {
  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('svg', function(){
  gulp.src(path.SVG)
    .pipe(plumber())
    .pipe(gulp.dest(path.DEST + '/images'));
});

gulp.task('svg:watch', ['svg'], function () {
  gulp.watch(path.SVG, ['svg']);
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

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(plumber())
    .pipe(htmlreplace({
      'css': 'css/style.css',
      'js': 'build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('clean', function(cb) {
  del(path.DEST, cb);
});

gulp.task('watch', [
  'sass:watch',
  'assemble:watch',
  'html:watch',
  'svg:watch'
]);

gulp.task('serve', ['watch'], function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['**/*.*'], {cwd: 'dist'}, reload);
});

gulp.task('build', ['assemble', 'sass', 'svg']);

gulp.task('default', ['serve']);
