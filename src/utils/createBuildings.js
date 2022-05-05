import { boardHeight, boardWidth, WALKWAY_SIZE } from '../utils/config';
import { BuildingTile, DoorTile } from '../utils/tileClass';
import { createWalls } from '../utils/createWalls';
import { boardHasConflict } from '../utils/createBoard';

export const createBuilding = ({ tempBoard, building }) => {
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

	const buildingTile = new BuildingTile();
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
			tempBoard[i][j] = buildingTile;
		}
	}

	// generates the walls/outline of the buildings
	tempBoard = createWalls({
		tempBoard,
		minXIndex: xLoc + walkWaySize,
		maxXIndex: xLoc + building.lotSize.width - walkWaySize,
		minYIndex: yLoc + walkWaySize,
		maxYIndex: yLoc + building.lotSize.height - walkWaySize,
	});
	if (building.door) {
		tempBoard[building.door.y + yLoc - walkWaySize + 1][
			building.door.x + xLoc
		] = new DoorTile();
	}
};
