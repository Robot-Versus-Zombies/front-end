import React from 'react';

const Player = ({ playerX, playerY, direction }) => (
	<div
		style={{ top: playerY * 42 + 'px', left: playerX * 42 + 'px' }}
		className={`player player-${direction}`}
	/>
);

export default Player;
