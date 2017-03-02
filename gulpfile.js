const args = require('yargs').argv;
const gulp = require('gulp');
const config = require('./gulp.config');
const cleanCss = require('gulp-clean-css');
const uncss = require('gulp-uncss');
const del = require('del');
const gutil = require('gulp-util');
const combiner = require('stream-combiner2');
const pump = require('pump');
const imagmin = require('gulp-imagemin');

const $ = require('gulp-load-plugins')({ lazy: true });


gulp.task('build:theme:styles', () => {
    return gulp
        .src(config.paths.theme + config.paths.patterns.css)
        .pipe($.if(args.verbose, $.print()))

        .pipe(handleCss(config.paths.themeCss))

        .pipe(gulp.dest(config.paths.dist + '/theme'))
});


gulp.task('build:styles', [], () => {
    log('Compiling SCSS --> css');

    const sassStream = gulp
        .src(config.paths.styles + config.paths.patterns.sass)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: config.paths.sassInclude,
        }).on('error', $.sass.logError))
        .pipe(handleCss(config.paths.appCss))

        .pipe(gulp.dest(config.paths.dist + ''));
})

gulp.task('build', ['build:app', 'build:theme'], () => {});
gulp.task('build:theme', ['build:theme:styles', 'build:theme:scripts', 'build:theme:images'], () => {});
gulp.task('build:app', ['build:styles', 'build:scripts', 'build:images'], () => {});

// Concatenates and uglifies global JS files and outputs result     to the
// appropriate location.
gulp.task('build:theme:scripts', function () {
    return gulp.src([
        config.paths.theme + '/js/' + config.paths.patterns.js
    ])
        .pipe(handleJs('theme.js'))
        .pipe(gulp.dest(config.paths.dist + '/theme'))
        .on('error', gutil.log);
});

gulp.task('build:scripts', function () {
    return gulp.src([
        config.paths.app + '/scripts/' + config.paths.patterns.js
    ])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())  
        .pipe($.sourcemaps.write(config.paths.maps))
        .pipe(gulp.dest(config.paths.dist + '/js'))        
        .on('error', gutil.log);
});

gulp.task('clean', (done) => {
    clean([
        config.paths.dist + '/**/*.*',
        config.paths.dist + '/*',
        '!' + config.paths.dist + '/README.md'], done);
});

// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('build:theme:images', function () {
    log(`Minifying images`);
    return gulp.src(config.paths.themeImages)
        .pipe(handleImages(config.paths.dist + '/theme/images'))
        .on('error', gutil.log);
})

// Creates optimized versions of images,
// then outputs to appropriate location(s)
gulp.task('build:images', function () {
    log(`Minifying images ${config.paths.appImages}`);
    return gulp.src(config.paths.appImages)
        .pipe(handleImages(config.paths.dist + '/openrov/images'))
        .on('error', gutil.log);
})

function handleImages(destination) {
    return combiner.obj(
        $.if(args.verbose, $.print()),
        imagmin(),
        gulp.dest(destination),
        $.size({ showFiles: true })
    ).on('error', gutil.log);
}

function handleJs(destination = '', concat = false) {
    return combiner.obj(
            $.sourcemaps.init(),
            $.concat(destination),
            $.uglify(),
            $.sourcemaps.write(config.paths.maps)
    );
}

function handleCss(destination) {
    return combiner.obj(
        $.sourcemaps.init(),
        $.autoprefixer({
                browsers: ['last 2 versions', '> 5%'],
        }),
        cleanCss(),
        $.cssnano({zindex: false}),
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
