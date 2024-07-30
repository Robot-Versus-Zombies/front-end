import React from 'react';

import Item from '../GameBoard';

interface Item {
	alt: string;
	image: string;
}

type Props = {
	items: Item[];
};

const Inventory = ({ items }: Props) => {
	return (
		<div className="inventory">
			{items.map(({ alt, image }: any, index: number) => (
				<div key={`${alt}-${index}`} className="inventory-item">
					<img
						src={image}
						alt={alt}
						className="inventory-item-image"
					/>
				</div>
			))}
		</div>
	);
};

export default Inventory;
