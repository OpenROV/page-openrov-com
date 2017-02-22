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
            './assets/css/*.css',
        ],
        allScss: [
            './assets/openrov/_scss/*.scss',
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
        ]


    }

    return config;
}