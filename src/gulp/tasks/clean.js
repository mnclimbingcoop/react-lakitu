import gulp from 'gulp';
import del from 'del';
import gulpConfig from '../gulp-config';

gulp.task('clean', done => {
  del(gulpConfig.paths.dist, done);
});
