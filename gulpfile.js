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
var s3 = require('gulp-s3');
var fs = require('fs');

aws = JSON.parse(fs.readFileSync('./aws.json'));

var path = {
  DEST: 'dist',
  DEST_BUILD: 'dist/build',
  DEST_SRC: 'dist/src',
  ENTRY_POINT: './src/js/App.js',
  HTML: 'src/index.html',
  FAVICON: 'src/favicon.ico',
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  SASS: 'src/sass/**/*.scss',
  IMAGES: ['src/images/*.svg','src/images/*.png' ]
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

gulp.task('assemble', ['replaceHTML'], function(){
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
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
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(plumber())
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(plumber())
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('images', function(){
  gulp.src(path.IMAGES)
    .pipe(plumber())
    .pipe(gulp.dest(path.DEST + '/images'));
});

gulp.task('images:watch', ['images'], function () {
  gulp.watch(path.IMAGES, ['images']);
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
