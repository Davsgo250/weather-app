import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        files: ['**/*.test.js', '**/*.spec.js'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: { ...globals.jest } }, // adds describe, test, it, etc.
        rules: {
            'no-unused-vars': 'warn',
            'no-undef': 'warn',
        },
    },
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.jsonc'],
        plugins: { json },
        language: 'json/jsonc',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.json5'],
        plugins: { json },
        language: 'json/json5',
        extends: ['json/recommended'],
    },
    {
        files: ['**/*.md'],
        plugins: { markdown },
        language: 'markdown/gfm',
        extends: ['markdown/recommended'],
    },
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended'],
    },
    eslintConfigPrettier,
    {
        rules: {
            'json/no-empty-keys': 'off',
        },
    },
    {
        ignores: ['node_modules/', 'dist/', 'coverage/'],
    },
]);
