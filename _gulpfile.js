const gulp = require('gulp');
const args = require('yargs').argv;
const merge = require('merge-stream');
const config = require('./gulp.config')();
const del = require('del');
const cleanCss = require('gulp-clean-css');
const uncss = require('gulp-uncss');
const pump = require('pump');

const $ = require('gulp-load-plugins')({
    lazy: true,
     
});

gulp.task('js', () => {
    return gulp
        .src(config.allJs)
        .pipe($.if(args.verbose, $.print()))
})

gulp.task('build', ['theme-styles', 'copy-html', 'styles'], () => {

})

gulp.task('copy-html', [], () => {
    log('Copying HTML');
    return gulp
        .src(config.allData)
        .pipe($.if(args.verbose, $.print()))
        .pipe(gulp.dest(config.build));
})


gulp.task('theme-styles', () => {
    return gulp
        .src(config.allCss)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.concat(config.themeCss))
        .pipe($.if(args.verbose, $.print()))
        .pipe(gulp.dest(config.build));
})

gulp.task('minify-css', () => {
    return gulp
        .src(config.siteCss)
        .pipe($.if(args.verbose, $.print()))
        .pipe(uncss({
            html: config.siteHtml,
            ignore: config.cssDontTouch,
        }))
        .pipe($.cssnano())
        .pipe(gulp.dest('./'));
})

gulp.task('minify-js', (cb) => {
    pump([
        gulp.src(config.allJs),
        $.uglify(),
        gulp.dest('./.tmp/')
    ]) 

})

// gulp.task('style', ['clean-styles'], () => {
gulp.task('styles', [], () => {
    log('Compiling SCSS --> css');

    const sassStream = gulp
        .src(config.allScss)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: config.sassInclude,
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: [ 'last 3 versions', '> 5%'],
        }))
        .pipe($.concat('app.css'))
        .pipe(cleanCss())
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.build + 'assets/openrov/css/'));
        //.pipe(gulp.dest(config.build + config.orCssDest))
})

gulp.task('clean-build', (done) => {
    log('Cleaning up');
    clean(config.build + '/*', done);
})

gulp.task('clean-styles', (done) => {
    var files = config.temp + '**/*.css';
    clean(files, done);
})


function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}