import React from 'react';

function Tile({ tileData }) {
	return (
		<div className={`tile ${tileData && tileData.wall ? 'wall' : ''}`}>
			{}
		</div>
	);
}

export default Tile;
