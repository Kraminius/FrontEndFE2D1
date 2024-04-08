import { useState } from "react";
import { BasketItem, RecurringOrder } from "../../types/Types";
import CustomerItemCard from "./CustomerItemCard";
import { ContinueButton } from "./Buttons";
import { Delivery } from "./delivery/Delivery";
import PaymentPage from "./payment/PaymentPage.tsx";

enum ContentFlow {
	Basket,
	Delivery,
	Payment,
	Receipt
}
interface FlowingContentProps {
	basketItems: BasketItem[];
	setBasketItems: (items: BasketItem[]) => void;
}

export function FlowingContent({ basketItems, setBasketItems}: FlowingContentProps) {
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
				<Delivery setIsDeliveryFormValid={setIsDeliveryFormValid}
					handleNextClick={handleNextClick}
				/>
			);
		case ContentFlow.Payment:
			return <Payment
				items = {basketItems}
				handleNextClick={handleNextClick}
			/>;
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
		<>
			<div className="basket-items">
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
			</div>
			<ContinueButton onClick={handleNextClick} isDisabled={!isDeliveryFormValid} />
		</>
	) : (
		<div className="empty-basket-message">
			Your basket is empty. <a href="/browse">Browse more items</a>
		</div>
	);
}

interface PaymentProps {
	handleNextClick: () => void;
	items : BasketItem[]
}
function Payment({ handleNextClick, items} : PaymentProps) {
	return (
		<div>
			<PaymentPage onNextClick={handleNextClick} items={items}/>
		</div>
	);
}


function Receipt() {
	return <div>receipt :b</div>;
}