/* eslint-disable no-undef */
// Custom webpack configuration file, provides generation of service worker
// More information: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
const path = require('path');

const LwcWebpackPlugin = require('lwc-webpack-plugin');
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack');
//const { InjectManifest } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const watch = process.env.NODE_ENV === 'production' ? false : true;

console.log('env: ', process.env.NODE_ENV);
console.log('mode: ', mode);

const { version } = require('./package.json');

console.log(version)


module.exports = {

    mode,

    entry: {
        'app': './src/index.js',
        'service-worker': "./src/service-worker.js",
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },

    devServer: {
    },

    plugins: [
        new LwcWebpackPlugin(),
        /* new InjectManifest({
            maximumFileSizeToCacheInBytes: 5000000,
            swSrc: '/src/service-worker.js',
            swDest: 'sw.js'
        }), */
        new DefinePlugin({
            __VERSION__: JSON.stringify(version)
        }),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CopyPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, "./src/resources"),
                to: path.resolve(__dirname, "./dist/resources"),
              },
              {
                from: path.resolve(__dirname, "./src/service-worker.js"),
                to: path.resolve(__dirname, "./dist/sw.js"),
              },
              {
                from: path.resolve(__dirname, "./src/manifest.json"),
                to: path.resolve(__dirname, "./dist/manifest.json"),
              },
            ],
        }),
    ],
};


//new BundleAnalyzerPlugin(),
//new DefinePlugin({
//	__VERSION__: String(version)
//}),
//new InjectManifest({
//	swSrc: path.join(__dirname, 'service-worker.js'),
//	swDest: path.join(__dirname, '..', 'dist', 'sw.js'),
//}),