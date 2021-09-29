module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.vue'],
      },
    },
  },
  rules: {
    semi: ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/extensions': ['warn', 'always', { js: 'never', vue: 'never' }],
    'linebreak-style': 0,
    'max-len': ['error', { ignoreComments: true, code: 100 }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
