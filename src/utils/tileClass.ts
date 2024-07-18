interface TileProps {
	[key: string]: any; // TODO: Define a more specific type
}

export const TileTypeEnum = Object.freeze({
	WALL: 'wall',
	BUILDING: 'building',
	GRASS: 'grass',
	DOOR: 'door',
});

export const WallTileOrientationEnum = Object.freeze({
	STRAIGHT_VERTICAL: 'straight vertical',
	STRAIGHT_HORIZONTAL: 'straight horizontal',
	TOP_LEFT: 'corner top-left',
	TOP_RIGHT: 'corner top-right',
	BOTTOM_LEFT: 'corner bottom-left',
	BOTTOM_RIGHT: 'corner bottom-right',
});

export class TileClass {
	constructor(props: TileProps) {
		Object.assign(this, props);
	}
}

export class WallTile extends TileClass {
	constructor(props: TileProps) {
		super({ ...props, impassable: true, type: TileTypeEnum.WALL });
	}
}

export class GrassTile extends TileClass {
	item: any; // TODO: Define a more specific type
	constructor(props: TileProps) {
		super({ ...props, type: TileTypeEnum.GRASS });
	}
}

export class BuildingTile extends TileClass {
	constructor(props: TileProps) {
		super({ ...props, type: TileTypeEnum.BUILDING });
	}
}

export class DoorTile extends TileClass {
	constructor(props: TileProps) {
		super({ ...props, type: TileTypeEnum.DOOR });
	}
}
