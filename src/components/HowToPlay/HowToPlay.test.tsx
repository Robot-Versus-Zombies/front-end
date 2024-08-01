import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import HowToPlay from './HowToPlay';

describe('HowToPlay', () => {
	it('renders without crashing', () => {
		render(<HowToPlay />);
	});

	it('displays the correct title', () => {
		const { getByText } = render(<HowToPlay />);
		expect(getByText('How to Play')).toBeInTheDocument();
	});
});
