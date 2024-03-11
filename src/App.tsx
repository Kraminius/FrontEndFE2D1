//import CustomerItem from "./components/CustomerItem";
import { RecurringOrder } from "./types/Types";
import initialBasketItems from "./data";
import { useState } from "react";
import "./Styles/index.css";
import "./Styles/phone_index.css";
import Footer from "./components/Footer";
import CustomerItemCard from "./components/CustomerItemCard.tsx";
import PromotionCard from "./components/PromotionCard.tsx";
import DeliveryComponent from "./components/Delivery.tsx";
import OrderSummary from "./components/OrderSummary.tsx";
const creatorNames = [
	"Christensen, Nicklas Thorbjørn",
	"Gørlyk, Tobias Pedersen",
	"Hansen, Jakob Lars Naur",
	"Jürs, Mikkel",
	"Rolsted, Frederik Emil",
	"Zenkert, Henrik Albert Erik",
];

//const headerNames = ["Type", " ,- /stk.", "Quantity", "Sum", "Options"];
function App() {
	const [basketItems, setBasketItems] = useState(initialBasketItems);

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		if (newQuantity < 1) {
			return;
		}
		const updatedItems = basketItems.map((item) => {
			if (item.id === itemId) {
				return { ...item, quantity: newQuantity };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleGiftWrapChange = (itemId: number) => {
		const updatedItems = basketItems.map((item) => {
			if (item.id === itemId) {
				return { ...item, giftWrap: !item.giftWrap };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleRecurringOrderChange = (
		itemId: number,
		newRecurringOrder: RecurringOrder
	) => {
		if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
			const updatedBasketItems = basketItems.map((item) =>
				item.id === itemId
					? { ...item, recurringOrder: newRecurringOrder as RecurringOrder }
					: item
			);
			setBasketItems(updatedBasketItems);
		} else {
			console.error("Invalid recurring order type.");
		}
	};

	const handleRemove = (itemId: number) => {
		setBasketItems(basketItems.filter((item) => item.id !== itemId));
	};

	const isMobileScreenSize = () => {
		return window.innerWidth <= window.innerHeight;
	}

	const [contentFlow, setContentFlow] = useState(0);
	function handleNextClick() {
		setContentFlow(prevContentFlow => {
			// If the current value is greater than 2, reset to 0 otherwise, increment (Change 2 if you add more pages Guys)
			return prevContentFlow > 2 ? 0 : prevContentFlow + 1;
		});
		window.scrollTo(0, 0);
	}

	function renderContent() {
		switch (contentFlow) {
			case 0: //Basket
				return basketItems.map((item) => (
					<CustomerItemCard
						key={item.id}
						item={item}
						onQuantityChange={handleQuantityChange}
						onGiftWrapChange={handleGiftWrapChange}
						onRecurringOrderChange={handleRecurringOrderChange}
						onRemove={() => handleRemove(item.id)}
					/>
				));
			case 1: //Delivery Information
				return <DeliveryComponent />;
			case 2: //Payment
				return <div>idk payment I suppose :b</div>;
			default: //Last Page - Receipt
				return <div>Receipt page</div>;
		}
	}

	if (isMobileScreenSize()) {
		//Phone View
		return (
			<div>
				<div className="phone-header"> Shopping Basket
				</div>
				<div className="phone-page-components">
					<div className="phone-content-container">
						{renderContent()}
					</div>
					<div className="promotion-box">
						<div className="title-card">See Also</div>
						<div className="promotion-container">
							{basketItems.map((item) => (
								<PromotionCard key={item.id} item={item}/>
							))}
						</div>
					</div>
					<div className="phone-summary-container">
						<OrderSummary items={basketItems}/>
					</div>
					<div className="continue">
						<button className="continue__button" onClick={handleNextClick}>Continue</button>
					</div>

				</div>
				<Footer creatorNames={creatorNames}/>
			</div>
		);
	} else {
		//Monitor View
		return (
			<div>
				<div className="header">
					<h1>Shopping Basket</h1>
				</div>
				<div className="page_components">
					<div className="page_and_summary_container">
						<div className="content-container">
							{renderContent()}
						</div>
						<div className="user-info-container">
							<div className="summary-container">
								<OrderSummary items={basketItems} />
							</div>


						</div>
					</div>
					<div className="continue">
						<button className="continue__button" onClick={handleNextClick}>Continue</button>
					</div>
					<div className="promotion-box">
						<div className="title-card">See Also</div>
						<div className="promotion-container">
							{basketItems.map((item) => (
								<PromotionCard key={item.id} item={item} />
							))}
						</div>
					</div>
				</div>
				<Footer creatorNames={creatorNames} />
			</div>
		);
	}


}


export default App;
