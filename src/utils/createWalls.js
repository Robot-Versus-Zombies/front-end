import { WallTile, WallTileOrientationEnum } from './tileClass';

export const createWalls = ({
	tempBoard,
	minXIndex,
	maxXIndex,
	minYIndex,
	maxYIndex,
}) => {
	let wallType = WallTileOrientationEnum.STRAIGHT_VERTICAL;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][minXIndex] = new WallTile({ wallType });
		tempBoard[i][maxXIndex] = new WallTile({ wallType });
	}
	wallType = WallTileOrientationEnum.STRAIGHT_HORIZONTAL;
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[minYIndex][j] = new WallTile({ wallType });
		tempBoard[maxYIndex][j] = new WallTile({ wallType });
	}

	// Sets the corners to the proper wallTypes
	tempBoard[minYIndex][minXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.TOP_LEFT,
	});
	tempBoard[minYIndex][maxXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.TOP_RIGHT,
	});
	tempBoard[maxYIndex][minXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.BOTTOM_LEFT,
	});
	tempBoard[maxYIndex][maxXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.BOTTOM_RIGHT,
	});
	return tempBoard;
};
