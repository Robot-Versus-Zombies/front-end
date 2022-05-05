import React from 'react';

const Inventory = ({ items }) => (
	<div className="inventory">
		{items.map(({ alt, image }) => (
			<div key={alt} className="inventory-item">
				<img src={image} alt={alt} />
			</div>
		))}
	</div>
);

export default Inventory;
