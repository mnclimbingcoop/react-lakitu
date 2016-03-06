import gulp from 'gulp';
import browserSync from 'browser-sync';

const reload = browserSync.reload;

gulp.task('serve', ['watch'], () => {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });

  gulp.watch(['**/*.*'], {cwd: 'dist'}, reload);
});
