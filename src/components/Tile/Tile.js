import React from 'react';
import { coinFlip } from '../../helpers/coinFlip';

const Tile = ({ tileData }) => {
	const getTileClasses = () => {
		let cssClasses = 'tile ';

		switch (tileData.type) {
			case 'wall':
				cssClasses += 'wall ' + tileData.wallType;
				break;
			case 'building':
				cssClasses += 'floor';
				break;
			case 'door':
				cssClasses += 'door';
				break;
			// flipping a coin to decide if a grass tile gets grass art or flower art
			default:
				cssClasses += coinFlip() ? 'grass' : 'grass-flower';
		}
		return cssClasses;
	};

	return (
		<div className={getTileClasses()}>
			{tileData?.item?.image && (
				<img
					className="key-item"
					src={tileData.item.image}
					alt={tileData.item.alt}
				/>
			)}
		</div>
	);
};

export default Tile;
