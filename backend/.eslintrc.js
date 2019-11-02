module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    indent: ["error", 4],
    "arrow-parens": "off",
    "no-console": "off",
    quotes: ["error", "double"],
    "consistent-return": "off",
    curly: ["error", "all"],
    "arrow-body-style": "off",
  },
};
