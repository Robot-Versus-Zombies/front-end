import React from 'react';

type Props = {
	playerX: number;
	playerY: number;
	direction: 0 | 1 | 2 | 3;
};

const Player = ({ playerX, playerY, direction }: Props) => {
	return (
		<div
			style={{ top: playerY * 42 + 'px', left: playerX * 42 + 'px' }}
			className={`player player-${direction}`}
		/>
	);
};

export default Player;
