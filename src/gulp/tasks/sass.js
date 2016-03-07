import gulp from 'gulp';
import sass from 'gulp-sass';
import gulpConfig from '../gulp-config';
import plumber from 'gulp-plumber';

const taskConfig = gulpConfig.tasks.sass;

gulp.task('sass', () => {
  return gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('sass:watch', ['sass'], () => {
  gulp.watch(taskConfig.files.src, ['sass']);
});
