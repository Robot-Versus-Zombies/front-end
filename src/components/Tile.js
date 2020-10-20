import React from 'react';
import { BuildingTile, WallTile } from '../utils/tileClass';

function Tile({ tileData }) {
	let cssClasses = 'tile ';
	if (tileData instanceof WallTile) cssClasses += 'wall ';
	if (tileData instanceof BuildingTile) cssClasses += 'floor ';

	return (
		<div className={cssClasses}>
			{tileData?.item?.image ? (
				<img
					className="key-item"
					src={tileData.item.image}
					alt={tileData.item.alt}
				/>
			) : null}
		</div>
	);
}

export default Tile;
