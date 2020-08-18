import React, { useState } from 'react';

function Tile({ tileData }) {
	return (
		<div
			className="tile"
			style={{
				backgroundColor: tileData && tileData.wall ? 'black' : 'white',
			}}>
			{}
		</div>
	);
}

export default Tile;
