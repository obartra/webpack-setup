import '../css/styles.scss';

export function blahTS(greet: string) : string {
	return `${greet} beep boop!`;
}

export function byeTS() : string {
	return 'shouldnt be on the build';
}
