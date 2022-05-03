/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Tile from './Tile';
import Player from './Player';
import Inventory from './Inventory';
import { Directions } from '../utils/directions';
import { createWalls } from '../utils/createWalls';
import {
	boardHeight,
	boardWidth,
	buildings,
	WALKWAY_SIZE,
} from '../utils/config';
import { BuildingTile, GrassTile } from '../utils/tileClass';
import { KeyItem } from '../utils/itemClass';

const GameBoard = ({ isMuted }) => {
	const [board, setBoard] = useState();
	const [playerX, setPlayerX] = useState();
	const [playerY, setPlayerY] = useState();
	const [isInside, setIsInside] = useState();
	const [items, setItems] = useState([]);
	const [direction, setDirection] = useState(Directions.South);

	const randomlyPlace = useCallback((tempBoard) => {
		let xLoc, yLoc;
		do {
			xLoc = Math.floor(Math.random() * boardWidth);
			yLoc = Math.floor(Math.random() * boardHeight);
		} while (boardHasConflict(tempBoard, xLoc, yLoc, 1, 1));
		return [xLoc, yLoc];
	}, []);

	const boardHasConflict = (board, x, y, width, height) => {
		for (let i = y; i < y + height; i++) {
			for (let j = x; j < x + width; j++) {
				if (board[i][j].type !== 'grass') {
					return true;
				}
			}
		}
		return false;
	};
	const createBoard = useCallback((tempBoard) => {
		// creates 2d array that will make up the board
		for (let i = 0; i < boardHeight; i++) {
			const row = [];
			for (let j = 0; j < boardWidth; j++) {
				const grassTile = new GrassTile();
				row.push(grassTile);
			}
			tempBoard.push(row);
		}

		// drawing the border with walltiles
		tempBoard = createWalls({
			tempBoard,
			minXIndex: 0,
			maxXIndex: boardWidth - 1,
			minYIndex: 0,
			maxYIndex: boardHeight - 1,
		});
		setBoard(tempBoard);
	}, []);

	const createBuilding = useCallback((tempBoard, building) => {
		let w, h, xLoc, yLoc;
		const walkWaySize = building.walkWaySize || 1;
		do {
			w = building.lotSize.width;
			h = building.lotSize.height;
			let xNumber = (boardWidth - WALKWAY_SIZE - 2) / w;
			let yNumber = (boardHeight - WALKWAY_SIZE - 2) / h;

			// upper left location of building
			xLoc = Math.floor(Math.random() * xNumber) * w + 1; // 1 for the border
			yLoc = Math.floor(Math.random() * yNumber) * h + 1; // 1 for the border
		} while (boardHasConflict(tempBoard, xLoc, yLoc, w, h));

		const buildingTile = new BuildingTile();
		for (let i = yLoc + walkWaySize; i <= yLoc + h - walkWaySize; i++) {
			for (let j = xLoc + walkWaySize; j <= xLoc + w - walkWaySize; j++) {
				tempBoard[i][j] = buildingTile;
			}
		}

		// generates the walls/outline of the buildings
		tempBoard = createWalls({
			tempBoard,
			minXIndex: xLoc + walkWaySize,
			maxXIndex: xLoc + building.lotSize.width - walkWaySize,
			minYIndex: yLoc + walkWaySize,
			maxYIndex: yLoc + building.lotSize.height - walkWaySize,
		});
		if (building.door) {
			tempBoard[building.door.y + yLoc - walkWaySize + 1][
				building.door.x + xLoc
			] = buildingTile;
		}
	}, []);

	const placeKey = ({ xLoc, yLoc, tempBoard }) => {
		[xLoc, yLoc] = randomlyPlace(tempBoard);

		const grassTile = new GrassTile();

		const key = new KeyItem();
		grassTile.item = key;
		tempBoard[yLoc][xLoc] = grassTile;
	};

	const generateBuildings = useCallback(() => {
		const tempBoard = [];
		createBoard(tempBoard);
		// populating board
		for (let building of buildings) {
			createBuilding(tempBoard, building);
		}
		// place player
		let [xLoc, yLoc] = randomlyPlace(tempBoard);

		setPlayerX(xLoc);
		setPlayerY(yLoc);

		if (tempBoard[yLoc][xLoc] instanceof BuildingTile) {
			setIsInside(true);
		} else {
			setIsInside(false);
		}

		placeKey({ xLoc, yLoc, tempBoard });
	}, [createBuilding, createBoard, randomlyPlace]);

	const savedListener = useRef();

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
		generateBuildings();

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
	}, [generateBuildings]);

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
