import { BasketItemProps } from "../types/Types"
import {useState} from "react";


function BasketItem({ item, onQuantityChange, onGiftWrapChange, onRecurringOrderChange, onRemove }: BasketItemProps) {
    const [showRecurringOptions, setShowRecurringOptions] = useState(false);

    const toggleGiftWrap = () => {
        onGiftWrapChange(item.id, !item.giftWrap);
    };

    const toggleRecurringOptions = () => {
        setShowRecurringOptions(!showRecurringOptions);
    };

    const handleRecurringOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onRecurringOrderChange(item.id, e.target.value);
    };

    return (
        <div className="basket-item">
            <div className="basket-item-details">
                <div className="item-name-and-quantity">
                    <p className="basket-item-name">{item.name}</p>
                    <p className="item-unit-price">{item.price},- per {item.unit}</p>
                    <div className="quantity-control">
                        <button onClick={() => onQuantityChange(item.id, item.quantity-1)}>test</button>
                        <input
                            type="number"
                            min="0"
                            value={item.quantity}
                            onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
                        />
                    </div>
                </div>
                <p className="item-total-price">{item.price * item.quantity},- total</p>
            </div>
            <div className="basket-item-options">
                <div className="item-options">
                    <label className="gift-wrap">
                        <input
                            type="checkbox"
                            checked={item.giftWrap}
                            onChange={toggleGiftWrap}
                        />
                        Gift Wrap?
                    </label>
                </div>
                <label>
                    <input
                        type="checkbox"
                        checked={showRecurringOptions}
                        onChange={toggleRecurringOptions}
                    />
                    Recurring Order
                </label>
                {showRecurringOptions && (
                    <select value={item.recurringOrder} onChange={handleRecurringOrderChange}>
                        <option value="none">None</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Biweekly</option>
                    </select>
                )}
                <button onClick={onRemove}>Remove</button>
            </div>
        </div>
    );
}

export default BasketItem;