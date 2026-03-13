import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    { ignores: ['dist', 'node_modules', '.wrangler', '.react-router'] },

    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            indent: 'off',
            quotes: 'off',
            semi: 'off',
            'max-len': 'off',
            curly: ['error', 'all'],
            'no-console': ['warn', { allow: ['error'] }],
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
        },
    },

    {
        files: ['web/**/*.{ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
]);
