module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
    commonjs: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "import", "react-hooks"],
  rules: {
    "react/jsx-uses-react": 1,
  },
};
