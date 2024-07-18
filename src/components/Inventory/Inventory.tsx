import React from 'react';
import Item from '../GameBoard';

type Props = {
	items: (typeof Item)[];
};

const Inventory = ({ items }: Props) => {
	return (
		<div className="inventory">
			{items.map(({ alt, image }: any, index: number) => (
				<div key={`${alt}-${index}`} className="inventory-item">
					<img src={image} alt={alt} />
				</div>
			))}
		</div>
	);
};

export default Inventory;
