import gulp from 'gulp';
import eslint from 'gulp-eslint';
import gulpConfig from '../gulp-config';
import watch from 'gulp-watch';

const taskConfig = gulpConfig.tasks.scripts;
const eslintConfig = taskConfig.eslint;

gulp.task('scripts:lint', scriptsLint);
gulp.task('scripts:watchLint', scriptsWatchLint);

function scriptsLint() {
    return gulp.src(eslintConfig.files.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function scriptsWatchLint(done) {
    watch(eslintConfig.files.src, () => {
        gulp.src(eslintConfig.files.src)
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError())
            .on('end', done);
    });
}
