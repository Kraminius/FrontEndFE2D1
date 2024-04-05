
import React from 'react';
// @ts-ignore
import defaultImage from "../../images/default-product.png";
import { BasketItem, RecurringOrder } from '../../types/Types';

interface CustomerItemCardProps {
	item: BasketItem;
	onQuantityChange: (itemId: string, newQuantity: number) => void;
	onGiftWrapChange: (itemId: string) => void;
	onRecurringOrderChange: (itemId: string, newOrderType: RecurringOrder) => void;
	onRemove: (itemId: string) => void;
}

export const calculateItemTotal = (item: BasketItem) => {
	let totalPrice = item.price * item.quantity;


	if (item.rebateQuantity && item.quantity >= item.rebateQuantity) {
		totalPrice = totalPrice - (totalPrice * (item.rebatePercent / 100));

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

	let normalPrice = item.price * item.quantity;
	let isPriceDiscounted = ((item.rebateQuantity > 0) && item.quantity >= item.rebateQuantity)

	// if the item is a single item, then we only show the single item price.
	// if the item is more than one, then we show the total price and the single item price is grayed out, but still showing
	const isSingleItem = item.quantity === 1;
	let itemPriceClassesSingle: string = `item-price__cost ${isSingleItem ? '' : 'item-price__cost--gray'}`
	let itemPriceClassesTotal: string = `item-price__cost ${isSingleItem ? 'item-price__cost--hidden' : ''}`
	return (
		<div className="item">
			<div className="item__pane item__pane--left">
				<div className="item__image">
					<img src={imageUrl} alt={item.name} />
				</div>

				<div className='item__options'>
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
			<div className="item__pane">
				<div className="item-name">{item.name}</div>
				<div className='item-price'>
					<span className='item-price__currency'>DKK </span>
					<span className={itemPriceClassesSingle}>{`${item.price.toFixed(2)},-`}</span>
					{isPriceDiscounted && <div style={{ color: 'grey', textDecoration: 'line-through' }}>{`${normalPrice.toFixed(2)},-`}</div>}
					<div className={itemPriceClassesTotal}>{`${calculateItemTotal(item).toFixed(2)},-`}</div>
				</div>
				<Quantity onQuantityChange={onQuantityChange} item={item} />
				<div className="item-discount">
					{item.rebateQuantity ? `Buy ${item.rebateQuantity} to get a discount of ${item.rebatePercent}%` : ""}
				</div>
				<div className="item-id">{`ID: ${item.id}`}</div>


				<select
					value={item.recurringOrder}
					onChange={(e) => onRecurringOrderChange(item.id, e.target.value as RecurringOrder)}
					id={item.id + "-recurring-order-" + item.recurringOrder.toLowerCase()}
				>
					{Object.values(RecurringOrder).map((order) => (
						<option key={order} value={order}>
							{order}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

interface QuantityProps {
	item: BasketItem;
	onQuantityChange: (itemId: string, newQuantity: number) => void;
}

const Quantity = ({ onQuantityChange, item }: QuantityProps) => (
	<div className="quantity">
		<button
			className="quantity__button quantity__button--left"
			aria-label={`Decrease quantity for item ${item.id}`}
			onClick={() => onQuantityChange(item.id, item.quantity - 1)}
		>
			-
		</button>
		<div className="quantity-text">{item.quantity}</div>
		<button
			className="quantity__button quantity__button--right"
			aria-label={`Increase quantity for item ${item.id}`}
			onClick={() => onQuantityChange(item.id, item.quantity + 1)}
		>
			+
		</button>
	</div>
)

export default CustomerItemCard;
