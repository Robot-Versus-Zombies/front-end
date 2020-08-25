import React, { useState } from 'react';

function Player({ playerX, playerY }) {
	return (
		<div
			style={{ top: playerY * 42 + 'px', left: playerX * 42 + 'px' }}
			className="player"></div>
	);
}

export default Player;
