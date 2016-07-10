const webpack = require('webpack');
const { resolve } = require('path');
const { dependencies } = require('./typings.json');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const JSDoc = require('jsdoc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');

module.exports = {
	resolve: {
		extensions: ['', '.ts', '.js']
	},
	module: {
		loaders: [{
			test:   /\.(scss|css)$/,
			include: resolve('./css'),
			loader: "style!css!postcss"
		}, {
			test: /\.html$/,
			include: resolve('./src'),
			loader: "html?interpolate"
		},{
			test: /\.(t|j)s$/,
			include: resolve('./src'),
			loader: ['babel', 'awesome-typescript']
		}]
	},
	context: __dirname,
	publicPath: resolve('./dist'),
	entry: {
		app: resolve('./src/index.ts'),
		vendor: Object.keys(dependencies)
	},
	debug: true,
	profile: true,
	devtool: 'cheap-source-map',
	output: {
		path: resolve('./dist'),
		filename: '[name].js'
	},
	postcss: function () {
		return [precss, autoprefixer];
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
		}),
		new HtmlWebpackPlugin({
			test: 'TEST',
			template: '!!ejs!index.html',
			filename: `index.en.html`
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new I18nPlugin(null)
	]
};
