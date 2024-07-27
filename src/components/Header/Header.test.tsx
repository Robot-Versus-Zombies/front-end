import { render } from '@testing-library/react';
import React from 'react';

import Header from './Header';

describe('Header Component', () => {
	test('renders the header with the logo', () => {
		const { getByAltText } = render(<Header />);
		const logo = getByAltText('rvz logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute(
			'src',
			'../../images/just-text-rvz-png.png',
		);
		expect(logo).toHaveAttribute('width', '100px');
	});
});
