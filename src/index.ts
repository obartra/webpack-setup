import { blah } from './blah';
import { blahTS } from './test';

const hi = __('hi');

const p = new Promise(resolve => {
	setTimeout(resolve, 1000);
});

blahTS(hi);

p
	.then(() => blah(hi))
	.then(resp => {
		console.log(resp);
	});

console.log('hey!');

