import { WallTile, WallTileOrientationEnum } from './tileClass';

/**
 * Takes in a 2d array, as well as border dimensions, and creates WallTiles inside the array.
 *
 * @param {Array[]} tempBoard
 * @param {Number} minX
 * @param {Number} minY
 * @param {Number} maxY
 * @param {Number} maxX
 */
export const createWalls = (tempBoard, minX, maxX, minY, maxY) => {
    let wallType = WallTileOrientationEnum.STRAIGHT_VERTICAL
    for (let i = minY; i < maxY; i++) {
		tempBoard[i][minX] = new WallTile({wallType});
		tempBoard[i][maxX - 1] = new WallTile({wallType});
    }
    wallType = WallTileOrientationEnum.STRAIGHT_HORIZONTAL
	for (let j = minX; j < maxX; j++) {
		tempBoard[minY][j] = new WallTile({wallType});
		tempBoard[maxY - 1][j] = new WallTile({wallType});
    }
    
    // Sets the corners to the proper wallTypes
	tempBoard[minY][minX] = new WallTile({
		wallType: WallTileOrientationEnum.TOP_LEFT,
	});
	tempBoard[minY][maxX - 1] = new WallTile({
		wallType: WallTileOrientationEnum.TOP_RIGHT,
	});
	tempBoard[maxY - 1][minX] = new WallTile({
		wallType: WallTileOrientationEnum.BOTTOM_LEFT,
	});
	tempBoard[maxY - 1][maxX - 1] = new WallTile({
		wallType: WallTileOrientationEnum.BOTTOM_RIGHT,
	});
	return tempBoard;
};
