import { GrassTile } from './tileClass';
import { KeyItem } from './itemClass';
import { randomlyPlace } from './createBoard';

export const placeKey = ({ xLoc, yLoc, tempBoard }) => {
	[xLoc, yLoc] = randomlyPlace({ tempBoard });

	const grassTile = new GrassTile();

	const key = new KeyItem();
	grassTile.item = key;
	if (tempBoard?.[yLoc]?.[xLoc]) {
		tempBoard[yLoc][xLoc] = grassTile;
	}
};
