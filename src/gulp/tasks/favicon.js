import gulp from 'gulp';
import gulpConfig from '../gulp-config';
import plumber from 'gulp-plumber';

const taskConfig = gulpConfig.tasks.favicon;

gulp.task('favicon', function(){
  return gulp.src(taskConfig.files.src)
    .pipe(plumber())
    .pipe(gulp.dest(taskConfig.files.dest));
});
