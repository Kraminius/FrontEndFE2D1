//import CustomerItem from "./components/CustomerItem";
import { BasketItem, RecurringOrder } from "./types/Types";
import { useEffect, useState } from "react";
import "./Styles/index.css";
import "./Styles/phone_index.css";
import Footer from "./components/Footer";
import CustomerItemCard from "./components/CustomerItemCard.tsx";
import PromotionCard from "./components/PromotionCard.tsx";
import DeliveryComponent from "./components/Delivery.tsx";
import OrderSummary from "./components/OrderSummary.tsx";
import { fetchBasketItems } from "./network/BasketService.ts";
import { ContinueButton } from "./components/reusable_components/Buttons.tsx";

const creatorNames = [
	"Christensen, Nicklas Thorbjørn",
	"Gørlyk, Tobias Pedersen",
	"Hansen, Jakob Lars Naur",
	"Jürs, Mikkel",
	"Rolsted, Frederik Emil",
	"Zenkert, Henrik Albert Erik",
];
enum ContentFlow {
	Basket,
	Delivery,
	Payment,
	Receipt
}
interface AppProps {
	basketItems?: BasketItem[]; // Make it optional to maintain compatibility
}

// Right now we can use the AppProps interface to define the props for the App component, we use this for testing.
// Alternatively we could use jest.mock to mock the fetchBasketItems function.
function App({ basketItems: testBasketItems }: AppProps) {
	const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
	const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);
	const [isDeliveryFormValid, setIsDeliveryFormValid] = useState(true);
	// Fetching the initial items, if testBasketItems is provided, use that instead (for testing purposes).
	useEffect(() => {
		if (testBasketItems) {
			setBasketItems(testBasketItems);
			return;
		}
		(async () => {
			try {
				const items = await fetchBasketItems();
				setBasketItems(items);
			} catch (error) {
				console.error("Error fetching basket items: ", error);

				// show error message to user

			}
		})();
	}, []);


	const handleQuantityChange = (itemId: string, newQuantity: number) => {
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

	const handleGiftWrapChange = (itemId: string) => {
		const updatedItems = basketItems.map((item) => {
			if (item.id === itemId) {
				return { ...item, giftWrap: !item.giftWrap };
			}
			return item;
		});
		setBasketItems(updatedItems);
	};

	const handleRecurringOrderChange = (
		itemId: string,
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

	const handleRemove = (itemId: string) => {
		setBasketItems(basketItems.filter((item) => item.id !== itemId));
	};

	const isMobileScreenSize = () => {
		return window.innerWidth <= window.innerHeight;
	};


	function handleNextClick() {
		setContentFlow((prevContentFlow) => {
			switch (prevContentFlow) {
				case ContentFlow.Basket:
					return ContentFlow.Delivery;
				case ContentFlow.Delivery:
					return ContentFlow.Payment;
				case ContentFlow.Payment:
					return ContentFlow.Receipt;
				case ContentFlow.Receipt:
					throw new Error("Invalid content flow state, cannot continue from receipt.");
			}
		});
		window.scrollTo(0, 0);
	}

	function renderContent() {
		switch (contentFlow) {
			case ContentFlow.Basket:
				return basketItems.length > 0 ? (
					<>
						{basketItems.map((item) => (
							<CustomerItemCard
								key={item.id}
								item={item}
								onQuantityChange={handleQuantityChange}
								onGiftWrapChange={handleGiftWrapChange}
								onRecurringOrderChange={handleRecurringOrderChange}
								onRemove={() => handleRemove(item.id)}
							/>
						))}
						<ContinueButton onClick={handleNextClick} isDisabled={!isDeliveryFormValid} />
					</>
				) : (
					<div className="empty-basket-message">
						Your basket is empty. <a href="/browse">Browse more items</a>
					</div>
				);
			case ContentFlow.Delivery:
				return (
					<DeliveryComponent onFormValidityChange={setIsDeliveryFormValid} />
				);
			case ContentFlow.Payment:
				return <div>idk payment I suppose :b</div>;
			case ContentFlow.Receipt:
				return <div>receipt :b</div>;
		}
	}

	if (isMobileScreenSize()) {
		//Phone View
		return (
			<div>

				<div className="phone-header">

					<img src="src/images/BS_Logo.png" alt="Our Logo" className="phone-header_image" />
					<div className="phone-brand_name">
					<label>BUY STUFF</label>
					</div>
				</div>
				<div className="phone-page-components">
					<div className="phone-content-container">{renderContent()}</div>
					<div className="promotion-box">
						<div className="title-card">See Also</div>
						<div className="promotion-container">
							{basketItems.map((item) => (
								<PromotionCard key={item.id} item={item} />
							))}
						</div>
					</div>
					<div className="phone-summary-container">
						<OrderSummary items={basketItems} />
					</div>
				</div>
				<Footer creatorNames={creatorNames} />
			</div>
		);
	} else {
		//Monitor View
		return (
			<div>
				<div className="header">

					<img src="src/images/BS_Logo.png" alt="Our Logo" className="header_image" />
					<div className="brand_name">
					<h1>BUY STUFF</h1>
					</div>
				</div>
				<div className="page_components">
					<div className="page_and_summary_container">
						<div className="content-container">{renderContent()}</div>
						<div className="user-info-container">
							<div className="summary-container">
								<OrderSummary items={basketItems} />
							</div>
						</div>
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
