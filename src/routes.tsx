
import {RouteObject} from "react-router-dom";
import App from "./App.tsx";
//import BasketSummary from "./components/summary/BasketSummary.tsx";
//import {Delivery} from "./components/flowingContent/delivery/Delivery.tsx";
//import PaymentPage from "./components/flowingContent/payment/PaymentPage.tsx";
import {ContentFlow, FlowingContent} from './components/flowingContent/FlowingContent.tsx'
import {BasketItem} from "./types/Types.ts";
import {useCallback, useEffect, useState} from "react";
import * as path from "path";


export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App/>,
        //errorElement: <ErrorPage />
        children: [

            {path: "basket", element: <Basket/>},
            {path: "delivery", element: <Delivery/>},
            {path: "payment", element: <PaymentPage/>},
            {path: "receipt", element: <Receipt/>},
            {path: "*", element: <div>Not Found</div>}

        ]
    }
]


/*
import {RouteObject} from "react-router-dom";
import App from "./App.tsx";
//import BasketSummary from "./components/summary/BasketSummary.tsx";
//import {Delivery} from "./components/flowingContent/delivery/Delivery.tsx";
//import PaymentPage from "./components/flowingContent/payment/PaymentPage.tsx";
import {ContentFlow, FlowingContent} from './components/flowingContent/FlowingContent.tsx'
import {BasketItem} from "./types/Types.ts";
import {useCallback, useEffect, useState} from "react";
import * as path from "path";



const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
const setBasket = useCallback(
    () => {
        useState
    },
    []
)
const [basketFlow, setBasketFlow] = useState(ContentFlow.Basket);
const [deliveryFlow, setDeliveryFlow] = useState(ContentFlow.Delivery);
const [recieptFlow, setRecieptFlow] = useState(ContentFlow.Receipt);
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        //errorElement: <ErrorPage />
        children: [

            {
                path: "/basket",
                element: <FlowingContent basketItems={basketItems} setBasketItems={setBasketItems} contentFlow={basketFlow} setContentFlow={setBasketFlow} />
            },
            {
                path: "/delivery",
                element: <FlowingContent basketItems={basketItems} setBasketItems={setBasketItems} contentFlow={deliveryFlow} setContentFlow={setDeliveryFlow} />
            },
            {
                path: "/payment",
                element: <FlowingContent basketItems={basketItems} setBasketItems={setBasketItems} contentFlow={recieptFlow} setContentFlow={setRecieptFlow} />
            },
            {
                path: "/receipt",
                element: <Receipt />
            },
        ]
    },
];


 */