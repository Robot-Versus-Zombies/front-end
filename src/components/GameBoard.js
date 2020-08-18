import React, { useState } from 'react';
import Tile from './Tile';
import Player from './Player';

function GameBoard() {
	const width = 25;
	const height = 25;

	const tempBoard = [];
	for (let i = 0; i < height; i++) {
		const row = [];
		for (let j = 0; i < width; i++) {
			row.push(null);
		}
		tempBoard.push(row);
	}
	const [board, setBoard] = useState(tempBoard);

	return (
		<div>
			{board.map((row, indexY) => (
				<div>
					{row.map((tile, indexX) => (
						<Tile key={{ indexX, indexY }} tileData={tile} />
					))}
				</div>
			))}
		</div>
	);
}

export default GameBoard;
