import CustomerItem from './components/CustomerItem';
import BasketSummary from './components/BasketSummary';
import { RecurringOrder } from './types/Types'
import initialBasketItems from './data';
import { useState } from "react";
import './index.css';

const headerNames = ["Type", "Price", "#", "Sum", "Options"]
function App() {
	const [basketItems, setBasketItems] = useState(initialBasketItems);

	for (let item of basketItems.slice(0, 3)) {
		console.log(item);
	}
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

	const handleGiftWrapChange = (itemId: number) => {
		const updatedItems = basketItems.map(item => {
			if (item.id === itemId) {
				return { ...item, giftWrap: !item.giftWrap };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleRecurringOrderChange = (itemId: number, newRecurringOrder: RecurringOrder) => {
		if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
			const updatedBasketItems = basketItems.map(item =>
				item.id === itemId ? { ...item, recurringOrder: newRecurringOrder as RecurringOrder } : item
			);
			setBasketItems(updatedBasketItems);
		} else {
			console.error("Invalid recurring order type.");
		}
	}

	const handleRemove = (itemId: number) => {
		setBasketItems(basketItems.filter(item => item.id !== itemId));
	}

	return (
		<div className="basket-container">
			<h1>Shopping Basket</h1>
			<table>
				<caption>
					Items you have picked
				</caption>
				<Header headerNames={headerNames} />
				<tbody>
					{basketItems.map((item) => (
						<CustomerItem
							key={item.id}
							item={item}
							onQuantityChange={handleQuantityChange}
							onGiftWrapChange={handleGiftWrapChange}
							onRecurringOrderChange={handleRecurringOrderChange}
							onRemove={() => handleRemove(item.id)}
						/>
					))}
				</tbody>

			</table>
			<BasketSummary items={basketItems} />
		</div>
	);
}

interface HeaderProps {
	headerNames: string[];
}
function Header({ headerNames }: HeaderProps) {
	return (
		<thead>
			<tr>
				{headerNames.map((headerName: string) => <th key={headerName}>{headerName}</th>)}
			</tr>
		</thead>
	)

}

export default App;