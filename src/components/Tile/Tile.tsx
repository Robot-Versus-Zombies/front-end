import React, { useMemo } from 'react';

import {
	TileTypeEnum,
	WallTileOrientationEnum,
	WallTypeEnum,
} from '../../gameLogic/board/helpers/tileClass';
import { coinFlip } from '../../gameLogic/helpers/coinFlip';

type Props = {
	tileData: {
		type: TileTypeEnum;
		wallOrientation?: WallTileOrientationEnum;
		item?: any;
		isInside: boolean;
		wallType?: WallTypeEnum;
	};
};

const Tile: React.FC<Props> = ({ tileData }) => {
	const memoizedCoinFlip = useMemo(() => coinFlip(), []);

	const getTileClasses = () => {
		let cssClasses = 'tile ';

		switch (tileData.type) {
			case TileTypeEnum.WALL:
				cssClasses += `${TileTypeEnum.WALL} ${tileData.wallType} ${tileData.wallOrientation}`;
				break;
			case TileTypeEnum.BUILDING:
				cssClasses += tileData.isInside ? 'floor' : 'roof';
				break;
			case TileTypeEnum.DOOR:
				cssClasses += TileTypeEnum.DOOR;
				break;
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
