import { BasketItemProps, RecurringOrder } from "../types/Types"
import reactLogo from '/src/assets/react.svg'


export default function CustomerItem({ item, onGiftWrapChange, onRecurringOrderChange, onQuantityChange, onRemove }: BasketItemProps) {


	return (
		<tr key={item.id}>
			<img src={reactLogo} alt="Gift wrapping toggle" />
			<td align="right">
				{item.name}
			</td>
			<td>{item.price},-</td>
			<td align="left">
				<button className="dec-button"
					onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
				{item.quantity}
				<button className="dec-button" onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
			</td>
			<td>{item.price * item.quantity},-</td>
			<td align="left">
				<label htmlFor={"gift-" + item.id}>Gift:
					<input
						id={"gift-" + item.id}
						type="checkbox"
						onClick={() => onGiftWrapChange(item.id)}
					/>
				</label>
				<select value={item.recurringOrder} onChange={(e) => onRecurringOrderChange(item.id, parseInt(e.target.value) as RecurringOrder)}>
					<option value={RecurringOrder.Once}>Once</option>
					<option value={RecurringOrder.Daily}>Daily</option>
					<option value={RecurringOrder.Weekly}>Weekly</option>
					<option value={RecurringOrder.Biweekly}>Biweekly</option>
				</select>
				<button onClick={onRemove}>X</button>
			</td>

		</tr >
	);
}

// <div className="basket-item" style={{ padding: "10px", border: "solid 1px black" }}>
// 	<div>
// 		<span className="basket-item-name">{item.name}</span>
// 		<span className="item-unit-price">{item.price},- per {item.unit}</span>
// 		<span className="item-total-price"> {item.price * item.quantity},- total</span>
// 	</div>
// 	<ItemCounter item={item} onQuantityChange={onQuantityChange} />
// 	<div className="basket-item-options">
// 		<div className="item-options">
// 			<label className="gift-wrap">
// 				<input
// 					type="checkbox"
// 					checked={item.giftWrap}
// 					onChange={toggleGiftWrap}
// 				/>
// 				Gift Wrap?
// 			</label>
// 		</div>
// 		<label>
// 			<input
// 				type="checkbox"
// 				checked={showRecurringOptions}
// 				onChange={toggleRecurringOptions}
// 			/>
// 			Recurring Order
// 		</label>
// 			<select value={item.recurringOrder} onChange={handleRecurringOrderChange}>
// 				<option value="none">None</option>
// 				<option value="daily">Daily</option>
// 				<option value="weekly">Weekly</option>
// 				<option value="biweekly">Biweekly</option>
// 			</select>
// 		<button onClick={onRemove}>Remove</button>
// 	</div>
// </div>
// interface ItemCounterProps {
// 	item: BasketItem;
// 	onQuantityChange: (itemId: number, newQuantity: number) => void;
// }
// function ItemCounter({ item, onQuantityChange }: ItemCounterProps) {
// 	return (
// 		<div>
// 			<button onClick={() => onQuantityChange(item.id, item.quantity - 1)}> - </button>
// 			<input
// 				type="number"
// 				min="0"
// 				value={item.quantity}
// 				onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
// 			/>

// 			<button onClick={() => onQuantityChange(item.id, item.quantity + 1)}> + </button>

// 		</div>
// 	)
// };
