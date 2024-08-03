import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as React from 'react';

import {
	TileTypeEnum,
	WallTileOrientationEnum,
	WallTypeEnum,
} from '../../gameLogic/board/helpers/tileClass';
import Tile from './Tile';

describe('Tile Component', () => {
	test('renders a wall tile with correct classes', () => {
		const tileData = {
			type: TileTypeEnum.WALL,
			wallOrientation: WallTileOrientationEnum.TOP_LEFT,
			wallType: WallTypeEnum.BUILDING,
			isInside: false,
		};

		const { container } = render(<Tile tileData={tileData} />);
		const tileElement = container.firstChild;

		expect(tileElement).toHaveClass('tile');
		expect(tileElement).toHaveClass(TileTypeEnum.WALL);
		expect(tileElement).toHaveClass(WallTileOrientationEnum.TOP_LEFT);
		expect(tileElement).toHaveClass(WallTypeEnum.BUILDING);
	});

	test('renders a building tile with correct classes', () => {
		const tileData = {
			type: TileTypeEnum.BUILDING,
			isInside: true,
		};

		const { container } = render(<Tile tileData={tileData} />);
		const tileElement = container.firstChild;

		expect(tileElement).toHaveClass('tile');
		expect(tileElement).toHaveClass('floor');
	});

	test('renders a door tile with correct classes', () => {
		const tileData = {
			type: TileTypeEnum.DOOR,
			isInside: false,
		};

		const { container } = render(<Tile tileData={tileData} />);
		const tileElement = container.firstChild;

		expect(tileElement).toHaveClass('tile');
		expect(tileElement).toHaveClass(TileTypeEnum.DOOR);
	});

	// TODO: Add a test that checks if the tile is a grass tile with a flower or a regular grass tile

	test('renders an item image if item data is provided', () => {
		const tileData = {
			type: TileTypeEnum.GRASS,
			isInside: false,
			item: {
				image: 'test-image.png',
				alt: 'test item',
			},
		};

		const { getByAltText } = render(<Tile tileData={tileData} />);
		const itemImage = getByAltText('test item');

		expect(itemImage).toBeInTheDocument();
		expect(itemImage).toHaveAttribute('src', 'test-image.png');
	});
});
