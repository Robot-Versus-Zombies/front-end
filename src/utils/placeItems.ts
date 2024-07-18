import { GrassTile } from './tileClass';
import { KeyItem } from './itemClass';
import { randomlyPlace } from './createBoard';

import { TileTypeEnum } from './tileClass';

// Assuming GrassTile is the only type in tempBoard, otherwise, define a common base class/interface for all tile types
interface PlaceKeyParams {
	xLoc: number;
	yLoc: number;
	tempBoard: GrassTile[][];
}

export const placeKey = ({ xLoc, yLoc, tempBoard }: PlaceKeyParams): void => {
	[xLoc, yLoc] = randomlyPlace({ tempBoard });

	const grassTile = new GrassTile({ type: TileTypeEnum.GRASS });

	const key = new KeyItem();
	grassTile.item = key;
	if (tempBoard?.[yLoc]?.[xLoc]) {
		tempBoard[yLoc][xLoc] = grassTile;
	}
};
