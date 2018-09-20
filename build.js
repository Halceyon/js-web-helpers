const del = require('del');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

let promise = Promise.resolve();
promise = promise.then(() => del(['dist/*']));

['es', 'cjs', 'umd'].forEach((format) => {
  promise = promise.then(() => rollup.rollup({
    input: 'src/index.js',
    external: Object.keys(pkg.dependencies),
    plugins: [
      babel({
        babelrc: false,
        presets: [['env', { modules: false }]],
      }),
    ],
  }).then(bundle => bundle.write({
    file: `dist/${format === 'cjs' ? 'js-web-helpers' : `js-web-helpers-${format}`}.js`,
    format,
    name: format === 'umd' ? pkg.name : undefined,
  })));
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console