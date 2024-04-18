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
import {useNavigate} from "react-router-dom";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

export function PaymentRender() {

    const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();
    const navigate = useNavigate();

    const [, setIsDeliveryFormValid] = useState(true);

    function handleNextClick() {

        let nextContentFlow: ContentFlow;
        nextContentFlow = ContentFlow.Receipt
        setContentFlow(nextContentFlow);
        navigate("/receipt");
        window.scrollTo(0, 0);

    }
    function handleBackClick() {
        let nextContentFlow: ContentFlow;
        nextContentFlow = ContentFlow.Delivery
        setContentFlow(nextContentFlow);
        navigate("/delivery");
        window.scrollTo(0, 0);
    }

            return (
                <Payment
                    handleNextClick={handleNextClick}
                    handleBackClick={handleBackClick}
                    items={basketItems}
                />
            );
}

interface PaymentProps {
    handleNextClick: () => void;
    handleBackClick: () => void;
    items: BasketItem[];
}

function Receipt({ handleBackClick }: { handleBackClick: () => void }) {
    return (
        <div>
            receipt :b
            <BackButton onClick={handleBackClick} />
        </div>
    );
}
function Payment({ handleNextClick, handleBackClick, items }: PaymentProps) {
    const [isContinueDisabled, setIsContinueDisabled] = useState(false);
    return (
        <div>
            <PaymentPage items={items} isContinueDisabled={setIsContinueDisabled} />
            <ContinueButton
                onClick={handleNextClick}
                isDisabled={isContinueDisabled}
            />
            <BackButton onClick={handleBackClick} />
        </div>
    );
}

export default PaymentRender;
