import React, { useState } from 'react';

function BasketItem({ item, onQuantityChange, onRemove }) {
    const [quantity, setQuantity] = useState(item.quantity);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        onQuantityChange(item.id, newQuantity);
    };

    const handleRemove = () => {
        onRemove(item.id);
    };

    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        handleQuantityChange(newQuantity);
    };

    const decrementQuantity = () => {
        const newQuantity = quantity - 1 > 0 ? quantity - 1 : 0;
        handleQuantityChange(newQuantity);
    };


    return (
        <div className="basket-item">
            <p className="basket-item-name">{item.name}</p>
            <div className="quantity-control">
                <button onClick={decrementQuantity}>-</button>
                <input
                    type="number"
                    min="0"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 0)}
                />
                <button onClick={incrementQuantity}>+</button>
            </div>
            <p className="item-price">{item.price * quantity},-</p>
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
}

export default BasketItem;