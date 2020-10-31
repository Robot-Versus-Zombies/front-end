import React, { useMemo } from 'react';
import { BuildingTile, WallTile } from '../utils/tileClass';
import DarkGreenTile from '../images/RobotZombieGrass_Dark.png';
import DarkGreenFlowerTile from '../images/RobotZombieGrass_DarkFlower.png';
function Tile({ tileData }) {
	let cssClasses = 'tile ';
	if (tileData instanceof WallTile) cssClasses += 'wall ' + tileData.wallType;
	if (tileData instanceof BuildingTile) cssClasses += 'floor ';

	function makeRandomNumber() {
		let randomNumber = Math.floor(Math.random() * Math.floor(2));
		return randomNumber;
	}
	const memoizedRandomNumber = useMemo(() => makeRandomNumber(), []);

	return (
		<div
			className={cssClasses}
			style={
				memoizedRandomNumber
					? { backgroundImage: `url(${DarkGreenTile})` }
					: { backgroundImage: `url(${DarkGreenFlowerTile})` }
			}>
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
