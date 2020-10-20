export class TileClass {
	constructor(props) {
		Object.assign(this, props);
	}

	get passable() {
		return !this.impassable;
	}
}

export class WallTile extends TileClass {
	constructor(props) {
		super({ ...props, impassable: true });
	}
}

export class GrassTile extends TileClass {}

export class BuildingTile extends TileClass {}
