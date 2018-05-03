var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');


/**
 * Not all tasks need to use streams
 * A gulpfile is just another node program and you can use any package available on npm
 */
var del = require('del');
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src` 
  return del(['build']);
});
/* End */


/**
 * SCSS & Lint
 */
var scsslint   = require('gulp-scss-lint');
var minifyCss  = require('gulp-minify-css');
var sass       = require('gulp-sass');
// Path
var scssSrc    = '../src/sass/**/*',
    cssDst     = '../css';
// Lint SCSS (For Ordering CSS property)
gulp.task('scss-lint', function() {
  return gulp.src(scssSrc)
    .pipe(scsslint({
      'config': 'scss-lint.yml'
    }));
});
// Generate css & minify it
gulp.task('sass', function () {
  return gulp.src('../src/sass/*.css')
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssDst))
    .pipe(notify({message: 'SCSS compiled'}));
});
/* End */


/**
 * jQuery & Coffee scripts
 */
var coffee = require('gulp-coffee');
var uglify = require('gulp-uglify');
// Path
var coffeeSrc    = '../src/coffee-scripts/**/*.coffee.js',
    coffeeDst     = '../coffee-scripts';
var jsSrc    = '../src/js/**/*.js',
    jsDst     = '../js';
gulp.task('coffeescripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts) 
  // with sourcemaps all the way down 
  return gulp.src(coffeeSrc)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.coffee.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(coffeeDst))
    .pipe(notify({message: 'Coffee Scripts compiled'}));
});
gulp.task('scripts', ['clean'], function() {
  return gulp.src(jsSrc)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      // .pipe(concat('scripts.min.js'))
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest(jsDst))
    .pipe(notify({message: 'JS compiled'}));
});
/* End */


/**
 * Image minify
 */
var imagemin = require('gulp-imagemin');
// Path
var imgSrc    = '../src/images/**/*',
    imgDst     = '../images';
// Copy all static images 
gulp.task('images', ['clean'], function() {
  return gulp.src(imgSrc)
    // Pass in options to the task 
    .pipe(imagemin({optimizationLevel: 10}))
    .pipe(gulp.dest(imgDst))
    .pipe(notify({message: 'Images compiled'}));
});
/* End */


var htmlmin = require('gulp-html-minifier');
// Path
var htmlSrc    = '../src/html/**/*',
    htmlDst     = '../';
// Minify HTML codes/files
gulp.task('minify', function() {
  gulp.src('../src/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(htmlDst))
    .pipe(notify({message: 'HTML compiled'}));
});

/*var htmlmin = require('gulp-html-minifier');
gulp.task('minify', function() {
  gulp.src('./src/assets/*.html')
    .pipe(htmlmin({collapseWhitespace: true, ignorePath: '/assets' }))
    .pipe(gulp.dest('./dist'))
});*/



/**
 * Rerun the task when a file changes
 */
gulp.task('watch', function() {
  gulp.watch(coffeeSrc, ['coffeescripts']);
  gulp.watch(jsSrc, ['scripts']);
  gulp.watch(imgSrc, ['images']);
  gulp.watch(scssSrc, ['sass']);
  // gulp.watch(scssSrc, ['scss-lint']);
  gulp.watch(htmlSrc, ['minify']);
});
/* End */


// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'sass', 'images', 'minify']); // 'images',
