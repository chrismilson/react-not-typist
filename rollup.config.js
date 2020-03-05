import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/NotTypist.jsx',
  output: {
    dir: 'lib',
    format: 'cjs'
  },
  plugins: [typescript()],
  externals: ['react', 'prop-types']
}