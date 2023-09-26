const gulp = require('gulp');
const merge2 = require('merge2');
const tsConfig = require('./tsconfig.json');
const source = ['src/**/*.tsx', 'src/**/*.ts'];
const ts = require('gulp-typescript');
const path = require('path');
const gulpBabel = require('gulp-babel');

// https://github.com/DouyinFE/semi-design/blob/main/packages/semi-ui/gulpfile.js
// https://github.com/ant-design/antd-tools/blob/master/lib/gulpfile.js

function compile(modules) {
  console.log('🚀 ~ modules:', modules);
  if (modules === 'es') {
  }
}

gulp.task('compileWithES', function compileWithES() {
  console.log('[Parallel] Compile to es...');
  const tsStream = gulp
    .src(source)
    .pipe(ts({ ...tsConfig.compilerOptions, rootDir: path.join(__dirname, '.') }));
  const jsStream = tsStream.js
    .pipe(
      gulpBabel({
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
            },
          ],
          '@babel/preset-react',
        ],
      }),
    )
    .pipe(gulp.dest('es'));

  const dtsStream = tsStream.dts.pipe(gulp.dest('es'));

  return merge2([jsStream, dtsStream]);
});

gulp.task('compileWithCJS', function compileWithCJS() {
  console.log('[Parallel] Compile to cjs...');
  const tsStream = gulp
    .src(source)
    .pipe(ts({ ...tsConfig.compilerOptions, rootDir: path.join(__dirname, '.') }));
  const jsStream = tsStream.js
    .pipe(
      gulpBabel({
        presets: [
          [
            '@babel/preset-env',
            {
              modules: 'commonjs',
            },
          ],
          '@babel/preset-react',
        ],
      }),
    )
    .pipe(gulp.dest('lib'));

  const dtsStream = tsStream.dts.pipe(gulp.dest('lib'));

  return merge2([jsStream, dtsStream]);
});

gulp.task('compile', gulp.series(gulp.parallel('compileWithES', 'compileWithCJS')));
