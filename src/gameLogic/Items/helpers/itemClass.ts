import Key from '../../../images/old-key.png';

export interface ItemProps {
	[key: string]: any; // Ideally, define a more specific type
}

class ItemClass {
	constructor(props: ItemProps) {
		Object.assign(this, props);
	}
}

export class KeyItem extends ItemClass {
	image: string;
	alt: string;

	constructor(props?: ItemProps) {
		super(props || {});
		this.image = Key;
		this.alt = 'key';
	}
}
