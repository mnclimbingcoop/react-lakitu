import gulp from 'gulp';
import plumber from 'gulp-plumber';
import s3 from 'gulp-s3';
import fs from 'fs';

const aws = JSON.parse(fs.readFileSync('./aws.json'));

gulp.task('publish', () => {
  gulp.src('./dist/**')
    .pipe(plumber())
    .pipe(s3(aws));
});
