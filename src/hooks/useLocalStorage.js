import { useState } from 'react';

export function useLocalStorage(tokenName, initialValue) {
	const [value, setValue] = useState(() => {
		const item = localStorage.getItem(tokenName);
		return item ? JSON.parse(item) : initialValue;
	});

	const storeValue = (newValue) => {
		setValue(newValue);
		localStorage.setItem(tokenName, newValue);
	};

	return [value, storeValue];
}
