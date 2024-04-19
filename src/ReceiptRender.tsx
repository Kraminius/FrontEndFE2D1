// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { BackButton } from "./components/flowingContent/Buttons.tsx";
import {useBasket} from "./RenditionContext.tsx";
import {useNavigate} from "react-router-dom";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

export function ReceiptRender() {

    const { basketItems, setContentFlow } = useBasket()
    const navigate = useNavigate();




    function handleBackClick() {
        let nextContentFlow: ContentFlow;
        nextContentFlow = ContentFlow.Delivery
        setContentFlow(nextContentFlow);
        navigate("/payment");
        window.scrollTo(0, 0);
    }

            return (
                // Consider removing both handelNext and the items as I don't believe thay are used.
                <Receipt
                    handleBackClick={handleBackClick}
                    items={basketItems} //It is not being used, but will probably soon.
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
