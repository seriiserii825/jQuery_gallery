var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    cssnano = require('gulp-cssnano'),
    less = require('gulp-less'),
    rimraf = require('rimraf'),
    rename = require('gulp-rename'),
    spriteCreator = require('gulp.spritesmith'),
    notify = require("gulp-notify"),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

gulp.task('sprite', function() {
    var sprite = gulp.src('src/img/icons/*.png')
        .pipe(spriteCreator({
            imgName: '../img/sprite.png',
            cssName: 'sprite.less',
            cssFormat: 'less',
            algorithm: 'binary-tree',
            padding: 10
        }));
    sprite.img.pipe(rename('sprite.png')).pipe(gulp.dest('build/img'));
    sprite.css.pipe(gulp.dest('src/less/imports/'))
});
gulp.task('css', function() {
    gulp.src('src/less/style.less') // Выберем наш style.less
        .pipe(less()) // Скомпилируем
        .pipe(prefixer()) // Добавим вендорные префиксы
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.stream());
});
gulp.task('html', function() {
    gulp.src('src/*.html') // Выберем файлы по нужному пути
        .pipe(rigger()) // Прогоним через rigger
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
    // Переместим их в папку build
});
gulp.task('js', function(){
    gulp.src('src/js/*')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});
gulp.task('reset', function() {
    gulp.src('src/less/reset.css')
        .pipe(gulp.dest('build/css/'));
});
gulp.task('image', function() {
    gulp.src('src/i/**/*.*') // Выберем наши картинки
        .pipe(imagemin({ // Сожмем их
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            interlaced: true
        }))
        .pipe(gulp.dest('build/i/'))
        // Переместим в build
});
gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts/'))
        // Переместим шрифты в build
});
gulp.task('clean', function(cb) {
    rimraf('build/', cb);
});
gulp.task('build', [
    'html',
    'css',
    'js',
    'fonts',
    'image',
    'sprite',
    'reset'
]);
gulp.task('browser-sync', ['html', 'css', 'sprite', 'fonts', 'image'], function() {
    browserSync.init({
        server: {
            baseDir: "build"
        }
    });
});
gulp.task('watch', function() {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/**/*.less', ['css']);
    gulp.watch('src/img/icons/*.png', ['sprite']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/fonts/**/*.*', ['fonts']);
    gulp.watch('src/img/**/*.*', ['image']);
    gulp.watch('src/less/reset.css'), ['reset'];
});

// gulp.task('default', ['browser-sync', 'watch']);


//     // Serve files from the root of this project
gulp.task('default', ['build','browser-sync', 'watch']);
//     // add browserSync.reload to the tasks array to make
//     // all browsers reload after tasks are complete.
