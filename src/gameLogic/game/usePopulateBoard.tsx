import { useCallback } from 'react';
import {
	createBoard,
	randomlyPlace,
	IBoard,
} from '../board/helpers/createBoard';
import {
	createBuilding,
	buildings,
	IBuilding,
} from '../board/helpers/createBuilding';
import { placeKey } from '../Items/helpers/placeItems';
import { GrassTile, BuildingTile } from '../board/helpers/tileClass';

// Define the hook's parameters and return type if needed
type UsePopulateBoardParams = {
	setBoard: React.Dispatch<React.SetStateAction<IBoard | null>>;
	setPlayerPosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>;
	setIsInside: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePopulateBoard = ({
	setBoard,
	setPlayerPosition,
	setIsInside,
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

		tempBoard[yLoc][xLoc] instanceof BuildingTile
			? setIsInside(true)
			: setIsInside(false);

		placeKey({ xLoc, yLoc, tempBoard });
	}, [setBoard, setPlayerPosition, setIsInside]);
};
