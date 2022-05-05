import { boardHeight, boardWidth } from '../utils/config';
import { GrassTile } from '../utils/tileClass';
import { createWalls } from '../utils/createWalls';

export const boardHasConflict = (board, x, y, width, height) => {
	for (let i = y; i < y + height; i++) {
		for (let j = x; j < x + width; j++) {
			if (board[i][j].type !== 'grass') {
				return true;
			}
		}
	}
	return false;
};

export const randomlyPlace = ({ tempBoard }) => {
	let xLoc, yLoc;
	do {
		xLoc = Math.floor(Math.random() * boardWidth);
		yLoc = Math.floor(Math.random() * boardHeight);
	} while (boardHasConflict(tempBoard, xLoc, yLoc, 1, 1));
	return [xLoc, yLoc];
};

export const createBoard = (tempBoard) => {
	// creates 2d array that will make up the board
	for (let i = 0; i < boardHeight; i++) {
		const row = [];
		for (let j = 0; j < boardWidth; j++) {
			const grassTile = new GrassTile();
			row.push(grassTile);
		}
		tempBoard.push(row);
	}

	// drawing the border with walltiles
	tempBoard = createWalls({
		tempBoard,
		minXIndex: 0,
		maxXIndex: boardWidth - 1,
		minYIndex: 0,
		maxYIndex: boardHeight - 1,
	});

	return tempBoard;
};
