var gulp = require('gulp'),
	gutil = require('gulp-util'),
	sass = require('gulp-ruby-sass'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	watch = require('gulp-watch'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify');
/*
code for file match & mismatch
js /app.js
Matches the exact file
js /*.js
Matches all files ending in .js in the js directory only
js /** /*.js
Matches all files ending in .js in the js directory and all child directories
!js/app.js
Excludes js/app.js from the match, which is useful if you want to match all files in a directory except for a particular file
*.+(js|css)
Matches all files in the root directory ending in .js or .css
*/

	
	

// Minify JS & uglify
gulp.task('minifyJS', function() {
  // main all.js file
  gulp.src('js/*.js')
  .pipe(uglify())
  .pipe(concat("all.js"))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe( notify({ message: "All custom js are minified!"}) );

  // create single lib.js file from all library plugins
  gulp.src('js/lib/*.js')
  .pipe(uglify())
  .pipe(concat("lib.js"))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('build/js'))
  .pipe( notify({ message: "All js libraries are minified!"}) );
});

// watch for changed js files
gulp.task('watch', function() {
  gulp.watch('js/*.js', function() {
	gulp.run('minifyJS');
  });
});

gulp.task('default', ['minifyJS', 'watch']);

