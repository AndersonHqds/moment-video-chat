module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12
    },
    plugins: [
        '@typescript-eslint',
        'prettier'
    ],
    rules: {
        'prettier/prettier': 'error'
    }
}
