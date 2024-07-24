import {
	WallTile,
	WallTileOrientationEnum,
	TileTypeEnum,
	BuildingTile,
	DoorTile,
} from './tileClass';

interface CreateWallsParams {
	tempBoard: WallTile[][];
	minXIndex: number;
	maxXIndex: number;
	minYIndex: number;
	maxYIndex: number;
}

interface CreateRoofTilesParams {
	tempBoard: (BuildingTile | DoorTile)[][];
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
	const wallOrientation = WallTileOrientationEnum.LEFT_MIDDLE;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][minXIndex] = new WallTile({
			wallOrientation,
			type: TileTypeEnum.WALL,
		});
	}

	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][maxXIndex] = new WallTile({
			wallOrientation: WallTileOrientationEnum.RIGHT_MIDDLE,
			type: TileTypeEnum.WALL,
		});
	}

	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[minYIndex][j] = new WallTile({
			wallOrientation: WallTileOrientationEnum.TOP_MIDDLE,
			type: TileTypeEnum.WALL,
		});
	}

	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[maxYIndex][j] = new WallTile({
			wallOrientation: WallTileOrientationEnum.BOTTOM_MIDDLE,
			type: TileTypeEnum.WALL,
		});
	}

	// Sets the corners to the proper wallOrientations
	tempBoard[minYIndex][minXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.TOP_LEFT,
		type: TileTypeEnum.WALL,
	});
	tempBoard[minYIndex][maxXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.TOP_RIGHT,
		type: TileTypeEnum.WALL,
	});
	tempBoard[maxYIndex][minXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.BOTTOM_LEFT,
		type: TileTypeEnum.WALL,
	});
	tempBoard[maxYIndex][maxXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.BOTTOM_RIGHT,
		type: TileTypeEnum.WALL,
	});

	return tempBoard;
};

export const createRoofTiles = ({
	tempBoard,
	minXIndex,
	maxXIndex,
	minYIndex,
	maxYIndex,
}: CreateRoofTilesParams): (BuildingTile | DoorTile)[][] => {
	for (let i = minYIndex; i <= maxYIndex; i++) {
		for (let j = minXIndex; j <= maxXIndex; j++) {
			tempBoard[i][j] = new BuildingTile({
				type: TileTypeEnum.BUILDING,
			});
		}
	}

	return tempBoard;
};
