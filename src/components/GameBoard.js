import React, { useState, useEffect } from 'react';
import Tile from './Tile';
//import Player from './Player';

function GameBoard() {
	const width = 25;
	const height = 25;
	const [board, setBoard] = useState(null);

	useEffect(() => {
		generateRooms();
	}, []);

	function generateRooms() {
		const tempBoard = [];
		for (let i = 0; i < height; i++) {
			const row = [];
			for (let j = 0; j < width; j++) {
				row.push(null);
			}
			tempBoard.push(row);
		}
		const wall = {
			wall: true,
		};
		tempBoard[0][0] = wall;

		setBoard(tempBoard);
	}
	console.log(board, 'board');
	return (
		<div className="game-board">
			{board?.map((row, indexY) => (
				<div className="board-row" key={indexY}>
					{row.map((tile, indexX) => (
						<Tile
							key={JSON.stringify({ indexX, indexY })}
							tileData={tile}
						/>
					))}
				</div>
			))}
		</div>
	);
}

export default GameBoard;
