import CustomerBasket from './components/CustomerBasket';
import BasketSummary from './components/BasketSummary';
import { BasketItems, RecurringOrder } from './types/Types'
import './App.css';
import { useState } from "react";

const initialBasketItems: BasketItems = [
	{ id: 1, name: 'Gulerødder', price: 3, quantity: 3, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "stk." },
	{ id: 2, name: 'Ærter', price: 1, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "pose" },
	{ id: 3, name: 'Kartofler', price: 2, quantity: 2, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "stk." },
	{ id: 4, name: 'Løg', price: 1, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "stk." },
	{ id: 5, name: 'Hvidløg', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "bundt" },
	{ id: 6, name: 'Ingefær', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "stk." },
	{ id: 7, name: 'Gurkemeje', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "stk." },
	{ id: 8, name: 'Karry', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "glas." },
	{ id: 9, name: 'Kokosmælk', price: 5, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "dåse" },
	{ id: 10, name: 'Ris', price: 3, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.None, unit: "pose" },
];

function App() {
	const [basketItems, setBasketItems] = useState(initialBasketItems);

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		if (newQuantity < 1) { return }
		const updatedItems = basketItems.map(item => {

			if (item.id === itemId) {
				return { ...item, quantity: newQuantity };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleGiftWrapChange = (itemId: number, newGiftWrap: boolean) => {
		const updatedItems = basketItems.map(item => {
			if (item.id === itemId) {
				return { ...item, giftWrap: newGiftWrap };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleRecurringOrderChange = (itemId: number, newRecurringOrder: string) => {
		setBasketItems(prevState => prevState.map(item => {
			if (item.id === itemId) {
				return { ...item, recurringOrder: RecurringOrder[newRecurringOrder as keyof typeof RecurringOrder] };
			}
			return item;
		}));
	}

	const handleRemove = (itemId: number) => {
		setBasketItems(basketItems.filter(item => item.id !== itemId));
	}

	return (
		<div className="shopping-basket">
			<h1>Shopping Basket</h1>
			{basketItems.map((item) => (
				<CustomerBasket
					key={item.id}
					item={item}
					onQuantityChange={handleQuantityChange}
					onGiftWrapChange={handleGiftWrapChange}
					onRecurringOrderChange={handleRecurringOrderChange}
					onRemove={() => handleRemove(item.id)}
				/>
			))}
			<BasketSummary items={basketItems} />
		</div>
	);
}

export default App;