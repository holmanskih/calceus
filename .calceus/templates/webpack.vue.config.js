const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                },
            },
        ],
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },
};