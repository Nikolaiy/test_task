'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const rimraf = require('rimraf');
const rename = require('gulp-rename');
const spritesmith = require('gulp-spritesmith');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');


/* ---------- Server ------------- */

gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });
    gulp.watch('build/**/.*').on('change', browserSync.reload);
});


/* ---------- Pug complite ------------- */

gulp.task('templates:complite', function buildHTML() {
    return gulp.src('./source/templates/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'));
  });


/* ---------- Style complite ------------- */

gulp.task('styles:complite', function () {
    return gulp.src('./source/styles/main.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./build/styles'));
  });


/* ---------- Sprite complite ------------- */

gulp.task('sprite', function () {
    const spriteData = gulp.src('source/images/icons/*.svg').pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../images/sprite.png',
      cssName: 'sprite.scss'
    }));

    spriteData.img.pipe(gulp.dest('./build/images'));
    spriteData.css.pipe(gulp.dest('./build/styles'));
    cd();
  });


/* ---------- Clean (rifram)) ------------- */

gulp.task('clean', function del(cd) {
    return rimraf('./build', cd);
});


/* ---------- Copy images ------------- */

gulp.task('copy:images', function() {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.dest('./build/images'));
});


/* ---------- Copy fonts ------------- */

gulp.task('copy:fonts', function() {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'));
});


/* ---------- Copy ------------- */

gulp.task('copy', gulp.parallel('copy:images', 'copy:fonts'));


/* ---------- Watchers ------------- */

gulp.task('watch', function () {
    gulp.watch('./source/templates/**/*.pug', gulp.series('templates:complite'));
    gulp.watch('./source/styles/**/*.scss', gulp.series('styles:complite'));
    // gulp.watch('./source/js/**/*.js', gulp.series('js'));
});

gulp.task('default', gulp.series (
    'clean',
    gulp.parallel('templates:complite', 'styles:complite', 'copy'),
    gulp.parallel('watch', 'server')
    ) 
);

// , 'sprite'










