var paths = { 
    patterns: {}
};
var config = {
    paths: paths
};

paths.app               = './_app';
paths.dist              = './dist';
paths.styles            = paths.app + '/styles';
paths.theme             = paths.app + '/vendor/theme';
paths.appCss            = './app.css'
paths.themeCss          = './theme.css'
paths.maps              = './maps';

paths.sassInclude       = './_includes';

paths.siteHtml = [
    './_site/**/*.html',
];



paths.patterns.cssPattern = '/**/*.css';
paths.patterns.sassPattern = '/**/*.scss';
paths.patterns.jsPattern = '/**/*.js';
paths.patterns.imagePattern = '/**/*.+(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG|gif|GIF|webp|WEBP|tif|TIF)';
paths.patterns.markdownPattern = '/**/*.+(md|MD|markdown|MARKDOWN)';
paths.patterns.htmlPattern = '/**/*.html';
paths.patterns.xmlPattern = '/**/*.xml';


config.cssDontTouch = [
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



module.exports = config;