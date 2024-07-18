import { boardHeight, boardWidth } from './config';
import { GrassTile, TileClass } from './tileClass';
import { createWalls } from './createWalls';
import { TileTypeEnum } from './tileClass';

// IBoard is an interface for a 2D array of Tile instances
export type IBoard = TileClass[][];

export const boardHasConflict = (
	board: GrassTile[][],
	x: number,
	y: number,
	width: number,
	height: number,
): boolean => {
	for (let i = y; i < y + height; i++) {
		for (let j = x; j < x + width; j++) {
			if (board[i][j].type !== 'grass') {
				return true;
			}
		}
	}
	return false;
};

export const randomlyPlace = ({
	tempBoard,
}: {
	tempBoard: GrassTile[][];
}): [number, number] => {
	let xLoc: number, yLoc: number;
	do {
		xLoc = Math.floor(Math.random() * boardWidth);
		yLoc = Math.floor(Math.random() * boardHeight);
	} while (boardHasConflict(tempBoard, xLoc, yLoc, 1, 1));
	return [xLoc, yLoc];
};
export const createBoard = (tempBoard: GrassTile[][]): GrassTile[][] => {
	// creates 2d array that will make up the board
	for (let i = 0; i < boardHeight; i++) {
		const row: GrassTile[] = [];
		for (let j = 0; j < boardWidth; j++) {
			const grassTile: GrassTile = new GrassTile({
				type: TileTypeEnum.GRASS,
			});
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
