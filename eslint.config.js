const js = require('@eslint/js')
const globals = require('globals')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')

// Flat-config port of the previous .eslintrc: eslint:recommended plus
// plugin:@typescript-eslint/recommended, with the TypeScript parser applied to
// every linted file (the workshop's .js files contain JSX).
module.exports = [
  {
    ignores: [
      '**/coverage/**',
      '**/dist/**',
      '**/public/**',
      '**/migrations/**',
      '**/theme/**',
      '**/.next/**'
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    ...js.configs.recommended,
    plugins: { '@typescript-eslint': tsPlugin },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2015
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-var-requires': 'off',
      // typescript-eslint 8 replaced no-var-requires with no-require-imports in
      // its recommended set; the workshop's webpack/next configs use require().
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
]
