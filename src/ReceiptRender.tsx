// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { useState } from "react";
import { BasketItem, RecurringOrder } from "./types/Types";
import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import {useBasket} from "./RenditionContext.tsx";
import PaymentPage from "./components/flowingContent/payment/PaymentPage.tsx";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

export function ReceiptRender() {

    const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();

    const [, setIsDeliveryFormValid] = useState(true);

    function handleNextClick() {
        throw new Error(
            "Invalid content flow state, cannot continue from receipt.",
        );
        window.scrollTo(0, 0);

    }
    function handleBackClick() {
        let nextContentFlow: ContentFlow;
        nextContentFlow = ContentFlow.Delivery
        setContentFlow(nextContentFlow);
        window.scrollTo(0, 0);
    }

            return (
                <Receipt
                    handleNextClick={handleNextClick}
                    handleBackClick={handleBackClick}
                    items={basketItems}
                />
            );
}

function Receipt({ handleBackClick }: { handleBackClick: () => void }) {
    return (
        <div>
            receipt :b
            <BackButton onClick={handleBackClick} />
        </div>
    );
}

export default ReceiptRender;
