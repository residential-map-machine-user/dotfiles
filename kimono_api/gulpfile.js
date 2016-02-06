var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var plumber = require('gulp-plumber');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');

gulp.task('less', function () {
  return gulp.src('./assets/less/*.less')
    .pipe(plumber()) 
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./public/stylesheets'))
});


gulp.task('nodemon', function(cb) {
  var called = false;
  nodemon({
        script: 'bin/www',
        ext: 'js html css jade coffee',
        env: {
            NODE_ENV: 'development'
        }
  })
  .on('start', function() {
    if (!called) {
        called = true;
        cb();
    }
  })
  .on('restart', function() {
        setTimeout(function() {
        browserSync.reload();
     }, 500);
  });
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: 'http://localhost:5000',
        port: 8000
    });
});

gulp.task('default', ['browser-sync'],  function () {
  gulp.watch('./assets/less/*.less', ['less']);
});
