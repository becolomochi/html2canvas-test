var gulp = require('gulp');
var pug = require('gulp-pug');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var sourcemaps = require('gulp-sourcemaps');

const input = 'src';
// const output = 'docs';
const output = 'dist';

gulp.task('build', ['js', 'sass', 'pug', 'iconcopy']);

gulp.task('serve', ['js', 'sass', 'pug'], function() {
  browserSync.init({
    server: './' + output
  });
  gulp.watch(input + "/js/**/*.js", ['js']);
  gulp.watch(input + "/scss/**/*.scss", ['sass']);
  gulp.watch(input + "/**/*.pug", ['pug']);
});

gulp.task('js', function() {
  return gulp.src(input + '/js/**/[^_]*.js')
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(output + '/js'))
      .pipe(browserSync.stream());
});

gulp.task('sass', function() {
  return gulp.src(input + '/scss/**/[^_]*.scss')
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(output + '/css'))
      .pipe(browserSync.stream());
});

gulp.task('pug', function() {
  return gulp.src(input + '/**/[^_]*.pug')
  .pipe(pug())
  .pipe(gulp.dest(output + '/'))
  .pipe(browserSync.stream());
});

gulp.task('iconcopy', function() {
  return gulp.src(input + '/favicon.ico')
    .pipe(gulp.dest(output + '/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);