const js = require('@eslint/js')
const globals = require('globals')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const tsParser = require('@typescript-eslint/parser')

// Flat-config port of the previous .eslintrc: eslint:recommended plus
// plugin:@typescript-eslint/recommended, with the TypeScript parser applied to
// every linted file (the workshop's .js and .jsx files contain JSX).
//
// The three rule sets are separate array elements rather than spreads into one
// `rules` object, because the order and the scoping both matter:
//
//   1. eslint:recommended, for every linted file.
//   2. typescript-eslint's `eslint-recommended` compat layer, which switches
//      off the core rules TypeScript already covers (no-undef, no-redeclare,
//      constructor-super, ...) and is scoped to .ts/.tsx/.mts/.cts only. This
//      has to come after (1) or it has nothing to switch off, and it must not
//      leak onto .js/.jsx, where those core rules are still wanted.
//   3. typescript-eslint's `recommended` rules.
//
// `flat/recommended` composes exactly 2 and 3 on top of a base config that
// registers the plugin and the parser, in that order. Spreading the rule sets
// into a single `rules` object instead loses (2) entirely: a plain spread of
// `configs['eslint-recommended'].overrides[0].rules` is unscoped, so it would
// also disable those rules for .js/.jsx.
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
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}'],
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
      // typescript-eslint 8 replaced no-var-requires with no-require-imports in
      // its recommended set; the workshop's webpack/next configs use require().
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
]
