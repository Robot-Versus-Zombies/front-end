import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import Player from './Player';

describe('Player', () => {
	beforeEach(() => {
		// clear all mocks before each test
		jest.clearAllMocks();
	});

	it('renders without crashing', () => {
		render(<Player playerX={0} playerY={0} direction={0} />);
	});

	it('displays the correct player position', () => {
		const { container } = render(
			<Player playerX={10} playerY={20} direction={1} />,
		);
		const playerElement = container.querySelector('.player');
		expect(playerElement).toHaveStyle({ left: '420px', top: '840px' });
		expect(playerElement).toHaveClass('player');
	});

	it('displays the robot facing south by default', () => {
		const { container } = render(<Player playerX={0} playerY={0} />);
		const playerElement = container.querySelector('.player');
		expect(playerElement).toHaveClass('player-2');
	});

	it('has the correct direction class for west', () => {
		const { container } = render(
			<Player playerX={0} playerY={0} direction={3} />,
		);
		const playerElement = container.querySelector('.player');
		expect(playerElement).toHaveClass('player-3');
	});

	it('has the correct direction class for east', () => {
		const { container } = render(
			<Player playerX={0} playerY={0} direction={1} />,
		);
		const playerElement = container.querySelector('.player');
		expect(playerElement).toHaveClass('player-1');
	});

	it('has the correct direction class for north', () => {
		const { container } = render(
			<Player playerX={0} playerY={0} direction={0} />,
		);
		const playerElement = container.querySelector('.player');
		expect(playerElement).toHaveClass('player-0');
	});

	it('has the correct direction class for south', () => {
		const { container } = render(
			<Player playerX={0} playerY={0} direction={2} />,
		);
		const playerElement = container.querySelector('.player');
		expect(playerElement).toHaveClass('player-2');
	});
});
