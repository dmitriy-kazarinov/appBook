/**
 * Created by Дима on 12.09.2015.
 */
var gulp        = require('gulp'),
    browserSync = require('browser-sync').create(),
    wiredep = require('wiredep').stream;

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("./app/*.js").on("change", browserSync.reload);
});

gulp.task('bower', function () {
    gulp.src('./index.html')
        .pipe(wiredep({
            optional: 'configuration',
            goes: 'here'
        }))
        .pipe(gulp.dest('./'));
});

gulp.watch('bower.json', ['bower']);