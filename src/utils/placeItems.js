import { GrassTile } from '../utils/tileClass';
import { KeyItem } from '../utils/itemClass';
import { randomlyPlace } from '../utils/createBoard';

export const placeKey = ({ xLoc, yLoc, tempBoard }) => {
	[xLoc, yLoc] = randomlyPlace({ tempBoard });

	const grassTile = new GrassTile();

	const key = new KeyItem();
	grassTile.item = key;
	if (tempBoard?.[yLoc]?.[xLoc]) {
		tempBoard[yLoc][xLoc] = grassTile;
	}
};
