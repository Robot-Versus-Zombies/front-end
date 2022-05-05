/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Tile from './Tile';
import Player from './Player';
import Inventory from './Inventory';
import { Directions } from '../utils/directions';
import { createBuilding } from '../utils/createBuildings';
import { boardHeight, boardWidth, buildings } from '../utils/config';
import { randomlyPlace, createBoard } from '../utils/createBoard';
import { BuildingTile } from '../utils/tileClass';
import { placeKey } from '../utils/placeItems';

const GameBoard = ({ isMuted }) => {
	const [board, setBoard] = useState();
	const [playerX, setPlayerX] = useState();
	const [playerY, setPlayerY] = useState();
	const [isInside, setIsInside] = useState();
	const [items, setItems] = useState([]);
	const [direction, setDirection] = useState(Directions.South);

	const populateBoard = useCallback(() => {
		const tempBoard = [];
		setBoard(createBoard(tempBoard));
		// populating board

		buildings.forEach((building) => {
			createBuilding({ tempBoard, building });
		});
		// place player
		const [xLoc, yLoc] = randomlyPlace({
			tempBoard,
		});

		setPlayerX(xLoc);
		setPlayerY(yLoc);

		tempBoard[yLoc][xLoc] instanceof BuildingTile
			? setIsInside(true)
			: setIsInside(false);

		placeKey({ xLoc, yLoc, tempBoard });
	}, [createBuilding, createBoard, randomlyPlace]);

	const keyDown = useCallback(
		(event) => {
			let x = playerX;
			let y = playerY;

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
			if (!board[y][x] || board[y][x].passable) {
				setPlayerX(x);
				setPlayerY(y);
				if (!walkAudio.current.ended) {
					walkAudio.current.currentTime = 0;
				}
				walkAudio.current.play();
			} else {
				whoops.current.play();
			}
		},
		[playerX, playerY, board, direction],
	);
	const walkAudio = useRef();
	const whoops = useRef();
	const beepBoop = useRef();

	useEffect(() => {
		populateBoard();

		walkAudio.current = new Audio(
			'https://robot-versus-zombies.github.io/sounds/07%20Step01.wav',
		);
		whoops.current = new Audio(
			'https://robot-versus-zombies.github.io/sounds/06%20Swing%20n%20Miss.wav',
		);

		beepBoop.current = new Audio(
			'https://robot-versus-zombies.github.io/sounds/05%20Beep%20Boop%20Mellow.wav',
		);
		beepBoop.current.loop = true;
	}, [populateBoard]);

	const savedListener = useRef();

	useEffect(() => {
		window.removeEventListener('keydown', savedListener.current);
		savedListener.current = keyDown;
		window.addEventListener('keydown', keyDown);

		// checking to see if player is about to enter a building
		if (
			board &&
			board[playerY][playerX] instanceof BuildingTile &&
			!isInside
		) {
			setIsInside(true);
		} else if (
			!(board && board[playerY][playerX] instanceof BuildingTile) &&
			isInside
		) {
			setIsInside(false);
		}

		// check for items
		if (board && board[playerY][playerX]?.item) {
			const tempBoard = [...board];
			const item = tempBoard[playerY][playerX].item;
			tempBoard[playerY][playerX].item = null;
			setBoard(tempBoard);

			const tempInv = [...items, item];
			setItems(tempInv);
		}

		const boardEl = document.querySelector('.game-board-container');
		let scrollX = playerX * 42 - 500;
		scrollX = Math.max(scrollX, 0);
		scrollX = Math.min(scrollX, 42 * boardWidth - 1000);

		let scrollY = playerY * 42 - 500;
		scrollY = Math.max(scrollY, 0);
		scrollY = Math.min(scrollY, 42 * boardHeight - 1000);

		boardEl.scroll(scrollX, scrollY);
	}, [playerX, playerY, keyDown, isInside, board, items]);

	useEffect(() => {
		if (isInside) {
			beepBoop.current.play();
		} else {
			beepBoop.current.pause();
		}
	}, [isInside]);

	useEffect(() => {
		if (isMuted) {
			walkAudio.current.volume = 0;
			whoops.current.volume = 0;
			beepBoop.current.volume = 0;
		} else {
			walkAudio.current.volume = 1;
			whoops.current.volume = 1;
			beepBoop.current.volume = 1;
		}
	}, [isMuted]);

	return (
		<>
			<div className="game-board-container">
				<div className="game-board">
					<Player
						direction={direction}
						playerX={playerX}
						playerY={playerY}
					/>
					{board?.map((row, indexY) => (
						<div className="board-row" key={indexY}>
							{row.map((tile, indexX) => (
								<Tile
									key={JSON.stringify({ indexX, indexY })}
									tileData={tile}
								/>
							))}
						</div>
					))}
				</div>
			</div>
			<Inventory items={items} />
		</>
	);
};

export default GameBoard;
