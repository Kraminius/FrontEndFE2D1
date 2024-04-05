//import CustomerItem from "./components/CustomerItem";
import { BasketItem, RecurringOrder } from "./types/Types";
import { useEffect, useState } from "react";
import "./styles/index.css";
import { Footer, Header } from "./components/FooterHeader.tsx";
import CustomerItemCard from "./components/CustomerItemCard.tsx";
import DeliveryComponent from "./components/Delivery.tsx";
import OrderSummary from "./components/OrderSummary.tsx";
import { fetchBasketItems } from "./network/BasketService.ts";
import { ContinueButton } from "./components/reusable_components/Buttons.tsx";
import PromotionBox from "./components/PromotionCard.tsx";

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
	useEffect(() => {
		if (testBasketItems) {
			setBasketItems(testBasketItems);
			return;
		}
		(async () => {
			try {
				let items = await fetchBasketItems();
				items = items.slice(0, 3); // Limit to 3 items
				setBasketItems(items);
			} catch (error) {
				console.error("Error fetching basket items: ", error);
			}
		})();
	}, []);
	return (
		<div>
			<Header />
			<main className="page-components">
				<div id="flow-container">
					<FlowingContent basketItems={basketItems} setBasketItems={setBasketItems} />
				</div>
				<OrderSummary items={basketItems} />
			</main>
			<PromotionBox basketItems={basketItems} />
			<Footer creatorNames={creatorNames} />
		</div>
	);
}


interface ContentFlowProps {
	basketItems: BasketItem[];
	setBasketItems: (items: BasketItem[]) => void;
}

function FlowingContent({ basketItems, setBasketItems }: ContentFlowProps) {
	const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);
	const [isDeliveryFormValid, setIsDeliveryFormValid] = useState(true);

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

	switch (contentFlow) {
		case ContentFlow.Basket:
			return <Basket
				basketItems={basketItems}
				setBasketItems={setBasketItems}
				handleNextClick={handleNextClick}
				isDeliveryFormValid={isDeliveryFormValid}
			/>
		case ContentFlow.Delivery:
			return (
				<Delivery setIsDeliveryFormValid={setIsDeliveryFormValid} />
			);
		case ContentFlow.Payment:
			return <Payment />;
		case ContentFlow.Receipt:
			return <Receipt />;
	}
}
interface BasketProps {
	basketItems: BasketItem[];
	setBasketItems: (items: BasketItem[]) => void;
	handleNextClick: () => void;
	isDeliveryFormValid: boolean;
}


function Basket({
	basketItems,
	setBasketItems,
	handleNextClick,
	isDeliveryFormValid,

}: BasketProps) {
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
	return basketItems.length > 0 ? (
		<div>
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
		</div>
	) : (
		<div className="empty-basket-message">
			Your basket is empty. <a href="/browse">Browse more items</a>
		</div>
	);
}

interface DeliveryProps {
	setIsDeliveryFormValid: (isValid: boolean) => void;

}
function Delivery({ setIsDeliveryFormValid }: DeliveryProps) {
	return (
		<DeliveryComponent onFormValidityChange={setIsDeliveryFormValid} />
	);
}

function Payment() {
	return <div>idk payment I suppose :b</div>;
}

function Receipt() {
	return <div>receipt :b</div>;
}
export default App;
