// SummaryItem.tsx
import React from 'react';
import {BasketItem} from "../types/Types.ts";
import '../Styles/summary.css';
// @ts-ignore
import defaultImage from "../images/default-product.png";
interface SummaryItemProps {
    item: BasketItem;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ item }) => {
    const imageUrl = item.imageUrl || defaultImage;
    return (
        <div className="summary-item">
            <div className="summary-item-image">
                <img src={imageUrl} alt={item.name}/>
            </div>
            <div className="summary-item-amount">{item.quantity}</div>
            <div className="summary-item-name">{item.name}</div>
            <div className="summary-item-total">{item.quantity * item.price},-</div>
        </div>
    );
}

export default SummaryItem;