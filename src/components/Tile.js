import React from 'react';

function Tile({ tileData })
{
	let cssClasses = 'tile ';
	if (tileData && tileData.wall)
		cssClasses += 'wall ';

	return (
		<div className={cssClasses}>
			{}
		</div>
	);
}

export default Tile;
