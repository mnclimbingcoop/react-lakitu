var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gulpConfig = require('../gulp-config');
var taskConfig = gulpConfig.tasks.scripts;
var eslintConfig = taskConfig.eslint;
var watch = require('gulp-watch');

gulp.task('scripts:lint', scriptsLint);
gulp.task('scripts:watchLint', scriptsWatchLint);

function scriptsLint() {
    return gulp.src(eslintConfig.files.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function scriptsWatchLint(done) {
    watch(eslintConfig.files.src, function() {
        gulp.src(eslintConfig.files.src)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .on('end', done);
    });
}
