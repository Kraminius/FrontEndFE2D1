
import {RouteObject} from "react-router-dom";
import App from "./App.tsx";
//import BasketSummary from "./components/summary/BasketSummary.tsx";
//import {Delivery} from "./components/flowingContent/delivery/Delivery.tsx";
//import PaymentPage from "./components/flowingContent/payment/PaymentPage.tsx";
import {ContentFlow, FlowingContent} from './components/flowingContent/FlowingContent.tsx'
import {BasketItem} from "./types/Types.ts";
import {useState} from "react";
import {Delivery} from "./components/flowingContent/delivery/Delivery.tsx";


const [basketItems, setBasketItems] = useState<BasketItem[]>([])
export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        //errorElement: <ErrorPage />
        children: [

            {
                path: "/basket",
                element: <FlowingContent basketItems={BasketItem[]} setBasketItems={BasketItem[]} contentFlow={} setContentFlow={} />
            },
            {
                path: "/delivery",
                element: <FlowingContent
                    basketItems={basketItems}
                    setBasketItems={setBasketItems}
                    contentFlow={Flow({ContentFlow.Delivery})}
                    setContentFlow={ Flow content={ContentFlow.Delivery}}
                        />
            },
            {
                path: "/payment",
                element: <Payment />
            },
            {
                path: "/receipt",
                element: <Receipt />
            },
        ]
    },
];

function Flow(content: ContentFlow){
    switch (content) {
        case ContentFlow.Basket: return  useState(ContentFlow.Basket)
        case ContentFlow.Delivery: return useState(ContentFlow.Delivery)
        case ContentFlow.Payment: return  useState(ContentFlow.Payment)

    }
}
