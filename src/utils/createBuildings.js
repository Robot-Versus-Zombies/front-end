import { boardHeight, boardWidth, WALKWAY_SIZE } from '../utils/config';
import { BuildingTile } from '../utils/tileClass';
import { createWalls } from '../utils/createWalls';
import { boardHasConflict } from '../utils/createBoard';

export const createBuilding = ({ tempBoard, building }) => {
	let w, h, xLoc, yLoc;
	const walkWaySize = building.walkWaySize || 1;
	do {
		w = building.lotSize.width;
		h = building.lotSize.height;
		let xNumber = (boardWidth - WALKWAY_SIZE - 2) / w;
		let yNumber = (boardHeight - WALKWAY_SIZE - 2) / h;

		// upper left location of building
		xLoc = Math.floor(Math.random() * xNumber) * w + 1; // 1 for the border
		yLoc = Math.floor(Math.random() * yNumber) * h + 1; // 1 for the border
	} while (boardHasConflict(tempBoard, xLoc, yLoc, w, h));

	const buildingTile = new BuildingTile();
	for (let i = yLoc + walkWaySize; i <= yLoc + h - walkWaySize; i++) {
		for (let j = xLoc + walkWaySize; j <= xLoc + w - walkWaySize; j++) {
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
		] = buildingTile;
	}
};
