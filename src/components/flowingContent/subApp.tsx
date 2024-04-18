/*
import {useEffect, useState} from "react";
import {BasketItem, ContentFlow} from "../../types/Types.ts";
import { FlowingContent} from "./FlowingContent.tsx";
import {fetchBasketItems} from "../../network/BasketService.ts";


interface AppProps {
    basketItems?: BasketItem[]; // Make it optional to maintain compatibility
    contentFlow?: ContentFlow.Basket // Initialy its Basket and by default
    setContentFlow?: (content: ContentFlow) => void;
}

// Uses an initial state for basket items and a Contentflow such as basket, delivery, payment or reciept
function SubApp({contentFlow: testContentFlow, basketItems: testBasketItems }: AppProps) {

    const [basketItems, setBasketItems] = useState<BasketItem[]>([])
    const [contentFlow, setContentFlow] = useState<ContentFlow>(ContentFlow.Basket);
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
        if(testContentFlow){
            setContentFlow(testContentFlow)
        }
        if (testBasketItems) {
            setBasketItems(testBasketItems)
            setIsLoading(false)
            return;
        }
        (async () => {
            try {
                let items = await fetchBasketItems()
                setBasketItems(items)
                setError("")
                setIsLoading(false)
            } catch (error) {
                console.error("Error fetching basket items: ", error)
                setError("Error fetching your items, please try reloading the page...")
                setIsLoading(false)
            }
        })();
    }, []);


    return (
                    <div id="flow-container">
                        {isLoading && (
                            <>
                                <div className="loading-text"> Loading your basket...</div>
                                <div className="loading-wheel"></div>
                            </>
                        )}
                        <FlowingContent basketItems={basketItems} setBasketItems={setBasketItems} contentFlow={contentFlow} setContentFlow={setContentFlow}
                        />
                    </div>
    );
}

export default SubApp;

 */
