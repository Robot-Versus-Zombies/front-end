import { BuildingTile } from '../helpers/tileClass';

export const isInside = ({
	tileWherePlayerIs,
	tileBeingCreated,
}: {
	tileWherePlayerIs: BuildingTile;
	tileBeingCreated: BuildingTile;
}) =>
	tileWherePlayerIs instanceof BuildingTile &&
	tileWherePlayerIs.buildingID === tileBeingCreated?.buildingID;
