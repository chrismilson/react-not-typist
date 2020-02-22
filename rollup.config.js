import typescript from 'rollup-plugin-typescript2'

const tsconfigDefaults = {
  compilerOptions: { declaration: true }
}

export default {
  input: 'src/NotTypist.jsx',
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [typescript({ tsconfigDefaults })],
  externals: ['react', 'prop-types']
}