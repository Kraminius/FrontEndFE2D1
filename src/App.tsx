import React, { useState } from 'react';
import BasketItem from './components/BasketItem';
import BasketSummary from './components/BasketSummary';
import './App.css';

//Mockdata
const initialBasketItems = [
    { id: 1, name: 'Gulerødder', price: 3, quantity: 3, giftWrap: false, recurringOrder: 'none'},
    { id: 2, name: 'Ærter', price: 1, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 3, name: 'Kartofler', price: 2, quantity: 2, giftWrap: false, recurringOrder: 'none' },
    { id: 4, name: 'Løg', price: 1, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 5, name: 'Hvidløg', price: 2, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 6, name: 'Ingefær', price: 2, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 7, name: 'Gurkemeje', price: 2, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 8, name: 'Karry', price: 2, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 9, name: 'Kokosmælk', price: 5, quantity: 1, giftWrap: false, recurringOrder: 'none' },
    { id: 10, name: 'Ris', price: 3, quantity: 1, giftWrap: false, recurringOrder: 'none' },

];

function App() {
    const [basketItems, setBasketItems] = useState(initialBasketItems);

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedItems = basketItems.map(item => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setBasketItems(updatedItems);
    };

    const handleGiftWrapChange = (itemId, newGiftWrap) => {
        const updatedItems = basketItems.map(item => {
            if (item.id === itemId) {
                return { ...item, giftWrap: newGiftWrap };
            }
            return item;
        });
        setBasketItems(updatedItems);
    };

    const handleRecurringOrderChange = (itemId, newRecurringOrder) => {
        const updatedItems = basketItems.map(item => {
            if (item.id === itemId) {
                return { ...item, recurringOrder: newRecurringOrder };
            }
            return item;
        });
        setBasketItems(updatedItems);
    };

    const handleRemove = (itemId) => {
        setBasketItems(basketItems.filter(item => item.id !== itemId));
    }

        return (
            <div className="shopping-basket">
                <h1>Shopping Basket</h1>
                {basketItems.map((item) => (
                    <BasketItem
                        key={item.id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onGiftWrapChange={handleGiftWrapChange}
                        onRecurringOrderChange={handleRecurringOrderChange}
                        onRemove={handleRemove}

                    />
                ))}
                <BasketSummary items={basketItems}/>
            </div>
        );
    }

export default App;