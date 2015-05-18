var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    rimraf = require('gulp-rimraf'),
    ignore = require('gulp-ignore'),
    concat = require('gulp-concat'),
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber');

gulp.task('styles', function() {
  return gulp.src('app/less/app.less')
    .pipe(plumber())
    .pipe(less({ style: 'expanded' }))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('www/styles'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('www/styles'));
});

gulp.task('scripts', function() {
  return gulp.src(['node_modules/jquery/dist/jquery.js',
      'app/libs/chocolatechip-ui/dist/chui-3.8.0.min.js',
      'app/scripts/test.js',
      'app/scripts/default.js',
    ])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('www/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('www/scripts'));
});

gulp.task('images', function() {
  return gulp.src('app/assets/img/**/*')
    .pipe(plumber())
    .pipe(newer('app/assets/img/**/*'))
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest('www/assets/img'));
});

gulp.task('html', function () {
  return gulp.src('app/html/**/*')
    .pipe(plumber())
    .pipe(newer('app/html/**/*'))
    .pipe(gulp.dest('www'));
});

gulp.task('overrides', function () {
  gulp.src('app/libs/chocolatechip-ui/dist/chui-android*.min.css')
.pipe(plumber())
.pipe(concat('chui.css'))
.pipe(newer('app/libs/chocolatechip-ui/dist/chui-android*.min.css'))
.pipe(gulp.dest('merges/android/overrides'));

  gulp.src('app/libs/chocolatechip-ui/dist/chui-win*.min.css')
.pipe(plumber())
.pipe(concat('chui.css'))
.pipe(newer('app/libs/chocolatechip-ui/dist/chui-win*.min.css'))
.pipe(gulp.dest('merges/windows/overrides'));

  gulp.src('app/libs/chocolatechip-ui/dist/chui-ios*.min.css')
.pipe(plumber())
.pipe(concat('chui.css'))
.pipe(newer('app/libs/chocolatechip-ui/dist/chui-ios*.min.css'))
.pipe(gulp.dest('merges/ios/overrides'));

  return gulp.src('app/overrides/**/*')
    .pipe(plumber())
    .pipe(newer('app/overrides/**/*'))
    .pipe(gulp.dest('www/overrides'));
});

gulp.task('clean', function() {
  return gulp.src(['www/styles', 'www/scripts', 'www/assets/img'], { read: false })
    .pipe(rimraf());
});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'html', 'overrides');
});

gulp.task('watch', function() {
  gulp.watch('app/less/**/*.less', ['styles']);
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/assets/img/**/*', ['images']);
  gulp.watch('app/html/**/*', ['html']);
  gulp.watch('app/overrides/**/*', ['overrides']);
});

gulp.task('watch-styles', function() {
  gulp.watch('app/less/**/*.less', ['styles']);
});

gulp.task('watch-scripts', function() {
  gulp.watch('app/scripts/**/*.js', ['scripts']);
});

gulp.task('watch-html', function() {
  gulp.watch('app/html/**/*', ['html']);
});

gulp.task('watch-images', function() {
  gulp.watch('app/assets/img/**/*', ['images']);
});
