// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { BasketItem, RecurringOrder } from "../../../types/Types.ts";
import CustomerItemCard from "../CustomerItemCard.tsx";
import { ContinueButton } from "../Buttons.tsx";
import {useBasket} from "../RenditionContext.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

export function BasketRender() {

    //const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();
    const { basketItems, setBasketItems, setContentFlow } = useBasket();
    const navigate = useNavigate();

    useEffect(() => {
        setContentFlow(ContentFlow.Basket);
    }, [setContentFlow]);

    function handleNextClick() {
        navigate("/delivery");
        window.scrollTo(0, 0);

    }
            return (
                <Basket
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                    handleNextClick={handleNextClick}
                />
            );
}

interface BasketProps {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[]) => void;
    handleNextClick: () => void;
}

function Basket({ basketItems, setBasketItems, handleNextClick }: BasketProps) {

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
        newRecurringOrder: RecurringOrder,
    ) => {
        if (Object.values(RecurringOrder).includes(newRecurringOrder)) {
            const updatedBasketItems = basketItems.map((item) =>
                item.id === itemId
                    ? { ...item, recurringOrder: newRecurringOrder as RecurringOrder }
                    : item,
            );
            setBasketItems(updatedBasketItems);
        } else {
            console.error("Invalid recurring order type.");
        }
    };

    const handleRemove = (itemId: string) => {
        const updatedItems = basketItems.filter((item) => item.id !== itemId);
        setBasketItems(updatedItems);
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
