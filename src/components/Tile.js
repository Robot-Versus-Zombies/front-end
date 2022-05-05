import React, { useMemo } from 'react';
import { coinFlip } from '../helpers/coinFlip';

const Tile = ({ tileData }) => {
	// if the random number isn't memoized, it'll regenerate every time the player moves
	// and the grass will appear to move as the player walks
	const memoizedCoinFlip = useMemo(() => coinFlip(), []);

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
			// making about half of the grass tiles have flower art
			default:
				cssClasses += memoizedCoinFlip ? 'grass' : 'grass-flower';
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
