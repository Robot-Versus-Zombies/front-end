import Key from '../images/old-key.png';

export class ItemClass {
	constructor(props) {
		Object.assign(this, props);
	}
}

export class KeyItem extends ItemClass {
	constructor(props) {
		super(props);
		this.image = Key;
		this.alt = 'key';
	}
}
