import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactThree from '@react-three/eslint-plugin';

export default tseslint.config(
    { ignores: ['**/dist/**'] },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    react.configs.flat['jsx-runtime'],
    {
        plugins: {
            '@react-three': reactThree,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: react,
        },
        rules: {
            ...reactThree.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            'react/no-unknown-property': 'off',
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
        settings: {
            react: {
                version: '19',
            },
        },
    }
);
