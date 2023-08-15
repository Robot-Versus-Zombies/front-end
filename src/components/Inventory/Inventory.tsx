import React from 'react';

interface Item {
	alt: string;
	image: string;
}

type Props = {
	items: Item[];
};

const Inventory = ({ items }: Props) => {
	console.log(items, 'items');
	return (
		<div className="inventory">
			{items.map(({ alt, image }: any) => (
				<div key={alt} className="inventory-item">
					<img src={image} alt={alt} />
				</div>
			))}
		</div>
	);
};

export default Inventory;
