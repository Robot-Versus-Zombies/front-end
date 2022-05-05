export class TileClass {
	constructor(props) {
		Object.assign(this, props);
	}

	get passable() {
		return !this.impassable;
	}
}

export const WallTileOrientationEnum = {
	STRAIGHT_VERTICAL: 'straight vertical',
	STRAIGHT_HORIZONTAL: 'straight horizontal',
	TOP_LEFT: 'corner top-left',
	TOP_RIGHT: 'corner top-right',
	BOTTOM_LEFT: 'corner bottom-left',
	BOTTOM_RIGHT: 'corner bottom-right',
};

export class WallTile extends TileClass {
	constructor(props) {
		super({ ...props, impassable: true, type: 'wall' });
	}
}

export class GrassTile extends TileClass {
	constructor(props) {
		super({ ...props, type: 'grass' });
	}
}

export class BuildingTile extends TileClass {
	constructor(props) {
		super({ ...props, type: 'building' });
	}
}

export class DoorTile extends TileClass {
	constructor(props) {
		super({ ...props, type: 'door' });
	}
}
