import { ItemProps } from '../../Items/helpers/itemClass';

// Define TileProps with specific properties expected in all tiles
interface TileProps {
	impassable?: boolean;
	type: TileTypeEnum;
	item?: null | ItemProps;
	wallOrientation?: WallTileOrientationEnum;
	wallType?: WallTypeEnum;
}

// Define a more specific type for items that can be on a GrassTile

export enum TileTypeEnum {
	WALL = 'wall',
	BUILDING = 'building',
	GRASS = 'grass',
	DOOR = 'door',
	ROOF = 'roof',
}

export enum WallTypeEnum {
	BUILDING = 'building',
	OUTER = 'outer',
}

export enum OuterWallTileOrientationEnum {
	STRAIGHT_VERTICAL = 'straight vertical',
	STRAIGHT_HORIZONTAL = 'straight horizontal',
	TOP_LEFT = 'corner top-left',
	TOP_RIGHT = 'corner top-right',
	BOTTOM_LEFT = 'corner bottom-left',
	BOTTOM_RIGHT = 'corner bottom-right',
}

export enum WallTileOrientationEnum {
	TOP_LEFT = 'corner top-left',
	TOP_RIGHT = 'corner top-right',
	BOTTOM_LEFT = 'corner bottom-left',
	BOTTOM_RIGHT = 'corner bottom-right',
	BOTTOM_MIDDLE = 'bottom-middle',
	TOP_MIDDLE = 'top-middle',
	MIDDLE = 'middle',
	LEFT_MIDDLE = 'left-middle',
	RIGHT_MIDDLE = 'right-middle',
}

export class TileClass {
	type: TileTypeEnum = TileTypeEnum.GRASS; // Add an initializer for the 'type' property
	impassable: any;
	item?: ItemProps;
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
	item?: ItemProps; // Now optionally expects a ItemProps object
	constructor(props: TileProps & { item?: ItemProps }) {
		super({ ...props, impassable: false, type: TileTypeEnum.GRASS });
		this.item = props.item ?? undefined;
	}
}

export class BuildingTile extends TileClass {
	constructor(props: TileProps) {
		super({ ...props, impassable: false, type: TileTypeEnum.BUILDING });
	}
}

export class DoorTile extends TileClass {
	constructor(props: TileProps) {
		super({ ...props, type: TileTypeEnum.DOOR });
	}
}
