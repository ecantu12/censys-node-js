module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:jest/recommended",
    "prettier",
    "plugin:node/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "node/global-require": "error",
    "node/exports-style": ["error", "module.exports"],
  },
  plugins: ["jest"],
};
