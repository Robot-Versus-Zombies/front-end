import {
	WallTile,
	WallTileOrientationEnum,
	OuterWallTileOrientationEnum,
	TileTypeEnum,
	RoofTileOrientationEnum,
	BuildingTile,
} from './tileClass';

interface CreateWallsParams {
	tempBoard: WallTile[][];
	minXIndex: number;
	maxXIndex: number;
	minYIndex: number;
	maxYIndex: number;
}

interface CreateRoofTilesParams {
	buildingTiles: BuildingTile[][];
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
	let wallType = WallTileOrientationEnum.LEFT_MIDDLE;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][minXIndex] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
	}
	wallType = WallTileOrientationEnum.RIGHT_MIDDLE;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][maxXIndex] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
	}
	wallType = WallTileOrientationEnum.TOP_MIDDLE;
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[minYIndex][j] = new WallTile({
			wallType,
			type: TileTypeEnum.WALL,
		});
	}
	wallType = WallTileOrientationEnum.BOTTOM_MIDDLE;
	for (let j = minXIndex; j <= maxXIndex; j++) {
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

export const createRoofTiles = ({
	tempBoard,
	minXIndex,
	maxXIndex,
	minYIndex,
	maxYIndex,
}: CreateWallsParams): WallTile[][] => {
	let roofType = RoofTileOrientationEnum.MIDDLE;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][minXIndex] = new BuildingTile({
			roofType,
			type: TileTypeEnum.BUILDING,
		});
	}

	roofType = RoofTileOrientationEnum.MIDDLE;
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][maxXIndex] = new BuildingTile({
			roofType,
			type: TileTypeEnum.BUILDING,
		});
	}

	roofType = RoofTileOrientationEnum.MIDDLE;
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[minYIndex][j] = new BuildingTile({
			roofType,
			type: TileTypeEnum.BUILDING,
		});
	}
	roofType = RoofTileOrientationEnum.MIDDLE;
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[maxYIndex][j] = new BuildingTile({
			roofType,
			type: TileTypeEnum.BUILDING,
		});
	}

	return tempBoard;
};
