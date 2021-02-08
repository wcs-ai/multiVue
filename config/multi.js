'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const fs = require('fs')
const MODULE_PATH = path.resolve("src/modules")

const pages = fs.readdirSync(MODULE_PATH)
const TITLES = {
    "home": "个人首页",
    "ability": "三方库测试页"
}

function multiModule() {
    let JS_PATH = {};
    let DEV_HTML_TEMPLEAT = [];
    let PROD_HTML_TEMPLEAT = [];

    pages.forEach((val) => {

        JS_PATH[val] = `./src/modules/${val}/main.js`;

        DEV_HTML_TEMPLEAT.push(new HtmlWebpackPlugin({
            filename: `${val}.html`,
            title: TITLES[val],
            template: "./src/modules/" + val + "/index.html", //`./src/modules/${val}/index.html`,
            inject: true,
            chunks: ['manifest', 'vue', val]
        }));

        PROD_HTML_TEMPLEAT.push(new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, `../dist/${val}.html`),
            template: "./src/modules/" + val + "/index.html",
            title: TITLES[val],
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            chunks: ['manifest', 'vue', val],
            //chunksSortMode: 'dependency',
        }))
    });

    return { JS_PATH, DEV_HTML_TEMPLEAT, PROD_HTML_TEMPLEAT };
}

let config = multiModule();

module.exports = {
    ...config
}