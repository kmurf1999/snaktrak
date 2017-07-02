const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractCSS = new ExtractTextPlugin('styles/[name].css');
const OfflinePlugin = require('offline-plugin');

const PUBLIC_URL = 'https://snaktrak.io/';
const basePath = path.resolve(__dirname, '../src/static/');


module.exports = {
    //devtool: 'source-map', // No need for dev tool in production

    module: {
        rules: [{
            test: /\.css$/,
            use: [
                extractCSS.extract('style'),
                'css-loader?localIdentName=[path][name]--[local]',
                'postcss-loader'
            ]
        }, {
            test: /\.scss$/,
            use: [
                extractCSS.extract('style'),
                'css-loader?localIdentName=[path][name]--[local]',
                'postcss-loader',
                'sass-loader',
            ]
        }],
    },

    plugins: [
        extractCSS,
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new OfflinePlugin()
    ]
};
