var gulp = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    minifyHTML = require('gulp-minify-html');

gulp.task('scripts', function(){
    return gulp.src('./src/js/**')
        .pipe(plumber())
            .pipe(babel({modules: 'amd'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('sass', function(){
    return gulp.src('./src/style/*.scss')
        .pipe(plumber())
            .pipe(sass())
        .pipe(plumber.stop())
        .pipe(gulp.dest('./build/style/'));
});

gulp.task('html', function(){
    return gulp.src('./src/*.html')
        .pipe(minifyHTML())
        .pipe(gulp.dest('./build/'));
});

gulp.task('default', ['scripts', 'sass', 'html'], function() {
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/style/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', ['html']);
});



