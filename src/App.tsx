import React, { useState } from 'react';
import BasketItem from './components/BasketItem';
import BasketSummary from './components/BasketSummary';
import './App.css';

//Mockdata
const initialBasketItems = [
    { id: 1, name: 'Gulerødder', price: 3, quantity: 3 },
    { id: 2, name: 'Ærter', price: 1, quantity: 1 },
];

function App() {
    const [basketItems, setBasketItems] = useState(initialBasketItems);

    const handleQuantityChange = (itemId, newQuantity) => {
        //TODO: Implement the logic to update the quantity of the item in basketItems
    };

    const handleRemove = (itemId) => {
        //TODO: Implement the logic to remove the item from basketItems
    };

    return (
        <div>
            <h2>Shopping Basket</h2>
            {basketItems.map((item) => (
                <BasketItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemove}
                />
            ))}
            <BasketSummary items={basketItems} />
        </div>
    );
}

export default App;