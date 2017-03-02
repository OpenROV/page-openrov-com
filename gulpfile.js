const args = require('yargs').argv;
const gulp = require('gulp');
const config = require('./gulp.config');
const cleanCss = require('gulp-clean-css');
const uncss = require('gulp-uncss');
const del = require('del');

var combiner = require('stream-combiner2');
const pump = require('pump');

const $ = require('gulp-load-plugins')({ lazy: true });


gulp.task('build:theme:styles', () => {
    return gulp
        .src(config.paths.theme + config.paths.patterns.cssPattern)
        .pipe($.if(args.verbose, $.print()))

        .pipe(handleCss(config.paths.themeCss))

        .pipe(gulp.dest(config.paths.dist))
});


gulp.task('build:styles', [], () => {
    log('Compiling SCSS --> css');

    const sassStream = gulp
        .src(config.paths.styles + config.paths.patterns.sassPattern)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: config.paths.sassInclude,
        }).on('error', $.sass.logError))
        .pipe(handleCss(config.paths.appCss))

        .pipe(gulp.dest(config.paths.dist));
})

gulp.task('build', ['build:theme:styles', 'build:styles'], () => {});

gulp.task('clean:dist', (done) => {
    clean([
        config.paths.dist + '/**/*.*',
        config.paths.dist + '/maps',
        '!' + config.paths.dist + '/README.md'], done);
});

function handleCss(destination) {
    return combiner.obj(
        $.sourcemaps.init(),
        $.autoprefixer({
                browsers: ['last 2 versions', '> 5%'],
        }),
        cleanCss(),
        $.cssnano(),
        $.concat(destination),
        $.sourcemaps.write(config.paths.maps)
    );    
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



function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}
