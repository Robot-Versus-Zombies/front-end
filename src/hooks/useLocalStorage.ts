import { useState } from 'react';

export function useLocalStorage<T>(tokenName: string, initialValue: T) {
	const [value, setValue] = useState<T>(() => {
		const item = localStorage.getItem(tokenName);
		return item ? JSON.parse(item) : initialValue;
	});

	const storeValue = (newValue: T) => {
		setValue(newValue);
		localStorage.setItem(tokenName, JSON.stringify(newValue));
	};

	return [value, storeValue] as const;
}
