module.exports = {
    //extends: 'eslint:recommended',
    //extends: 'eslint:all',
    "rules": {
        "semi": ["error", "always"], //强制分号结尾。
        "quotes": ["off", "double"], //使用引号类型。
        "eqeqeq": 1, //必须使用全等
        "indent": [2, 4],
        "max-depth": [0, 4],
        "no-alert": 1,
        "no-dupe-keys": 1,
        "no-var": 1,
    },
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2017,
        sourceType: "module",
    },
    globals: {
        // 全局使用的变量名
        $: true
    }
};