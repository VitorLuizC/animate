import { terser } from 'rollup-plugin-terser';

/**
 * Creates an output options object.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
const Option = (options) => ({
  exports: 'named',
  sourcemap: true,
  ...options,
});

/**
 * An object with all configuration for `Rollup.js`.
 * @type {import('rollup').RollupOptions}
 */
const options = {
  input: './src/animate.js',
  output: [
    Option({
      file: './dist/animate.js',
      format: 'commonjs',
    }),
    Option({
      file: './dist/animate.esm.js',
      format: 'esm',
    }),
    Option({
      file: './dist/animate.umd.js',
      name: 'animate',
      format: 'umd',
    }),
    Option({
      file: './dist/animate.umd.min.js',
      name: 'animate',
      format: 'umd',
      plugins: [terser()],
    }),
  ],
};

export default options;
