var gulp = require('gulp')
var order = require('gulp-order')
var concat = require('gulp-concat')
var livereload = require('gulp-livereload')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('scripts', function() {
  return gulp.src('./public/javascripts/**/*.js')
    .pipe(order([
      'application.js',
      '*.js'
    ]))
    .pipe(concat('application.js'))
    .pipe(gulp.dest('./public/dist/js'))
})

gulp.task('watch', function() {
  gulp.watch('./public/javascripts/**/*.js', ['default'])
  livereload.listen()
  gulp.watch(['./public/dist/**']).on('change', livereload.changed)
})

var bowerJsDeps = [
  './vendor/foundation/css/foundation.css'
]

gulp.task('vendor-css', function() {
  return gulp.src(bowerJsDeps)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./public/dist/css'))
})

gulp.task('default', function() {
  gulp.start('vendor-css', 'scripts')
})