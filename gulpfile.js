/* jshint node: true, strict: false */

var gulp = require('gulp'),
    del = require('del'),
    modRewrite = require('connect-modrewrite'),
    browserSync = require('browser-sync'),
    series = require('stream-series'),
    karma = require('karma').server,
    plugins = require('gulp-load-plugins')(),
    cdnFiles = {
        bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css',
        fontawesome: '//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        jquery: '//code.jquery.com/jquery-2.1.4.min.js',
        jqueryui: '//code.jquery.com/ui/1.11.4/jquery-ui.min.js',
        angular: '//ajax.googleapis.com/ajax/libs/angularjs/1.3.14/angular.min.js',
        angularrouter: '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.13/angular-ui-router.min.js',
        angularbootstrap: '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.13.0/ui-bootstrap.min.js',
        googleapi: '//apis.google.com/js/client.js'
    },
    srcPaths = {
        appJs: 'src/app/**/!(*.spec).js',
        templates: 'src/app*/**/*.html',
        images: 'src/images/*',
        styles: 'src/css/*'
    },
    destPaths = {
        build: './build',
        dist: './dist',
        templates: './build/partials'
    };

gulp.task('default', ['build:debug']);
gulp.task('build:debug', ['jshint', 'templates'], buildDebug);
gulp.task('build:dist', [ 'minjs', 'copyassets'], buildDist);

gulp.task('jshint', jshint);
gulp.task('templates', ['clean:templates'], templates);

gulp.task('minjs', ['jshint', 'templates'], minjs);
gulp.task('copyassets', copyAssets);

gulp.task('clean:templates', cleanTemplates);
gulp.task('clean:build', cleanBuild);
gulp.task('clean:dist', cleanDist);
gulp.task('clean', ['clean:build', 'clean:dist']);

gulp.task('unittest', unittest);

gulp.task('serve:debug', ['build:debug', 'watch'], serveDebug);
gulp.task('serve:dist', ['build:dist'], serveDist);
gulp.task('watch', ['build:debug'], watch);

function cleanTemplates (cb) {
    del(destPaths.templates, cb);
}

function cleanBuild (cb) {
    del(destPaths.build, cb);
}

function cleanDist (cb) {
    del(destPaths.dist, cb);
}

function jshint () {
    return gulp.src(srcPaths.appJs)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.jshint.reporter('fail')); // fail on errors
}

function minjs () {
    return getJsSources()
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest(destPaths.dist + '/js'));
}

function templates () {
    return gulp.src(srcPaths.templates)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.ngHtml2js({
            moduleName: 'app'
        }))
        .pipe(gulp.dest(destPaths.templates));
}

function copyAssets () {
    gulp.src('src/images/*').pipe(gulp.dest(destPaths.dist + '/images'));
    gulp.src('src/css/*').pipe(gulp.dest(destPaths.dist + '/css'));
}

function buildDebug () {
    return gulp.src('src/index.html')
        .pipe(plugins.inject(getJsSources()))
        .pipe(gulp.dest('build'));
}

function buildDist () {
    return gulp.src('./src/index.html')
        .pipe(
            plugins.inject(
                gulp.src('dist/js/*.js'),
                {
                    relative: true,
                    ignorePath: '../dist'
                }
            )
        )
        .pipe(plugins.replace('../bower_components/momentjs/moment.js', cdnFiles.momentjs))
        .pipe(plugins.replace('../bower_components/jquery/dist/jquery.js', cdnFiles.jquery))
        .pipe(plugins.replace('../bower_components/jquery-ui/jquery-ui.js', cdnFiles.jqueryui))
        .pipe(plugins.replace('../bower_components/angular/angular.js', cdnFiles.angular))
        .pipe(plugins.replace('../bower_components/angular-ui-router/release/angular-ui-router.js', cdnFiles.angularui))
        .pipe(plugins.replace('../bower_components/ng-sortable/dist/ng-sortable.js', cdnFiles.ngsortable))
        .pipe(plugins.replace('../bower_components/angular-bootstrap/ui-bootstrap.js', cdnFiles.angularbootstrap))
        .pipe(plugins.replace('../bower_components/angular-moment/angular-moment.js', cdnFiles.angularMoment))
        .pipe(plugins.replace('../bower_components/bootstrap/dist/css/bootstrap.min.css', cdnFiles.bootstrap))
        .pipe(plugins.replace('../bower_components/font-awesome/css/font-awesome.min.css', cdnFiles.fontawesome))
        //.pipe(plugins.minifyHtml({
        //    empty: true,
        //    spare: true,
        //    quotes: true
        //}))
        .pipe(gulp.dest(destPaths.dist));
}

function unittest (cb) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, cb);
}

function serveDebug () {
    gulp.watch([srcPaths.templates, srcPaths.appJs], ['build:debug']);
    browserSync({
        server: {
            baseDir: ['./', './build', './src'],
            index: 'index.html',
            middleware: [
                modRewrite([
                    '!\\.\\w+\\?{0,1}.*$ /index.html [L]'
                ])
            ]
        }
    });
}

function serveDist () {
    browserSync({
        server: {
            baseDir: destPaths.dist,
            index: 'index.html',
            middleware: [
                modRewrite([
                    '!\\.\\w+\\?{0,1}.*$ /index.html [L]'
                ])
            ]
        }
    });
}

function watch () {
    gulp.watch([srcPaths.templates, srcPaths.appJs], ['build:debug']);
}

function getJsSources () {
    return series(
        gulp.src(srcPaths.appJs).pipe(plugins.angularFilesort()),
        gulp.src(destPaths.templates + '/**/*.js')
    );
}
