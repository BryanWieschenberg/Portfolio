import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    { ignores: ['dist/'] },

    {
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
            indent: 'off',
            quotes: 'off',
            semi: 'off',
            'max-len': 'off',
            curly: ['error', 'all'],
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
        },
    },
];
