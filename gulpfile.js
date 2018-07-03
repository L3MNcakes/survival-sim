var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer');

gulp.task('default', ['scripts', 'html'], function() {
    // Default task
});

/**
 * Scripts task
 **/
gulp.task('scripts', function() {
    var bundler = browserify('./src/js/main.js', {debug: true}).transform(babelify, {
        presets: ['es2015'],
        plugins: ['transform-class-properties']
    });

    return bundler.bundle()
        .on('error', handleScriptsError)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));
});

var handleScriptsError = function(err) {
    gutil.log(gutil.colors.red(err));
}

/**
 * HTML task
 **/
gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('dist'));
});
