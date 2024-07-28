import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as React from 'react';

import Header from './Header';

describe('Header Component', () => {
	test('renders the header with the logo', () => {
		const { getByAltText } = render(<Header />);
		const logo = getByAltText('rvz logo');
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute('src', 'test-file-stub');
		expect(logo).toHaveAttribute('width', '100px');
	});
});
