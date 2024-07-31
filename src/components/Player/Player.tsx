import React from 'react';

import { Directions } from '../../gameLogic/helpers/directions';

type Props = {
	playerX: number;
	playerY: number;
	direction?: Directions; // Add a question mark (?) to make it optional
};

const cellSize = 42;

const Player: React.FC<Props> = ({
	playerX,
	playerY,
	direction = 2, // Set the default value to 2
}: Props): JSX.Element => {
	const style: React.CSSProperties = {
		top: playerY * cellSize + 'px',
		left: playerX * cellSize + 'px',
	};

	return <div style={style} className={`player player-${direction}`} />;
};

export default Player;
