import React from 'react';

const Inventory = ( {items} ) => {
    return (
        <div className="inventory">{
            items.map( item => (
                <div className="inventory-item">
                    <img src={item.image} alt={item.alt} />
                </div>
            ) )
        }</div>
        );
}
 
export default Inventory;