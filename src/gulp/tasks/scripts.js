var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gulpConfig = require('../gulp-config');
var taskConfig = gulpConfig.tasks.scripts;
var eslintConfig = taskConfig.eslint;

gulp.task('scripts:lint', scriptsLint);

function scriptsLint() {
    gulp.src(eslintConfig.files.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
