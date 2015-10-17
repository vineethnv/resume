/**
  * gulpfile.js
  *
  * Vineeth N V :: August 24 2015 :: 08:53:30 PM
  *
  * Development workflow setup using Gulp.js
  *
  * Run gulp command at root('/') of the project where gulpfile.js placed
  *
  * The build is in the root('/')  directory itself
  *
  *
  */
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/**
  * Global variables
  *
  * The gulp variable :: Core variable for running gulp
  *
  * The notify variable :: Gulp-notify varable for notifications
  *
  */
var gulp   = require('gulp');
var notify = require('gulp-notify');

/**
  * Following variables used for compiling sass and vendor prefixing the css
  *
  */
var sass   = require('gulp-sass');
var gpcss  = require('gulp-postcss');
var ap     = require('autoprefixer');

/**
  * Following variable used for compiling jade templates
  *
  */
var jade   = require('gulp-jade');

/**
  * Following variables used for script workflow settings
  *
  */
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gutil  = require('gulp-util');

/**
  * Following variable is used to create a static server and browser-sync
  *
  */
var bSync  = require('browser-sync').create();

/**
  * Directories
  *
  */
var paths = {
  sass: {
    src: '_site_assets/styles/*.sass',
    dest: 'assets/styles/',
    watch: '_site_assets/styles/**/**/*.*'
  },
  jade: {
    src: '_jade/*.jade',
    dest: './',
    watch: '_jade/**/**/*.jade'
  },
  js: {
    src: '_site_assets/scripts/**/*.js',
    dest: 'assets/scripts/'
  },
  site: './'
};

/**
  * Gulp Tasks
  *
  * Task::script
  *
  */
gulp.task('script', function() {
  return gulp.src(paths.js.src)
  .pipe(concat('script.js'))
  .pipe(uglify())
  .on('error', notify.onError(function (error) {
    return 'Uglify error::Script.\n' + error;
  }))
  .pipe(gulp.dest(paths.js.dest))
  .pipe(bSync.stream());
});

/**
  * Gulp Tasks
  *
  * Task::sass
  *
  */
gulp.task('sass', function() {
  return gulp.src(paths.sass.src)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gpcss([ ap({ browsers: ['last 15 versions', '> 2%', 'Firefox > 20'] }) ]))
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(bSync.stream());
});

/**
  * Gulp Tasks
  *
  * Task::jade
  *
  */
gulp.task('jade', function() {
  return gulp.src(paths.jade.src)
    .pipe(jade({
      pretty: true
    }))
    .on('error', notify.onError(function (error) {
      return 'Compile Error::Jade.\n' + error;
    }))
    .pipe(gulp.dest(paths.jade.dest))
    .pipe(bSync.stream());
});

/**
  * Gulp task
  *
  * Task::watch
  *
  */
gulp.task('watch', function() {
  gulp.watch(paths.sass.watch, ['sass']);
  gulp.watch(paths.jade.watch, ['jade']);
  gulp.watch(paths.js.src, ['script']);
});

/**
  * Gulp Tasks
  *
  * Task::server
  *
  */
gulp.task('server', function(){
  bSync.init({
    server: { baseDir: paths.site }
  });
});

/**
  * Gulp Tasks
  *
  * Task::default
  *
  */
gulp.task('default', ['watch', 'server']);

//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

/***
  ** GitHub handle :: github.com/vineeth1991
  ** E-Mail :: vineeth1991@gmail.com
  ** Twitter handle :: @VNV1991
  **/
