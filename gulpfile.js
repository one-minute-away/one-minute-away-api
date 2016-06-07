const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

//TODO get file up and running 

gulp.task('default', ['lint', 'test'], () => {
  console.log('started');
});

gulp.task('lint', () => {
  gulp.src('/server.js')
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('test', () => {
  gulp.src('test/*test.js')
  .pipe(mocha());
});


// TODO more explicit files to watch for better performance
gulp.watch('./**/*.js', ['lint', 'test']);
