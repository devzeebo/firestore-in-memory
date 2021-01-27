const testFilesGlob = ['**/*.test.*.js', '**/*.test.js', '**/__mocks__/**/*.js'];

module.exports = {
  root: true,
  extends: ['airbnb/base', 'plugin:lodash/recommended', 'plugin:import/errors', 'plugin:import/warnings'],
  parser: 'babel-eslint',
  env: {
    node: true,
    jest: true,
  },
  overrides: [{
    files: testFilesGlob,
    rules: {
      camelcase: ['off'],
      'prefer-arrow-callback': ['off'],
      'func-names': ['off'],
      'no-use-before-define': ['off'],
    },
  }],
  rules: {
    'import/default': ['error'],
    'import/named': ['error'],
    'import/namespace': ['error', { allowComputed: false }],
    'import/prefer-default-export': ['warn'],
    'linebreak-style': 'off',
    'max-len': [
      'error',
      {
        code: 120,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'no-return-assign': ['error', 'except-parens'],
    radix: 'off',
    'class-methods-use-this': 'off',
    'no-mixed-operators': 'off',
    'no-underscore-dangle': 'off',
  },
};
