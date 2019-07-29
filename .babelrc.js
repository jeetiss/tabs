const IS_TEST = process.env.NODE_ENV === 'test'

module.exports = {
  presets: [IS_TEST && '@babel/preset-env', '@babel/preset-react'].filter(
    Boolean
  )
}
