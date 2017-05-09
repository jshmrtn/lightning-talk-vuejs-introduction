/* jshint node: true */
/* eslint-env node */

'use strict';

const
    path = require('path'),
    autoprefixer = require('autoprefixer'),
    rootPath = path.join(__dirname, '../'),
    distPath = path.join(rootPath, 'dist'),
    srcPath = path.join(rootPath, 'src'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: rootPath,
    entry: {
        app: [
            'babel-polyfill',
            path.join(srcPath, 'main.js'),
        ],
    },
    resolve: {
        extensions: [ '.vue.js', '.js' ],
        alias: {
            src: srcPath,
            components: path.join(srcPath, 'components'),
        },
    },
    devtool: 'source-map',
    output: {
        path: distPath,
        publicPath: '/',
        filename: '[chunkhash].js',
        sourceMapFilename: '[chunkhash].js.map',
        chunkFilename: '[chunkhash].js',
        hotUpdateMainFilename: '[hash]/update.json',
        hotUpdateChunkFilename: '[hash]/js/[id].update.js',
    },
    recordsOutputPath: path.join(distPath, '/records.json'),
    module: {
        rules: [
            {
                test: /\.html/,
                use: [
                    {
                        loader: 'vue-html-loader',
                        options: {
                            interpolate: true,
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            env: {
                                test: {
                                    plugins: [
                                        'istanbul',
                                    ],
                                },
                            },
                            presets: [
                                [ 'es2015', { modules: false }],
                                'es2016',
                                'es2017',
                            ],
                            plugins: [
                                'transform-runtime',
                                'transform-es2015-destructuring',
                                'transform-object-rest-spread',
                                'transform-object-assign',
                                'syntax-dynamic-import',
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer({
                                            browsers: [
                                                'last 10 versions',
                                            ],
                                        }),
                                    ];
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    publicPath: '/',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        autoprefixer({
                                            browsers: [
                                                'last 10 versions',
                                            ],
                                        }),
                                    ];
                                },
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                globalVars: {
                                    'style-path': './src/styles',
                                },
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.(jpe?g|gif|png|ico)$/,
                exclude: /favicons\//,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            prefix: 'img/',
                            limit: 5000,
                        },
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            prefix: 'font/',
                            limit: 5000,
                            mimetype: 'application/font-woff',
                        },
                    },
                ],
            },
            {
                test: /\.(ttf|eot|svg)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
                exclude: [
                    path.join(srcPath, 'icons'),
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: path.resolve(srcPath, 'index.html'),
        }),
    ],
};
