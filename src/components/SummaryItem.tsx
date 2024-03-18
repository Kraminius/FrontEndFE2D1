// SummaryItem.tsx
import React from 'react';
import {BasketItem} from "../types/Types.ts";
import '../Styles/summary.css';
// @ts-ignore
import defaultImage from "../images/default-product.png";
import {calculateItemTotal} from "./CustomerItemCard.tsx";

interface SummaryItemProps {
    item: BasketItem;
}

const SummaryItem: React.FC<SummaryItemProps> = ({item}) => {
    const imageUrl = item.imageUrl || defaultImage;
    let normalPrice = item.price * item.quantity;
    let discountedPrice;

    if (item.discount && item.quantity >= item.discount.itemAmountForDiscount) {
        discountedPrice = (item.price * item.quantity) - item.discount.discountAmount;
    }

    return (
        <div className="summary-item">
            <div className="summary-item-image">
                <img src={imageUrl} alt={item.name}/>
            </div>
            <div className="summary-item-amount">{item.quantity}</div>
            <div className="summary-item-name">{item.name}</div>
            <div className="summary-item-total">
                {discountedPrice ?
                    <><s style={{color: 'grey', textDecoration: 'line-through'}}>{normalPrice},-</s> <span>{discountedPrice},-</span></>
                    :
                    <>{normalPrice},-</>
                }
            </div>
        </div>
    );
}

export default SummaryItem;