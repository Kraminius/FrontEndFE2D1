import { BasketItemProps, BasketItem } from "../types/Types"
import { useState } from "react";


export default function CustomerBasket({ item, onQuantityChange, onGiftWrapChange, onRecurringOrderChange, onRemove }: BasketItemProps) {
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
		<div className="basket-item" style={{ padding: "10px", border: "solid 1px black" }}>
			<div>
				<span className="basket-item-name">{item.name}</span>
				<span className="item-unit-price">{item.price},- per {item.unit}</span>
				<span className="item-total-price"> {item.price * item.quantity},- total</span>
			</div>
			<ItemCounter item={item} onQuantityChange={onQuantityChange} />
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

interface ItemCounterProps {
	item: BasketItem;
	onQuantityChange: (itemId: number, newQuantity: number) => void;
}
function ItemCounter({ item, onQuantityChange }: ItemCounterProps) {
	return (
		<div>
			<button onClick={() => onQuantityChange(item.id, item.quantity - 1)}> - </button>
			<input
				type="number"
				min="0"
				value={item.quantity}
				onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
			/>

			<button onClick={() => onQuantityChange(item.id, item.quantity + 1)}> + </button>

		</div>
	)
}