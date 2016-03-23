var
    gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    concatCss = require('gulp-concat-css'),
    bower = require('gulp-bower'),
    sass = require('gulp-sass');

//=============== paths to main working directories ===================
var sourcesDir = './app/',
    destDir = './public/dist/';

var bowDir = 'bower_components/';

//global options
var uglifyMinify = false;
var concatCssOpt = {rebaseUrls: false}; //
var j = 'js',
    c = 'css';
var colorTheme = 'default';

//=============== routine tasks (same for each project) ===================

function min(stream, type) {
    if (uglifyMinify) {
        if (type == 'css')
            return stream.pipe(minifyCss());
        else if (type == 'js')
            return stream.pipe(uglify());
    }
    return stream;
}

gulp.task('main', function () {
    var workDir = sourcesDir + bowDir;

    //js
    var stream = gulp.src([sourcesDir + "/js/**/*.js"]);
    min(stream, j);
    stream.pipe(gulp.dest(destDir + 'js/'));

    // css
    stream = gulp.src([
            sourcesDir + bowDir + 'bootstrap/dist/css/bootstrap.css',
            sourcesDir + 'css/*.scss',
            sourcesDir + 'css/color-themes/'+colorTheme+'.scss'
        ])
        .pipe(sass().on('error', sass.logError));
    min(stream, c);
    stream
        .pipe(concatCss("learntag.css", concatCssOpt))
        .pipe(gulp.dest(destDir + 'css'));

    //img
    var stream = gulp.src([sourcesDir + "css/color-themes/img/*"]);
    stream.pipe(gulp.dest(destDir + 'css/img/'));
});

/** Default */
gulp.task('default', ['bower', 'vendors', 'main']);

/** Vendors */
gulp.task('vendors', function () {
    gulp.src([sourcesDir + bowDir + 'bootstrap/dist/**/*']).pipe(gulp.dest(destDir + 'vendor/bootstrap/'));
    gulp.src([sourcesDir + bowDir + 'jquery/dist/jquery.min.js']).pipe(gulp.dest(destDir + 'vendor/jquery/'));
    gulp.src([sourcesDir + bowDir + 'sweetalert/dist/*']).pipe(gulp.dest(destDir + 'vendor/sweetalert/'));
    gulp.src([sourcesDir + bowDir + 'plyr/dist/*']).pipe(gulp.dest(destDir + 'vendor/plyr/'));
    gulp.src([sourcesDir + bowDir + 'font-awesome/css/*']).pipe(gulp.dest(destDir + 'vendor/font-awesome/css'));
    gulp.src([sourcesDir + bowDir + 'font-awesome/fonts/*']).pipe(gulp.dest(destDir + 'vendor/font-awesome/fonts'));
});

/** Bower */
gulp.task('bower', function () {
    return bower({cwd: sourcesDir});
});

gulp.task('watch', function () {
    gulp.watch([sourcesDir + 'js/**/*.js', sourcesDir + "css/**/*"], ['main']);
});
