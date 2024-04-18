// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { useState } from "react";
import {useBasket} from "./RenditionContext.tsx";
import {Delivery} from "./components/flowingContent/delivery/Delivery.tsx";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

export function DeliveryRender() {

    const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();

    const [, setIsDeliveryFormValid] = useState(true);

    function handleNextClick() {

        let nextContentFlow: ContentFlow;
        nextContentFlow = ContentFlow.Payment
        setContentFlow(nextContentFlow);
        window.scrollTo(0, 0);

    }
    function handleBackClick() {
        let nextContentFlow: ContentFlow;
        nextContentFlow = ContentFlow.Basket
        setContentFlow(nextContentFlow);
        window.scrollTo(0, 0);
    }

    return (

        <Delivery
            setIsDeliveryFormValid={setIsDeliveryFormValid}
            handleNextClick={handleNextClick}
            handleBackClick={handleBackClick}
        />
    );
}

export default DeliveryRender;
