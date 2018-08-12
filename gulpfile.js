const gulp = require('gulp');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

// webpack config
const webpackConfig = require("./webpack.config");

const input = 'src';
// const output = 'docs';
const output = 'dist';

gulp.task('build', ['js', 'sass', 'pug', 'iconcopy']);

gulp.task('serve', ['js', 'sass', 'pug'], () => {
  browserSync.init({
    server: './' + output
  });
  gulp.watch(input + "/js/**/*.js", ['js']);
  gulp.watch(input + "/scss/**/*.scss", ['sass']);
  gulp.watch(input + "/**/*.pug", ['pug']);
});

gulp.task('js', () => {
  // ☆ webpackStreamの第2引数にwebpackを渡す☆
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src(input + '/scss/**/[^_]*.scss')
      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(output + '/css'))
      .pipe(browserSync.stream());
});

gulp.task('pug', () => {
  return gulp.src(input + '/**/[^_]*.pug')
  .pipe(pug())
  .pipe(gulp.dest(output + '/'))
  .pipe(browserSync.stream());
});

gulp.task('iconcopy', () => {
  return gulp.src(input + '/favicon.ico')
    .pipe(gulp.dest(output + '/'))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);