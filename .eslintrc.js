module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "better-styled-components"],
  rules: {
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".js", ".jsx"],
      },
    ],
    "prettier/prettier": "warn",
  },
};
