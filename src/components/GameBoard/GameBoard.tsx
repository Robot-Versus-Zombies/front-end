import React, { useCallback, useEffect, useRef, useState } from 'react';

import { isInside } from '../../gameLogic/board/helpers/checkIfInside';
import { boardHeight, boardWidth } from '../../gameLogic/board/helpers/config';
import { IBoard } from '../../gameLogic/board/helpers/createBoard';
import {
	BuildingTile,
	TileClass,
} from '../../gameLogic/board/helpers/tileClass';
import { usePopulateBoard } from '../../gameLogic/game/usePopulateBoard';
import { Directions } from '../../gameLogic/helpers/directions';
import { IPlayerPosition } from '../../gameLogic/player/usePlayerMovement';
import { useAudioMuteToggle } from '../../hooks/useAudioMuteToggle';
import Inventory from '../Inventory';
import Player from '../Player';
import Tile from '../Tile';

type Props = {
	isMuted: boolean;
};

const GameBoard = ({ isMuted }: Props) => {
	const [board, setBoard] = useState<IBoard | null>(null);
	const [playerPosition, setPlayerPosition] = useState<IPlayerPosition>({
		x: 0,
		y: 0,
	});

	const [items, setItems] = useState<any>([]);
	const [direction, setDirection] = useState<Directions>(Directions.South);
	const walkAudio = useRef(
		new Audio(
			'https://robot-versus-zombies.github.io/sounds/07%20Step01.wav',
		),
	);
	const whoops = useRef(
		new Audio(
			'https://robot-versus-zombies.github.io/sounds/06%20Swing%20n%20Miss.wav',
		),
	);
	const beepBoop = useRef(
		new Audio(
			'https://robot-versus-zombies.github.io/sounds/05%20Beep%20Boop%20Mellow.wav',
		),
	);

	const populateBoard = usePopulateBoard({
		setBoard,
		setPlayerPosition,
	});
	console.log(board, 'board');
	const keyDown = useCallback(
		(event: { key: string }) => {
			let x = playerPosition.x;
			let y = playerPosition.y;

			switch (event.key) {
				// move up
				case 'w':
					if (direction !== Directions.North) {
						setDirection(Directions.North);
					}
					y -= 1;

					break;
				// move down
				case 's':
					if (direction !== Directions.South) {
						setDirection(Directions.South);
					}
					y += 1;

					break;
				// move left
				case 'a':
					if (direction !== Directions.West) {
						setDirection(Directions.West);
					}
					x -= 1;

					break;
				// move right
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
					if (walkAudio.current && !walkAudio.current.ended) {
						walkAudio.current.currentTime = 0;
					}
					walkAudio?.current?.play();
				} else {
					if (whoops.current) {
						whoops.current.play();
					}
				}
			}
		},
		[playerPosition, board, direction],
	);

	useEffect(() => {
		populateBoard();
		beepBoop.current.loop = true;
		// Cleanup function to pause and potentially reset audio if component unmounts
		return () => {
			walkAudio.current.pause();
			whoops.current.pause();
			beepBoop.current.pause();
			// Reset currentTime if necessary
			// walkAudio.current.currentTime = 0;
			// whoops.current.currentTime = 0;
			// beepBoop.current.currentTime = 0;
		};
	}, [populateBoard]);

	const savedListener: any = useRef();

	useEffect(() => {
		window.removeEventListener('keydown', savedListener.current);
		savedListener.current = keyDown;
		window.addEventListener('keydown', keyDown);

		let playerX = playerPosition.x;
		let playerY = playerPosition.y;

		// // checking to see if player is about to enter a building
		// if (
		// 	board &&
		// 	board[playerY][playerX] instanceof BuildingTile &&
		// 	!isInside
		// ) {
		// 	setIsInside(true);
		// } else if (
		// 	!(board && board[playerY][playerX] instanceof BuildingTile) &&
		// 	isInside
		// ) {
		// 	setIsInside(false);
		// }

		// check for items
		if (board && board[playerY][playerX]?.item) {
			const tempBoard = [...board];
			const item = tempBoard[playerY][playerX].item;
			tempBoard[playerY][playerX].item = undefined;
			setBoard(tempBoard);

			const tempInv = [...items, item].filter(
				(item) => item !== undefined,
			);
			setItems(tempInv);
		}

		const boardEl = document.querySelector('.game-board-container');
		let scrollX = playerX * 42 - 500;
		scrollX = Math.max(scrollX, 0);
		scrollX = Math.min(scrollX, 42 * boardWidth - 1000);

		let scrollY = playerY * 42 - 500;
		scrollY = Math.max(scrollY, 0);
		scrollY = Math.min(scrollY, 42 * boardHeight - 1000);

		boardEl?.scroll(scrollX, scrollY);
	}, [playerPosition, keyDown, board, items]);

	useAudioMuteToggle({
		isMuted,
		audioElements: [walkAudio, whoops, beepBoop],
	});

	return (
		<>
			<div className="game-board-container">
				<div className="game-board">
					<Player
						direction={direction}
						playerX={playerPosition.x}
						playerY={playerPosition.y}
					/>

					{board?.map((row: TileClass[], indexY: number) => {
						return (
							<div className="board-row" key={indexY}>
								{row.map((tile, indexX) => (
									<Tile
										key={JSON.stringify({ indexX, indexY })}
										tileData={{
											...tile,
											isInside: isInside({
												tileWherePlayerIs: board[
													playerPosition.y
												][
													playerPosition.x
												] as BuildingTile,
												tileBeingCreated:
													tile as BuildingTile,
											}),
										}}
									/>
								))}
							</div>
						);
					})}
				</div>
			</div>
			<Inventory items={items} />
		</>
	);
};

export default GameBoard;
