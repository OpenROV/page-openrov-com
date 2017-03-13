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
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const criticalCss = require('gulp-critical-css');
const critical = require('critical');
const rev = require('gulp-rev-append');


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
        .src([config.paths.styles + config.paths.patterns.sass,`!_app/styles/mobile.scss`])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: config.paths.sassInclude,
        }).on('error', $.sass.logError))
        .pipe(handleCss(config.paths.appCss))

        .pipe(gulp.dest(config.paths.dist + ''));
})

gulp.task('build:styles:mobile', [], () => {
    log('Compiling mobile SCSS --> css');

    const sassStream = gulp
        .src([config.paths.styles + '/mobile.scss'])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: config.paths.sassInclude,
        }).on('error', $.sass.logError))
        .pipe(handleCss(config.paths.mobileCss))

        .pipe(gulp.dest(config.paths.dist));
})

gulp.task('build', ['build:app', 'build:theme', 'build:styles:critical', 'build:versions'], () => {});
gulp.task('build:theme', ['build:theme:styles', 'build:theme:scripts'], () => {});
gulp.task('build:app', ['build:styles', 'build:styles:mobile', 'build:scripts'], () => {});
gulp.task('build:images', [/*'build:theme:images', */ 'build:app:images'], () => {});

gulp.task('watch', ['watch:styles'], () => {});


gulp.task('watch:styles', function () {
    gulp.watch(
        [config.paths.styles + config.paths.patterns.sass, config.paths.sassInclude + config.paths.patterns.sass], 
        ['build:styles', 'build:styles:critical', 'build:versions'])
});

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
gulp.task('build:app:images', function () {
    log(`Minifying images ${config.paths.appImages}`);
    // return gulp.src(config.paths.appImages)
    //     .pipe(handleImages(config.paths.dist + '/openrov/images'))
    //     .on('error', gutil.log);
    const plugins = [
        imagmin.optipng({ quality: '65-80' }),
        imageminMozjpeg({ quality: '90' }),
        // imageminPngquant({ quality: '65-80' })
    ]


    return gulp.src(config.paths.appImages)
        .pipe($.if(args.verbose, $.print()))
        .pipe(imagmin(plugins))
        .pipe(gulp.dest(config.paths.dist + '/openrov/images'))
        .pipe($.size({ showFiles: true }))
        .on('error', gutil.log);
})

// Places fonts in proper location
gulp.task('build:fonts', function () {
    return gulp.src(config.paths.theme + '/fonts/**/*.*')
        .pipe(gulp.dest(config.paths.dist + '/fonts'))
        .on('error', gutil.log);
})

gulp.task('build:styles:concat', function() {
    return gulp
        .src(['assets/app.css', 'assets/theme/theme.css'])
        .pipe($.if(args.verbose, $.print()))
        .pipe($.concat('main.css'))
        .pipe(gulp.dest('./assets/'));
})

gulp.task('build:styles:critical', ['build:styles:concat'], function(cb){
    critical.generate({
        base: __dirname,
        src: '_site/index.html',
        css: ['assets/main.css'],
        dest: '_includes/app.critical.css',
        include: config.keepCss,
        ignore: config.ignoreCss,
        minify: true,
        width: 1300,
        height: 1200
    }, cb);
});

gulp.task('build:versions', [], () => {
    return gulp
        .src(config.paths.allHtml)
        .pipe($.if(args.verbose, $.print()))
        .pipe(rev())
        .pipe(gulp.dest('.'))
})

function handleImages(destination) {
    const plugins = [
        imageminMozjpeg({ quality: '5-90'}),
        // imageminPngquant({ quality: '65-80' })
    ]
    
    return combiner.obj(
        $.if(args.verbose, $.print()),
        imagmin( plugins, {verbose: true} ),
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
