const config = require('./webpack.config.js');
const _ = require('lodash');
const { resolve } = require('path');
// const { dependencies } = require('./typings.json');
// const precss = require('precss');
// const autoprefixer = require('autoprefixer');
const JSDoc = require('jsdoc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const I18nPlugin = require('i18n-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const languages = {
	en: null //,
	// es: require('./dictionaries/es.json')
};
const languageKeys = Object.keys(languages);

module.exports = languageKeys.map(language => {
	const plugins = [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			sourceMap: true
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
		}),
		new HtmlWebpackPlugin(_.extend({
			test: 'TEST',
			template: '!!ejs!index.html',
			filename: `index.${language}.html`
		}, languages[language])),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new I18nPlugin(languages[language])
	];

	if (language === _.first(languageKeys)) {
		plugins.push(new CleanWebpackPlugin(['dist']));
		plugins.push(new JSDoc({ conf: './jsdoc.conf' }));
	}

	return _.merge({}, config, {
		debug: false,
		profile: false,
		name: language,
		devtool: 'source-map',
		output: {
			path: resolve('./dist'),
			filename: `[name].${language}.[chunkhash].js`
		},
		plugins
	});
});
