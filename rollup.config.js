import babel from 'rollup-plugin-babel'

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
  }
]
