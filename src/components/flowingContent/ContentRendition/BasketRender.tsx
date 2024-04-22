// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { BasketItem, RecurringOrder } from "../../../types/Types.ts";
import CustomerItemCard from "../CustomerItemCard.tsx";
import { ContinueButton } from "../Buttons.tsx";
import { useBasket } from "../RenditionContext.tsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ContentFlow } from "../FlowingContent.tsx";
import { useBasketContext, useBasketDispatchContext } from "../../../context/BasketContext.tsx";



export function BasketRender() {
	const basketItems = useBasketContext();
	const navigate = useNavigate();

	function handleNextClick() {
		navigate("/delivery");
		window.scrollTo(0, 0);

	}
	return (
		<Basket
			basketItems={basketItems}
			handleNextClick={handleNextClick}
		/>
	);
}

interface BasketProps {
	basketItems: BasketItem[];
	handleNextClick: () => void;
}

function Basket({ basketItems, handleNextClick }: BasketProps) {
	const useBasketDispContext = useBasketDispatchContext();

	const handleQuantityChange = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) {
			return;
		}
		useBasketDispContext({ type: 'UPDATE_QUANTITY', payload: { itemId, newQuantity } });
	};

	const handleGiftWrapChange = (itemId: string) => {
		useBasketDispContext({ type: 'TOGGLE_GIFT_WRAP', payload: { itemId } });
	};

	const handleRecurringOrderChange = (
		itemId: string,
		newRecurringOrder: RecurringOrder,
	) => {
		useBasketDispContext({ type: 'UPDATE_RECURRING_ORDER', payload: { itemId, newRecurringOrder } });
	};

	const handleRemove = (itemId: string) => {
		useBasketDispContext({ type: 'REMOVE_ITEM', payload: { itemId } });
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
			<ContinueButton onClick={handleNextClick} />
		</>
	) : (
		<div className="empty-basket-message">
			Your basket is empty. <a href="/browse">Browse more items</a>
		</div>
	);
}

export default BasketRender;
