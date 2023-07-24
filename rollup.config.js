const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');
const multi = require('@rollup/plugin-multi-entry');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');
const less = require('rollup-plugin-less');
const pkg = require('./package.json');
const { babel } = require('@rollup/plugin-babel');
const { DEFAULT_EXTENSIONS } = require('@babel/core');
const postcss = require('rollup-plugin-postcss');
const replace = require('@rollup/plugin-replace');

const inputList = ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'];
const externalDeps = Object.keys(pkg.dependencies || {});

const esConfig = {
  input: 'src/index.tsx',
  external: externalDeps,
  treeshake: false,
  output: {
    dir: 'es/',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    json(),
    less({ output: 'es/style/index.css' }),
  ],
};

module.exports = [esConfig];
