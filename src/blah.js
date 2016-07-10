const template = require('html!./templates/test.html');

const newObject = {};

// ensure TS doesn't complain when a JS file has this property
newObject.newProperty = true;

export function blah(greet) {
	return `${greet} ${__('meaw')}!!
		${template}
	`;
}
/**
 * It should not be in the build
 *
 * @method bye
 * @return {String} The output
 */
export function bye() {
	return 'shouldnt be on the build';
}
