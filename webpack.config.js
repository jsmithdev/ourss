/* eslint-disable no-undef */
// Custom webpack configuration file, provides generation of service worker
// More information: https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin
const path = require('path');

const LwcWebpackPlugin = require('lwc-webpack-plugin');
const { DefinePlugin, } = require('webpack');//HotModuleReplacementPlugin
const { InjectManifest } = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const { version } = require('./package.json');

//const proxy = 'eys63niz7z4miobpicj7b2xbiu0djcpa';
const proxy = 'zqp716s5y4';

module.exports = (env) => {

	const mode = env.production ? 'production' : 'development'

	console.log(`🐶  Ourss Version: ${version}`);
	console.log(`🖥️  Build mode: ${mode}`);
	console.log(`🎗️  Dedicated to Arron Swartz`);
	console.log('');

	const config = {

		mode,

		entry: {
			'app': './src/index.js',
		},

		output: {
			path: path.join(__dirname, 'dist'),
			filename: '[name].js'
		},

		devServer: {
		},

		plugins: [
			new LwcWebpackPlugin(),
			    // _after_ LwcWebpackPlugin:
				{
					apply(compiler) {
					  compiler.options.module.rules.push({
						test: /\.ts$/,
						exclude: /node_modules/,
						use: {
						  loader: 'babel-loader',
						  options: {
							presets: ['@babel/preset-typescript'],
							plugins: [['@babel/plugin-syntax-decorators', { legacy: true }]],
						  }
						}
					  })
					}
				  },
			new HtmlWebpackPlugin({ template: './src/index.html' }),
			new DefinePlugin({
				__VERSION__: JSON.stringify(version),
				__MODE__: JSON.stringify(mode),
				__PROXY__: JSON.stringify(proxy),
			}),
			new CopyPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, "./src/resources"),
						to: path.resolve(__dirname, "./dist/resources"),
					},
					{
						from: path.resolve(__dirname, "./src/manifest.json"),
						to: path.resolve(__dirname, "./dist/manifest.json"),
					},
				],
			}),
		],
	}
	
	// https://github.com/GoogleChrome/workbox/issues/1790
	if (env.production) {
		console.log('Creating Service Worker...')
		config.plugins.push( new InjectManifest({
			swSrc: '/src/service-worker.js',
			swDest: 'sw.js'
		}));
	}

	return config;
};

/* 
const paths = [
    '/modules/ourss/app/app.js',
];

for(const path of paths) {
	import(path)
	.then(mod => {
		const name = pathToName(path);
		customElements.define(name, mod.CustomElementConstructor);
	})
	.catch(err => {
		console.error(err);
	});
}
*/
/**
 * Takes path of module and returns name of module
 * @param {string} s string of path
 * @returns {string} name of module
 * @example
 * pathToName('./modules/ourss/app/app.js') // ourss-app
 
export function pathToName(s) {
    return s.substring(s.indexOf('modules/')+8, s.lastIndexOf('/'))
        .replace(/\//g, '-');
}*/

//new BundleAnalyzerPlugin(),
//new DefinePlugin({
//	__VERSION__: String(version)
//}),
//new InjectManifest({
//	swSrc: path.join(__dirname, 'service-worker.js'),
//	swDest: path.join(__dirname, '..', 'dist', 'sw.js'),
//}),
/* 
{
	from: path.resolve(__dirname, "./src/service-worker.js"),
	to: path.resolve(__dirname, "./dist/sw.js"),
},
*/