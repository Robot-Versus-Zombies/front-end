import React from 'react';

interface InventoryItem {
	alt: string;
	image: string;
}

type Props = {
	items: InventoryItem[];
};

const Inventory = ({ items }: Props) => {
	return (
		<div className="inventory">
			{items.map(({ alt, image }, index: number) => (
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
