import React from 'react';
import { WallTile } from '../utils/tileClass';

function Tile({ tileData }) {
	let cssClasses = 'tile ';
	if (tileData instanceof WallTile) cssClasses += 'wall ';

	return <div className={cssClasses}>{}</div>;
}

export default Tile;
