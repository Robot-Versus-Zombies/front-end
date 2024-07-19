import { TileTypeEnum, WallTile, WallTileOrientationEnum } from './tileClass';

interface CreateWallsParams {
	tempBoard: WallTile[][];
	minXIndex: number;
	maxXIndex: number;
	minYIndex: number;
	maxYIndex: number;
}

export const createWalls = ({
	tempBoard,
	minXIndex,
	maxXIndex,
	minYIndex,
	maxYIndex,
}: CreateWallsParams): WallTile[][] => {
	let wallType = WallTileOrientationEnum.STRAIGHT_VERTICAL;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][minXIndex] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
		tempBoard[i][maxXIndex] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
	}
	wallType = WallTileOrientationEnum.STRAIGHT_HORIZONTAL;
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[minYIndex][j] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
		tempBoard[maxYIndex][j] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
	}

	// Sets the corners to the proper wallTypes
	tempBoard[minYIndex][minXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.TOP_LEFT,
		type: TileTypeEnum.WALL,
	});
	tempBoard[minYIndex][maxXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.TOP_RIGHT,
		type: TileTypeEnum.WALL,
	});
	tempBoard[maxYIndex][minXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.BOTTOM_LEFT,
		type: TileTypeEnum.WALL,
	});
	tempBoard[maxYIndex][maxXIndex] = new WallTile({
		wallType: WallTileOrientationEnum.BOTTOM_RIGHT,
		type: TileTypeEnum.WALL,
	});
	return tempBoard;
};
