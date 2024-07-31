import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import ToggleButton from './ToggleMuteButton';

describe('ToggleButton', () => {
	it('renders without crashing', () => {
		render(<ToggleButton isMuted={false} toggleMute={() => {}} />);
	});

	it('displays the unmute icon when isMuted is true', () => {
		const { getByAltText } = render(
			<ToggleButton isMuted={true} toggleMute={() => {}} />,
		);
		const unmuteIcon = getByAltText('Unmute');
		expect(unmuteIcon).toBeInTheDocument();
	});

	it('displays the mute icon when isMuted is false', () => {
		const { getByAltText } = render(
			<ToggleButton isMuted={false} toggleMute={() => {}} />,
		);
		const muteIcon = getByAltText('Mute');
		expect(muteIcon).toBeInTheDocument();
	});

	it('calls toggleMute function when the button is clicked', () => {
		const toggleMuteMock = jest.fn();
		const { getByRole } = render(
			<ToggleButton isMuted={false} toggleMute={toggleMuteMock} />,
		);
		const button = getByRole('button');
		fireEvent.click(button);
		expect(toggleMuteMock).toHaveBeenCalled();
	});
});
