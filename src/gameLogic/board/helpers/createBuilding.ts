import { boardHeight, boardWidth, WALKWAY_SIZE } from './config';
import { BuildingTile, DoorTile, TileTypeEnum } from './tileClass';
import { createWalls } from './createWalls';
import { boardHasConflict } from './createBoard';

interface ILotSize {
	width: number;
	height: number;
}

interface IDoor {
	x: number;
	y: number;
}

export interface IBuilding {
	walkWaySize?: number;
	lotSize: ILotSize;
	door?: IDoor;
}

export const buildings: IBuilding[] = [
	{
		lotSize: { width: 16, height: 16 },
		door: { x: 8, y: 15 },
	},
	{
		lotSize: { width: 16, height: 8 },
		door: { x: 8, y: 7 },
		walkWaySize: 3,
	},
	{
		lotSize: { width: 16, height: 8 },
		door: { x: 8, y: 7 },
	},
	{
		lotSize: { width: 8, height: 8 },
		door: { x: 4, y: 7 },
	},
	{
		lotSize: { width: 8, height: 8 },
		door: { x: 4, y: 7 },
	},
];

// Define the type for the tempBoard parameter
type TempBoardType = (BuildingTile | DoorTile)[][];

interface CreateBuildingParams {
	tempBoard: TempBoardType;
	building: IBuilding;
}

export const createBuilding = ({
	tempBoard,
	building,
}: CreateBuildingParams): TempBoardType => {
	let xLoc, yLoc;
	const walkWaySize = building.walkWaySize || 1;
	do {
		let xNumber = (boardWidth - WALKWAY_SIZE - 2) / building.lotSize.width;
		let yNumber =
			(boardHeight - WALKWAY_SIZE - 2) / building.lotSize.height;

		// upper left location of building
		xLoc = Math.floor(Math.random() * xNumber) * building.lotSize.width + 1; // 1 for the border
		yLoc =
			Math.floor(Math.random() * yNumber) * building.lotSize.height + 1; // 1 for the border
	} while (
		boardHasConflict(
			tempBoard,
			xLoc,
			yLoc,
			building.lotSize.width,
			building.lotSize.height,
		)
	);

	// Assuming tempBoard is a 2D array representing the game board
	// and building is an object conforming to the IBuilding interface

	const buildingTile = new BuildingTile({
		impassable: false,
		type: TileTypeEnum.BUILDING,
	});
	for (
		let i = yLoc + walkWaySize;
		i <= yLoc + building.lotSize.height - walkWaySize;
		i++
	) {
		for (
			let j = xLoc + walkWaySize;
			j <= xLoc + building.lotSize.width - walkWaySize;
			j++
		) {
			tempBoard[i][j] = buildingTile; // Fill the building area with building tiles
		}
	}

	// Generate the walls/outline of the buildings
	tempBoard = createWalls({
		tempBoard,
		minXIndex: xLoc + walkWaySize,
		maxXIndex: xLoc + building.lotSize.width - walkWaySize,
		minYIndex: yLoc + walkWaySize,
		maxYIndex: yLoc + building.lotSize.height - walkWaySize,
	});

	// Place the door if specified
	if (building.door) {
		const doorY = building.door.y + yLoc - walkWaySize + 1;
		const doorX = building.door.x + xLoc;
		// Ensure the door's position is within the bounds of the board
		if (
			doorY >= 0 &&
			doorY < tempBoard.length &&
			doorX >= 0 &&
			doorX < tempBoard[0].length
		) {
			tempBoard[doorY][doorX] = new DoorTile({
				impassable: false,
				type: TileTypeEnum.DOOR,
			});
		}
	}

	return tempBoard; // Add a return statement to return the tempBoard variable
};
