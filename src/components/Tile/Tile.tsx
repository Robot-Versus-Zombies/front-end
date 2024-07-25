import React, { useMemo } from 'react';

import {
	TileTypeEnum,
	WallTileOrientationEnum,
	WallTypeEnum,
} from '../../gameLogic/board/helpers/tileClass';
import { coinFlip } from '../../gameLogic/helpers/coinFlip';

type Props = {
	tileData: {
		type: any;
		wallOrientation?: typeof WallTileOrientationEnum;
		item?: any;
		isInside: boolean;
		wallType: typeof WallTypeEnum;
	};
};

const Tile = ({ tileData }: Props) => {
	// memoizing so we're not reflipping the coin every time the player moves
	const memoizedCoinFlip = useMemo(() => coinFlip(), []);

	const getTileClasses = () => {
		let cssClasses = 'tile ';

		switch (tileData.type) {
			case TileTypeEnum.WALL:
				cssClasses += `${TileTypeEnum.WALL} ${tileData.wallType} ${tileData.wallOrientation}`;
				break;
			case TileTypeEnum.BUILDING:
				tileData.isInside
					? (cssClasses += 'floor')
					: (cssClasses += 'roof');
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
