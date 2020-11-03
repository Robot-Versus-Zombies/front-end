import React from 'react';

function Player({ playerX, playerY, direction }) {
	return (
		<div
			style={{ top: playerY * 42 + 'px', left: playerX * 42 + 'px' }}
			className={`player player-${direction}`}></div>
	);
}

export default Player;
