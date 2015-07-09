/*
This file is the main entry point for defining Gulp tasks and using Gulp plugins
To learn more visit: https://github.com/gulpjs/gulp/blob/master/docs/README.md
*/
'use strict';

var gulp = require('gulp'),
  ts = require('gulp-typescript'),
  _ = require('lodash'),
  del = require('del'),
  dnx = require('gulp-dnx'),
  ngAnnotate = require('gulp-ng-annotate'),
  project = require('./project.json'),
  packages = require('./package.json'),
  app = './app',
  releaseDir = project.webroot + '/app';

// The default task (called when you run `gulp` from CLI)
gulp.task('default', [
  'clean',
  'build-ts',
  'copy-deps',
  'copy-libs',
  'copy-content',
  'copy-app'
]);

gulp.task('serve', ['default', 'watch', 'dnx-run']);

gulp.task('watch', function () {
  gulp.watch(app + '/**/*', ['copy-app']);
  gulp.watch('./content/**/*', ['copy-content']);
});

gulp.task('dnx-run', dnx('kestrel'));

gulp.task('copy-deps', function () {
  var modulesToCopy = _.map(packages.dependencies, function (val, key) {
    return './node_modules/' + key + '/**/*';
  });

  return gulp.src(modulesToCopy, { base: 'node_modules' })
    .pipe(gulp.dest(releaseDir + '/lib/'));
});

gulp.task('copy-libs', function () {
  return gulp.src("./lib/**/*")
    .pipe(gulp.dest(releaseDir + '/lib/'));
});

gulp.task('copy-content', function () {
  return gulp.src("./content/**/*")
    .pipe(gulp.dest(releaseDir + '/content/'));
});

gulp.task('copy-app', ['copy-js', 'copy-templates']);

gulp.task("build-ts", function () {
  var tsProj = ts.createProject(app + '/tsconfig.json', {
    typescript: require('typescript')
  });

  var tsResult = gulp.src(app + '/**/*.ts')
    .pipe(ts(tsProj));

  return tsResult.js.pipe(gulp.dest(releaseDir));
});

gulp.task('copy-js', function () {
  return gulp.src(app + '/**/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest(releaseDir));
});

gulp.task('copy-templates', function () {
  return gulp.src(app + '/**/*.html')
    .pipe(gulp.dest(releaseDir));
});

gulp.task("clean", function () {
  del.sync([releaseDir]);
});