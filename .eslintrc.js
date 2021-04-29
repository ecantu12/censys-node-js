module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:jest/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
  plugins: ["jest"],
};
