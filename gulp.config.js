module.exports = () => {
    var config = {
        temp : './.tmp',
        build : './build/',
        sassInclude: './_includes',
        orCssDest: './assets/openrov/css/',
        themeCss: './assets/css/main.css',
        allJs: [
            './assets/js/*.js',
            './assets/openrov/js/*.js'
        ],
        allCss: [
            // './assets/css/*.css'
            './assets/css/bootstrap.css',
            // './assets/css/color-defaults.css',
            './assets/css/fonts.css',
            // './assets/css/swatch-black.css',
            // './assets/css/swatch-blue.css',
            './assets/css/swatch-gray.css',
            // './assets/css/swatch-white-black.css',
            './assets/css/swatch-white.css',
            // './assets/css/swatch-white-green.css',
            // './assets/css/swatch-white-red.css',
            './assets/css/theme.css',

            // './assets/css/swatch-blue.css',
            // './assets/css/swatch-gray.css',
            // './assets/css/swatch-white.css',
        ],
        allScss: [
            './assets/openrov/_scss/*.scss',
        ],
        siteHtml: [
            './_site/**/*.html',
            // './*.html',
            // './community/**/*.html',
            // './gallery/**/*.html',
            // './learn/**/*.html',
            // './press/**/*.html',
            // './products/**/*.html',
            // './support/**/*.html',
            // './welcome/**/*.html',
            // './_includes/**/*.html'
        ],
        siteCss: [
            '**/build/assets/css/*.css',
            '**/build/assets/openrov/css/*.css',
        ],
        allData: [
            './_config.yml',
            '**/*.html',
            '**/bower_components/**/*.*',
            '**/_data/*',
            '**/_includes/*',
            '**/_layouts/*',
            '**/assets/css/*.*',
            '!**/assets/css/*.css',
            '**/assets/fonts/**/*.*',
            '**/assets/images/**/*.*',
            '**/assets/js/**/*.*',
            '**/assets/openrov/images/**/*.*',
            '**/assets/openrov/js/**/*.*',
            '!./build/**',
            '!./_site/**',
            '!./node_modules/**'
        ],

        cssToMinify: [
            '**/assets/css/*.css',
            '**/assets/openrov/css/*.css',
        ],
        cssDontTouch: [
            '.navbar-static-top',
            '.navbar',
            '.navbar-sticky',
            '.flexslider',
            '.flexslider *',
            '.background-media',
            /pre-order-banner.*/,
            /\.mejs\-.*/,
            /\.modal.*/,
            /.masthead.*/,
            
        ]


    }

    return config;
}