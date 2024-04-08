import React, {useState} from "react";
import {BasketItem, RecurringOrder} from "../../types/Types";
import CustomerItemCard from "./CustomerItemCard";
import {BackButton, ContinueButton} from "./Buttons";
import {Delivery} from "./delivery/Delivery";
import { ContinueButton } from "./Buttons";
import { Delivery } from "./delivery/Delivery";
import PaymentPage from "./payment/PaymentPage.tsx";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

interface FlowingContentProps {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[]) => void;
    contentFlow: ContentFlow;
    setContentFlow: (contentFlow: ContentFlow) => void;
}

export function FlowingContent({basketItems, setBasketItems}: FlowingContentProps) {
	const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);
	const [isDeliveryFormValid, setIsDeliveryFormValid] = useState(true);
    function handleBackClick() {
        let nextContentFlow: ContentFlow;
        switch (contentFlow) {
            case ContentFlow.Basket:
                throw new Error(
                    "Invalid content flow state, cannot go back from basket."
                );
            case ContentFlow.Delivery:
                nextContentFlow = ContentFlow.Basket;
                break;
            case ContentFlow.Payment:
                nextContentFlow = ContentFlow.Delivery;
                break;
            case ContentFlow.Receipt:
                nextContentFlow = ContentFlow.Payment;
                break;
            default:
                throw new Error("Invalid content flow state.");
        }
        setContentFlow(nextContentFlow);
        window.scrollTo(0, 0);
    }

    switch (contentFlow) {
        case ContentFlow.Basket:
            return (
                <Basket
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                    handleNextClick={handleNextClick}
                />
            );
        case ContentFlow.Delivery:
            return (
                <Delivery
                    setIsDeliveryFormValid={setIsDeliveryFormValid}
                    handleNextClick={handleNextClick}
                    handleBackClick={handleBackClick}
                />
            );
        case ContentFlow.Payment:
            return <Payment handleNextClick={handleNextClick}
                            handleBackClick={handleBackClick}/>;
        case ContentFlow.Receipt:
            return <Receipt handleBackClick={handleBackClick}/>;
    }
}

interface BasketProps {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[]) => void;
    handleNextClick: () => void;
}

function Basket({
                    basketItems,
                    setBasketItems,
                    handleNextClick,
                }: BasketProps) {
    const handleQuantityChange = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) {
            return;
        }
        const updatedItems = basketItems.map((item) => {
            if (item.id === itemId) {
                return {...item, quantity: newQuantity};
            }
            return item;
        });
        setBasketItems(updatedItems);
    };

    const handleGiftWrapChange = (itemId: string) => {
        const updatedItems = basketItems.map((item) => {
            if (item.id === itemId) {
                return {...item, giftWrap: !item.giftWrap};
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
                    ? {...item, recurringOrder: newRecurringOrder as RecurringOrder}
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
            <ContinueButton
                onClick={handleNextClick}
            />
        </>
    ) : (
        <div className="empty-basket-message">
            Your basket is empty. <a href="/browse">Browse more items</a>
        </div>
    );
}

interface PaymentProps {
    handleNextClick: () => void;
    handleBackClick: () => void;
	handleNextClick: () => void;
	items : BasketItem[]
}

function Payment({handleNextClick, handleBackClick}: PaymentProps) {
    return (
        <div>
            idk payment I suppose :b
            <ContinueButton
                onClick={handleNextClick}
            />
            <BackButton
                onClick={handleBackClick}
            />
        </div>
    );
}

function Receipt({handleBackClick}: { handleBackClick: () => void }) {
    return <div>receipt :b
        <BackButton
            onClick={handleBackClick}
        />
    </div>;
function Payment({ handleNextClick, items} : PaymentProps) {
	return (
		<div>
			<PaymentPage onNextClick={handleNextClick} items={items}/>
		</div>
	);
}

