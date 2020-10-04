
const fs = require('fs-extra');
const gulp = require('gulp');
const run = require('gulp-run');
const bump = require('gulp-bump');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const mergeStreams = require('merge-stream');
const cleanCSS = require('gulp-clean-css');
const axios = require('axios').default;
const package = require('./package.json'); 

let assets = {
  head: {
    css: [
      'assets/css/custom-elements.css',
      'assets/css/prism.css',
      'assets/css/chart.css',
      'assets/css/font-awesome.css',
      'assets/css/index.css'
    ],
    js: [
      'assets/js/utils.js',
      'assets/js/custom-elements.js'
    ]
  },
  body: {
    js: [
      'assets/js/markdown-it.js',
      'assets/js/prism.js',
      'assets/js/mermaid.js',
      'assets/js/chart.js',
      'assets/js/popper.js',
      'assets/js/tippy.js',
      'assets/js/index.js'
    ]
  }
};


let compileLocation = 'assets/compiled';

async function fetchSpecRefs(){
  return Promise.all([
    axios.get('https://ghcdn.rawgit.org/tobie/specref/master/refs/ietf.json'),
    axios.get('https://ghcdn.rawgit.org/tobie/specref/master/refs/w3c.json'),
    axios.get('https://ghcdn.rawgit.org/tobie/specref/master/refs/whatwg.json')
  ]).then(async results => {
    let json = Object.assign(results[0].data, results[1].data, results[2].data);
    return fs.outputFile(compileLocation + '/refs.json', JSON.stringify(json));
  }).catch(e => console.log(e));
}

async function compileAssets(){
  await fs.ensureDir(compileLocation);
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

gulp.task('refs', fetchSpecRefs);

gulp.task('build', compileAssets);

gulp.task('publish', gulp.series(gulp.parallel(compileAssets, bumpVersion), renderSpecs));

gulp.task('watch', () => gulp.watch([
  'assets/**/*',
  '!assets/css/head.css',
  '!assets/js/head.js',
  '!assets/js/body.js'
], gulp.parallel('build')));