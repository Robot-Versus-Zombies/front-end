import { render } from '@testing-library/react';
import React from 'react';

import Inventory from './Inventory';

describe('Inventory', () => {
	const items = [
		{ alt: 'key', image: '/src/images/old-key.png' },
		{ alt: 'candle', image: '/src/images/candle.png' },
	];

	it('renders without crashing', () => {
		render(<Inventory items={items} />);
	});

	it('displays the correct number of items', () => {
		const { container } = render(<Inventory items={items} />);
		const itemElements = container.querySelectorAll(
			'.inventory-item-image',
		);
		expect(itemElements.length).toBe(items.length);
	});

	it('displays the correct alt text for each item', () => {
		const { container } = render(<Inventory items={items} />);
		const itemElements = container.querySelectorAll(
			'.inventory-item-image',
		);
		itemElements.forEach((itemElement, index) => {
			expect(itemElement.getAttribute('alt')).toBe(items[index].alt);
		});
	});

	it('displays the correct image source for each item', () => {
		const { container } = render(<Inventory items={items} />);
		const itemElements = container.querySelectorAll(
			'.inventory-item-image',
		);

		itemElements.forEach((itemElement, index) => {
			expect(itemElement.getAttribute('src')).toBe(items[index].image);
		});
	});
});
