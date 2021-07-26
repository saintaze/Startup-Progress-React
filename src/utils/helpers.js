export const setLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
}

export const getLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
}

export const fetchRandomFact = async () => {
	const res = await fetch('https://uselessfacts.jsph.pl/random.json');
	const {text} = await res.json();
	return text;
}