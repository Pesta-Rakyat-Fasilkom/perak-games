import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'app/main.tsx',
  output: {
    file: 'dist/main.js',
    format: 'iife'
  },
  plugins: [
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    typescript(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs({
      include: /\/node_modules\//,
      namedExports: {
        react: Object.keys(require('react')),
        'react-is': Object.keys(require('react-is'))
      }
    }),
    globals(),
    builtins()
  ]
};
