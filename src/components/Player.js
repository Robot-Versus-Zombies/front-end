import React from 'react';

function Player({ playerX, playerY }) {
	return (
		<div
			style={{ top: playerY * 42 + 'px', left: playerX * 42 + 'px' }}
			className="player">
			<div className="player-boundary"></div>
		</div>
	);
}

export default Player;
