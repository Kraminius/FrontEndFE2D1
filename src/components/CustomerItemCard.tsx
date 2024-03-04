
import React from 'react';
import '../Styles/basket.css';
// @ts-ignore
import defaultImage from "../images/default-product.png";
import { BasketItem, RecurringOrder } from '../types/Types';

interface CustomerItemCardProps {
    item: BasketItem;
    onQuantityChange: (itemId: number, newQuantity: number) => void;
    onGiftWrapChange: (itemId: number) => void;
    onRecurringOrderChange: (itemId: number, newOrderType: RecurringOrder) => void;
    onRemove: (itemId: number) => void;
}

export const calculateItemTotal = (item: BasketItem) => {
    let totalPrice = item.price * item.quantity;


    if (item.discount?.itemAmountForDiscount && item.quantity >= item.discount.itemAmountForDiscount) {
        totalPrice = totalPrice - item.discount.discountAmount;

    } else {
        return totalPrice;
    }
    return totalPrice;
};

const CustomerItemCard: React.FC<CustomerItemCardProps> = ({
    item,
    onQuantityChange,
    onGiftWrapChange,
    onRecurringOrderChange,
    onRemove,
}) => {

    const imageUrl = item.imageUrl || defaultImage;
    return (
        <div className="customer-item-card">
            <div className="options">
                <div className="product-image">
                    <img src={imageUrl} alt={item.name} />
                </div>
                <div className="product-info-aligner">
                    <div className="product-info">
                        <div className="item-name">{item.name}</div>
                        <div className="item-price">{`${item.price},-`}</div>
                    </div>
                    <div className="item-discount">
                        {item.discount?.itemAmountForDiscount ? `Buy ${item.discount.itemAmountForDiscount} to get a discount of ${item.discount.discountAmount}` : ""}
                    </div>
                    <div className="item-total-price">{`Product total: ${calculateItemTotal(item)},-`}</div>
                    <div className="item-id">{`ID: ${item.id}`}</div>
                    <div className="item-desc">{`Type: ${item.unit}`}</div>


                    <select
                        value={item.recurringOrder}
                        onChange={(e) => onRecurringOrderChange(item.id, e.target.value as RecurringOrder)}
                    >
                        {Object.values(RecurringOrder).map((order) => (
                            <option key={order} value={order}>
                                {order}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <div className="options">

                <Quantity onQuantityChange={onQuantityChange} item={item} />
                <button className="item-remover" onClick={() => onRemove(item.id)}>Remove</button>
                <div>
                    <input
                        type="checkbox"
                        checked={item.giftWrap}
                        onChange={() => onGiftWrapChange(item.id)}
                        id={`gift-wrap-${item.id}`}
                    />
                    <label className="item-label" htmlFor={`gift-wrap-${item.id}`}>Gift Wrap</label>
                </div>

            </div>
        </div>
    );
};

interface QuantityProps {
    item: BasketItem;
    onQuantityChange: (itemId: number, newQuantity: number) => void;
}

const Quantity = ({ onQuantityChange, item }: QuantityProps) => (
    <td >
        <div className="quantity-cell">
            <button
                className="quantity-btn"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            >
                -
            </button>
            <div className="quantity-text">{item.quantity}</div>
            <button
                className="quantity-btn"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
            >
                +
            </button>
        </div>
    </td>
)

export default CustomerItemCard;
