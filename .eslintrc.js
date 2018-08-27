// http://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true,
	},
	// https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
	extends: 'standard',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	'rules': {
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		// allow debugger during development
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		// 'semi': ["error", "always", { "omitLastInOneLineBlock": true}]
		"indent": ["error", "tab"],
		"no-tabs": 0,
		"comma-dangle": ["error", "only-multiline"],
		"brace-style": ["error", "stroustrup", { "allowSingleLine": true }],
		"spaced-comment": 0,
		"quotes": 0,
		"no-trailing-spaces": ["error", { "skipBlankLines": true }],
		"space-before-function-paren": ["error", "never"],
	}
}
