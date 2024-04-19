// import React from "react";
// import { BasketItem, RecurringOrder } from "./types/Types";
// import CustomerItemCard from "./components/flowingContent/CustomerItemCard.tsx";
// import { BackButton, ContinueButton } from "./components/flowingContent/Buttons.tsx";
import { useState } from "react";
import {useBasket} from "./RenditionContext.tsx";
import {Delivery} from "./components/flowingContent/delivery/Delivery.tsx";
import {useNavigate} from "react-router-dom";

export enum ContentFlow {
    Basket,
    Delivery,
    Payment,
    Receipt,
}

export function DeliveryRender() {

    //const { basketItems, setBasketItems, contentFlow, setContentFlow } = useBasket();
    const { setContentFlow } = useBasket();
    const navigate = useNavigate();

    const [, setIsDeliveryFormValid] = useState(true);



    setContentFlow(ContentFlow.Delivery);

    function handleNextClick() {
        navigate("/payment");
        window.scrollTo(0, 0);

    }
    function handleBackClick() {
        navigate("/basket");
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
