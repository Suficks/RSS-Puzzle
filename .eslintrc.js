module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['prettier', 'import', '@typescript-eslint'],
  ignorePatterns: ['webpack.config.js', '.eslintrc.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 2,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
  },
};
