'use strict';

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    pkg = require('./package'),
    scripts = {
        all: [
            'src/*.js',
            'gulpfile.js',
            'docs/js/main.js'
        ],
        src: 'src/*.js',
        docs: 'docs/js',
        dest: 'dist/js'
    },
    styles = {
        src: 'src/css/*.css',
        docs: 'docs/css',
        dest: 'dist/css'
    },
    images = {
        src: 'src/images/*.png',
        docs: 'docs/images',
        dest: 'dist/images'
    };

gulp.task('jshint', function () {
    return gulp.src(scripts.all)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

gulp.task('jscs', function () {
    return gulp.src(scripts.all)
        .pipe(plugins.jscs());
});

gulp.task('js', ['jshint', 'jscs', 'copy'], function () {
    return gulp.src(scripts.src)
        .pipe(plugins.replace(/@\w+/g, function (placeholder) {
            switch (placeholder) {
                case '@VERSION':
                    placeholder = pkg.version;
                    break;

                case '@YEAR':
                    placeholder = (new Date()).getFullYear();
                    break;

                case '@DATE':
                    placeholder = (new Date()).toISOString();
                    break;
            }

            return placeholder;
        }))
        .pipe(gulp.dest(scripts.docs))
        .pipe(gulp.dest(scripts.dest))
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(plugins.uglify({
            preserveComments: 'license'
        }))
        .pipe(gulp.dest(scripts.dest));
});

gulp.task('jscopy', function () {
    return gulp.src(scripts.src)
        .pipe(gulp.dest(scripts.docs))
        .pipe(gulp.dest(scripts.dest));
});
gulp.task('csscopy', function () {
    return gulp.src(styles.src)
        .pipe(gulp.dest(styles.docs))
        .pipe(gulp.dest(styles.dest));
});
gulp.task('imagecopy', function () {
    return gulp.src(images.src)
        .pipe(gulp.dest(images.docs))
        .pipe(gulp.dest(images.dest));
});

gulp.task('copy', ['jscopy', 'csscopy', 'imagecopy'], function () {
});

gulp.task('docs', function () {
    return gulp.src('docs/**')
        .pipe(gulp.dest('_gh_pages'));
});

gulp.task('release', ['js', 'docs'], function () {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('_releases/' + pkg.version));
});

gulp.task('watch', function () {
    gulp.watch(scripts.src, ['jscopy']);
    gulp.watch(styles.src, ['csscopy']);
});

gulp.task('default', ['watch']);
