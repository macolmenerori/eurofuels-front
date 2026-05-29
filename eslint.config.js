import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  reactRecommended,
  reactJsxRuntime,
  {
    plugins: {
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      prettier: prettierPlugin
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton']
        }
      ],
      'react/prop-types': 'off',
      'valid-typeof': 'warn',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react'],
            ['^@?\\w'],
            [
              '^(api|assets|common|components|locales|mocks|pages|app|services|state|styles|types|utils)(/.*|$)'
            ],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$', '^.+\\.s?css$']
          ]
        }
      ],
      'no-console': 'warn',
      'no-useless-escape': 'warn',
      'prettier/prettier': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    languageOptions: {
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
        __APP_VERSION__: 'readonly'
      }
    }
  },
  {
    rules: jsxA11yPlugin.configs.strict.rules
  },
  reactHooksPlugin.configs.flat.recommended,
  prettierConfig,
  {
    ignores: [
      'node_modules/**',
      'build/**',
      'dist/**',
      'types/**',
      '.react-router/**',
      '.DS_Store',
      '.env',
      '.env.*',
      '.github/**',
      'vite.config.ts'
    ]
  }
);
