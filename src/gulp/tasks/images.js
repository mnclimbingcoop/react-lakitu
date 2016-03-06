import gulp from 'gulp';
import config from '../gulp-config';
import plumber from 'gulp-plumber';

const taskConfig = config.tasks.images;

gulp.task('images', () => {
  return gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(taskConfig.files.dest));
});

gulp.task('images:watch', ['images'], () => {
  gulp.watch(taskConfig.files.src, ['images']);
});
