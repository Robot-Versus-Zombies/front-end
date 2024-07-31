import React from 'react';

import Mute from '../../images/volume_off-24px.svg';
import Unmute from '../../images/volume_up-24px.svg';

interface ToggleButtonProps {
	isMuted: boolean;
	toggleMute: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isMuted, toggleMute }) => (
	<button
		className="button"
		onClick={toggleMute}
		aria-label={isMuted ? 'Unmute' : 'Mute'}>
		<img
			className="image"
			src={isMuted ? Mute : Unmute}
			alt={isMuted ? 'Unmute' : 'Mute'}
		/>
	</button>
);

export default ToggleButton;
