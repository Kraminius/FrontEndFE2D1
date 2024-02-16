import React from 'react';

function BasketSummary({ items, onGiftWrapToggle, onRecurrenceChange }) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="basket-summary">
            <h3>Total: {total.toFixed(2)},-</h3>
        </div>
    );
}

export default BasketSummary;