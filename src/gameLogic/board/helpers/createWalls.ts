import {
	BuildingTile,
	DoorTile,
	TileTypeEnum,
	WallTile,
	WallTileOrientationEnum,
	WallTypeEnum,
} from './tileClass';

interface CreateWallsParams {
	tempBoard: WallTile[][];
	minXIndex: number;
	maxXIndex: number;
	minYIndex: number;
	maxYIndex: number;
	wallType: WallTypeEnum;
}

interface CreateRoofTilesParams {
	tempBoard: (BuildingTile | DoorTile)[][];
	minXIndex: number;
	maxXIndex: number;
	minYIndex: number;
	maxYIndex: number;
	buildingID: string;
}

export const createWalls = ({
	tempBoard,
	minXIndex,
	maxXIndex,
	minYIndex,
	maxYIndex,
	wallType,
}: CreateWallsParams): WallTile[][] => {
	const wallOrientation = WallTileOrientationEnum.LEFT_MIDDLE;
	// Set the left walls
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][minXIndex] = new WallTile({
			wallOrientation,
			type: TileTypeEnum.WALL,
			wallType,
		});
	}

	// Set the right walls
	for (let i = minYIndex; i <= maxYIndex; i++) {
		tempBoard[i][maxXIndex] = new WallTile({
			wallOrientation: WallTileOrientationEnum.RIGHT_MIDDLE,
			type: TileTypeEnum.WALL,
			wallType,
		});
	}

	// Set the top walls
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[minYIndex][j] = new WallTile({
			wallOrientation: WallTileOrientationEnum.TOP_MIDDLE,
			type: TileTypeEnum.WALL,
			wallType,
		});
	}
	// Set the bottom walls
	for (let j = minXIndex; j <= maxXIndex; j++) {
		tempBoard[maxYIndex][j] = new WallTile({
			wallOrientation: WallTileOrientationEnum.BOTTOM_MIDDLE,
			type: TileTypeEnum.WALL,
			wallType,
		});
	}

	// Set the top left corner wall
	tempBoard[minYIndex][minXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.TOP_LEFT,
		type: TileTypeEnum.WALL,
		wallType,
	});

	// Set the top right corner wall
	tempBoard[minYIndex][maxXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.TOP_RIGHT,
		type: TileTypeEnum.WALL,
		wallType,
	});

	// Set the bottom left corner wall
	tempBoard[maxYIndex][minXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.BOTTOM_LEFT,
		type: TileTypeEnum.WALL,
		wallType,
	});

	// Set the bottom right corner wall
	tempBoard[maxYIndex][maxXIndex] = new WallTile({
		wallOrientation: WallTileOrientationEnum.BOTTOM_RIGHT,
		type: TileTypeEnum.WALL,
		wallType,
	});

	return tempBoard;
};

export const createRoofTiles = ({
	tempBoard,
	minXIndex,
	maxXIndex,
	minYIndex,
	maxYIndex,
	buildingID,
}: CreateRoofTilesParams): (BuildingTile | DoorTile)[][] => {
	// Loop through the rows
	for (let i = minYIndex; i <= maxYIndex; i++) {
		// Loop through the columns
		for (let j = minXIndex; j <= maxXIndex; j++) {
			// Create a new BuildingTile for each position
			tempBoard[i][j] = new BuildingTile({
				type: TileTypeEnum.BUILDING,
				buildingID,
			});
		}
	}

	return tempBoard;
};
