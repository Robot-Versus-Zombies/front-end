import { useCallback } from 'react';

import { placeKey } from '../Items/helpers/placeItems';
import {
	IBoard,
	createBoard,
	randomlyPlace,
} from '../board/helpers/createBoard';
import {
	IBuilding,
	buildings,
	createBuilding,
} from '../board/helpers/createBuilding';
import { BuildingTile, GrassTile } from '../board/helpers/tileClass';

// Define the hook's parameters and return type if needed
type UsePopulateBoardParams = {
	setBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
	setPlayerPosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>;
};

export const usePopulateBoard = ({
	setBoard,
	setPlayerPosition,
}: UsePopulateBoardParams) => {
	return useCallback(() => {
		const tempBoard: GrassTile[][] = [];
		setBoard(createBoard(tempBoard));
		// populating board

		buildings.forEach((building: IBuilding) => {
			createBuilding({ tempBoard, building });
		});
		// place player
		const [xLoc, yLoc] = randomlyPlace({ tempBoard });

		setPlayerPosition({ x: xLoc, y: yLoc });

		placeKey({ xLoc, yLoc, tempBoard });
	}, [setBoard, setPlayerPosition]);
};
