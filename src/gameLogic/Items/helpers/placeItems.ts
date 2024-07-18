import { TileTypeEnum, GrassTile } from '../../board/helpers/tileClass';
import { KeyItem } from './itemClass';
import { randomlyPlace } from '../../board/helpers/createBoard';

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