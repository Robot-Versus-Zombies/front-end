import { useCallback, RefObject } from 'react';
import { Directions } from '../helpers/directions';
import { IBoard } from '../board/helpers/createBoard';
export interface IPlayerPosition {
	x: number;
	y: number;
}

type UsePlayerMovementProps = {
	playerPosition: IPlayerPosition;
	setPlayerPosition: SetPlayerPosition;
	direction: Directions;
	setDirection: SetDirection;
	board: IBoard | null;
	walkAudio: RefObject<HTMLAudioElement> | null;
	whoops: RefObject<HTMLAudioElement> | null;
};

type SetPlayerPosition = (position: IPlayerPosition) => void;

type SetDirection = (direction: Directions) => void;

export const usePlayerMovement = ({
	playerPosition,
	setPlayerPosition,
	direction,
	setDirection,
	board,
	walkAudio,
	whoops,
}: UsePlayerMovementProps) => {
	return useCallback(
		(event: { key: string }) => {
			let x = playerPosition.x;
			let y = playerPosition.y;

			switch (event.key) {
				case 'w':
					if (direction !== Directions.North) {
						setDirection(Directions.North);
					}
					y -= 1;
					break;
				case 's':
					if (direction !== Directions.South) {
						setDirection(Directions.South);
					}
					y += 1;
					break;
				case 'a':
					if (direction !== Directions.West) {
						setDirection(Directions.West);
					}
					x -= 1;
					break;
				case 'd':
					if (direction !== Directions.East) {
						setDirection(Directions.East);
					}
					x += 1;
					break;
				default:
					break;
			}

			if (
				event.key === 'a' ||
				event.key === 'w' ||
				event.key === 's' ||
				event.key === 'd'
			) {
				if (board && (!board[y][x] || !board[y][x].impassable)) {
					setPlayerPosition({ x, y });
					if (walkAudio?.current && !walkAudio.current.ended) {
						walkAudio.current.currentTime = 0;
					}
					walkAudio?.current?.play();
				} else {
					if (whoops?.current) {
						whoops.current.play();
					}
				}
			}
		},
		[
			playerPosition,
			board,
			direction,
			setPlayerPosition,
			setDirection,
			walkAudio,
			whoops,
		],
	);
};
