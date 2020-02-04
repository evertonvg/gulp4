const
gulp = require('gulp'),
sass = require('gulp-sass'),
sourcemaps = require('gulp-sourcemaps'),
browserSync = require('browser-sync').create(),
minify = require('gulp-minify');


const path = {
    srcPath: 'dev/assets/css/scss/',
    distPath: 'dev/assets/css/',
    axios: 'node_modules/axios/dist/axios.min.js',
    jquery: 'node_modules/jquery/dist/jquery.min.js',
    popper: 'node_modules//popper.js/dist/umd/popper.min.js',
    bootstrapjs: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
    bootstrapcss: 'node_modules/bootstrap//dist/css/bootstrap.min.css',
    slickcss:'node_modules/slick-carousel/slick/slick.css',
    slickjs:'node_modules/slick-carousel/slick/slick.min.js',
    js: 'dev/assets/js',
    css: 'dev/assets/css',
    jssrc: 'dev/assets/js/src'
};

function minifycss(){
  return gulp
    .src(path.css, { allowEmpty: true }) 
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest(path.css))
};

function minifyjs(){
  return gulp
    .src(path.jssrc, { allowEmpty: true }) 
    .pipe(minify({noSource: true}))
    .pipe(gulp.dest(path.js))
};

function css(){
  return gulp
    .src([path.bootstrapcss,path.slickcss])
    .pipe(sass())
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.stream());
};

function js(){
  return gulp
    .src([path.bootstrapjs,path.slickjs,path.jquery,path.axios])
    .pipe(gulp.dest(path.js))
    .pipe(browserSync.stream());
};


function watch() {
    browserSync.init({ 
          server: {
            baseDir: 'dev/', 
          },
          port: 8080, 
          startPath: 'index.html', 
      });
    gulp
      .watch(path.srcPath+'*.scss', gulp.series('css',browserSync.reload));
    gulp
      .watch(['dev/*.html','dev/assets/js/src/*.js','dev/*.php'], gulp.parallel(browserSync.reload));

  };

  exports.css = css;
  exports.minifycss = minifycss;
  exports.js = js;
  exports.minifyjs = minifyjs;
  exports.watch = watch;

var build = gulp.parallel(css,minifycss, js,minifyjs, watch);

gulp
  .task(build);
gulp
  .task('default', build);

 

