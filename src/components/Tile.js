import React from 'react';
import { BuildingTile, WallTile } from '../utils/tileClass';

function Tile({ tileData }) {
	let cssClasses = 'tile ';
	if (tileData instanceof WallTile) cssClasses += 'wall ';
	if (tileData instanceof BuildingTile) cssClasses += 'floor ';

	return <div className={cssClasses}>{}</div>;
}

export default Tile;
