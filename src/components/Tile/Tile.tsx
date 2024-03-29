import React, { useMemo } from 'react';
import { coinFlip } from '../../helpers/coinFlip';
import { WallTileOrientationEnum, TileTypeEnum } from '../../utils/tileClass';

type Props = {
	tileData: {
		type: any;
		wallType: typeof WallTileOrientationEnum;
		item: any;
	};
};

const Tile = ({ tileData }: Props) => {
	// memoizing so we're not reflipping the coin every time the player moves
	const memoizedCoinFlip = useMemo(() => coinFlip(), []);

	const getTileClasses = () => {
		let cssClasses = 'tile ';

		switch (tileData.type) {
			case TileTypeEnum.WALL:
				cssClasses += TileTypeEnum.WALL + ' ' + tileData.wallType;
				break;
			case TileTypeEnum.BUILDING:
				cssClasses += 'floor';
				break;
			case TileTypeEnum.DOOR:
				cssClasses += TileTypeEnum.DOOR;
				break;
			// flipping a coin to decide if a grass tile gets grass art or flower art
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
