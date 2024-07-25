import { IBuilding } from '../helpers/createBuilding';
import { BuildingTile } from '../helpers/tileClass';

export const checkIfInside = (
	x: number,
	y: number,
	buildings: IBuilding[],
	tempBoard: (BuildingTile | any)[][],
): boolean => {
	for (const building of buildings) {
		const { lotSize, door } = building;
		const minX = door?.x ?? 0;
		const maxX = door.x + lotSize.width;
		const minY = door.y;
		const maxY = door.y + lotSize.height;

		if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
			return true;
		}
	}
	return false;
};
