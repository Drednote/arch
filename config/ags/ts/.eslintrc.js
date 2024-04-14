module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['**.json'],
  rules: {
    'prettier/prettier': ['error', {printWidth: 80}],
    '@typescript-eslint/no-use-before-define': 'off',
    'no-use-before-define': ['error', {functions: false, variables: false}],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 0,
  },
  globals: {
    window: true,
    document: true,
    require: true,
    module: true,
  },
  root: true,
}