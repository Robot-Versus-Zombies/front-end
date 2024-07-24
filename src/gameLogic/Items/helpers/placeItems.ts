import { randomlyPlace } from '../../board/helpers/createBoard';
import { GrassTile, TileTypeEnum } from '../../board/helpers/tileClass';
import { KeyItem } from './itemClass';

interface PlaceKeyParams {
	xLoc: number;
	yLoc: number;
	tempBoard: GrassTile[][];
}

export const placeKey = ({ xLoc, yLoc, tempBoard }: PlaceKeyParams): void => {
	[xLoc, yLoc] = randomlyPlace({ tempBoard });

	const grassTile = new GrassTile({
		type: TileTypeEnum.GRASS,
		impassable: false,
	});

	const key = new KeyItem();
	grassTile.item = key;
	if (tempBoard?.[yLoc]?.[xLoc]) {
		tempBoard[yLoc][xLoc] = grassTile;
	}
};
