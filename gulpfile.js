
const fs = require('fs-extra');
const gulp = require('gulp');
const run = require('gulp-run');
const bump = require('gulp-bump');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const mergeStreams = require('merge-stream');
const cleanCSS = require('gulp-clean-css');
const axios = require('axios');
const package = require('./package.json'); 

var assets = {
  head: {
    css: [
      'spec-up/css/custom-elements.css',
      'spec-up/css/prism.css',
      'spec-up/css/chart.css',
      'spec-up/css/font-awesome.css',
      'spec-up/css/index.css'
    ],
    js: [
      'spec-up/js/utils.js',
      'spec-up/js/custom-elements.js'
    ]
  },
  body: {
    js: [
      'spec-up/js/markdown-it.js',
      'spec-up/js/prism.js',
      'spec-up/js/mermaid.js',
      'spec-up/js/chart.js',
      'spec-up/js/index.js'
    ]
  }
};

let compileLocation = 'spec-up/compiled';

async function compileAssets(){
  await fs.emptyDir(compileLocation);
  return new Promise(resolve => {
    mergeStreams(
      gulp.src(assets.head.css)
        .pipe(cleanCSS())
        .pipe(concat('head.css'))
        .pipe(gulp.dest(compileLocation)),
      gulp.src(assets.head.js)
        .pipe(terser())
        .pipe(concat('head.js'))
        .pipe(gulp.dest(compileLocation)),
      gulp.src(assets.body.js)
        .pipe(terser())
        .pipe(concat('body.js'))
        .pipe(gulp.dest(compileLocation))
    ).on('finish', function() {
      resolve();
    })
  });
}

async function bumpVersion(){
  return gulp.src('./package.json')
          .pipe(bump())
          .pipe(gulp.dest('./'));
}

async function renderSpecs(){
  return run('npm run render').exec() 
}

gulp.task('build', compileAssets);

gulp.task('publish', gulp.parallel(compileAssets, bumpVersion, renderSpecs));

gulp.task('watch', () => gulp.watch([
  'spec-up/**/*',
  '!spec-up/css/head.css',
  '!spec-up/js/head.js',
  '!spec-up/js/body.js'
], gulp.parallel('build')));