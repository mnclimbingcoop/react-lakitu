var gulp = require('gulp');
var requireDir = require('require-dir');

requireDir('./src/gulp/tasks');
gulp.task('default', ['serve']);
