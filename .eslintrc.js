module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb-base", // Enforces Airbnb's base JavaScript style guide
    "plugin:prettier/recommended", // Turns off ESLint rules that conflict with Prettier
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "comma-dangle": "off",
    "prettier/prettier": [
      "error",
      {
        trailingComma: "es5",
      },
    ],
  },
  ignorePatterns: ["webpack.*.js"],
};
