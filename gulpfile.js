const gulp = require('gulp');
const merge2 = require('merge2');
const tsConfig = require('./tsconfig.json');
const source = ['src/**/*.tsx', 'src/**/*.ts'];
const ts = require('gulp-typescript');
const path = require('path');
const babel = require('gulp-babel');
const less = require('gulp-less');

// https://github.com/DouyinFE/semi-design/blob/main/packages/semi-ui/gulpfile.js
// https://github.com/ant-design/antd-tools/blob/master/lib/gulpfile.js

function compile(modules) {
  const targetPath = modules === 'es' ? 'es' : 'lib';
  const babelModule = modules === 'es' ? false : 'cjs';
  const tsStream = gulp
    .src(source)
    .pipe(
      ts({ ...tsConfig.compilerOptions, rootDir: path.join(__dirname, '.') }),
    );
  const jsStream = tsStream.js
    .pipe(
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              modules: babelModule,
            },
          ],
          '@babel/preset-react',
        ],
      }),
    )
    .pipe(gulp.dest(targetPath));

  const dtsStream = tsStream.dts.pipe(gulp.dest(targetPath));

  return merge2([jsStream, dtsStream]);
}

gulp.task('compileWithES', function compileWithES(cb) {
  compile('es');
  cb();
});

gulp.task('compileWithCJS', function compileWithCJS(cb) {
  compile('commonjs');
  cb();
});

gulp.task('compileLess', function compileLess() {
  return gulp
    .src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('es'))
    .pipe(gulp.dest('lib'));
});

gulp.task(
  'compile',
  gulp.series('compileLess', gulp.parallel('compileWithES', 'compileWithCJS')),
);
