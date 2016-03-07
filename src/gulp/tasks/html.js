import gulp from 'gulp';
import gulpConfig from '../gulp-config';
import plumber from 'gulp-plumber';

const taskConfig = gulpConfig.tasks.html;

gulp.task('html', () => {
  return gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('html:watch', ['html'], () => {
  gulp.watch(taskConfig.files.src, ['html']);
});
