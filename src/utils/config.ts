interface LotSize {
	width: number;
	height: number;
}

interface Door {
	x: number;
	y: number;
}

interface Building {
	lotSize: LotSize;
	door: Door;
	walkWaySize?: number; // Optional property
}

export const buildings: Building[] = [
	{
		lotSize: { width: 16, height: 16 },
		door: { x: 8, y: 15 },
	},
	{
		lotSize: { width: 16, height: 8 },
		door: { x: 8, y: 7 },
		walkWaySize: 3,
	},
	{
		lotSize: { width: 16, height: 8 },
		door: { x: 8, y: 7 },
	},
	{
		lotSize: { width: 8, height: 8 },
		door: { x: 4, y: 7 },
	},
	{
		lotSize: { width: 8, height: 8 },
		door: { x: 4, y: 7 },
	},
];

export const WALKWAY_SIZE = 1;

export const boardWidth = 34 + WALKWAY_SIZE; // includes 2 for border width
export const boardHeight = 34 + WALKWAY_SIZE;
