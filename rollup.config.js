import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

export default [
  {
    input: 'src/index.js',
    external: ['react', 'use-constant'],
    output: {
      format: 'esm',
      file: 'dist/index.js',
      sourcemap: false
    },
    plugins: [babel()]
  },
  {
    input: 'src/index.js',
    external: ['react', 'use-constant'],
    output: {
      format: 'cjs',
      file: 'dist/index.cjs.js',
      sourcemap: false
    },
    plugins: [babel()]
  },
  {
    input: 'src/index.js',
    external: ['react'],
    output: {
      format: 'umd',
      name: 'bumaga',
      file: 'dist/index.umd.js',
      globals: { react: 'React' },
      sourcemap: false
    },
    plugins: [babel(), resolve()]
  },
  {
    input: 'src/index.js',
    external: ['react'],
    output: {
      format: 'umd',
      name: 'bumaga',
      file: 'dist/index.umd.min.js',
      globals: { react: 'React' },
      sourcemap: false
    },
    plugins: [babel(), resolve(), terser()]
  }
]
