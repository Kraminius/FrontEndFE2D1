//import CustomerItem from "./components/CustomerItem";
import {BasketItem, RecurringOrder} from "./types/Types";
import {useEffect, useState} from "react";
import "./Styles/index.css";
import "./Styles/phone_index.css";
import Footer from "./components/Footer";
import CustomerItemCard from "./components/CustomerItemCard.tsx";
import PromotionCard from "./components/PromotionCard.tsx";
import DeliveryComponent from "./components/Delivery.tsx";
import OrderSummary from "./components/OrderSummary.tsx";
import {fetchBasketItems} from "./network/BasketService.ts";

const creatorNames = [
    "Christensen, Nicklas Thorbjørn",
    "Gørlyk, Tobias Pedersen",
    "Hansen, Jakob Lars Naur",
    "Jürs, Mikkel",
    "Rolsted, Frederik Emil",
    "Zenkert, Henrik Albert Erik",
];

interface AppProps {
    basketItems?: BasketItem[]; // Make it optional to maintain compatibility
}

// Right now we can use the AppProps interface to define the props for the App component, we use this for testing.
// Alternatively we could use jest.mock to mock the fetchBasketItems function.
function App({basketItems: testBasketItems}: AppProps) {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

    // Fetching the initial items, if testBasketItems is provided, use that instead (for testing purposes).
    useEffect(() => {
        if (testBasketItems) {
            setBasketItems(testBasketItems);
            return;
        }
        (async () => {
            try {
                const items = await fetchBasketItems();
                setBasketItems(items);
            } catch (error) {
                console.error("Error fetching basket items: ", error);

                // show error message to user

            }
        })();
    }, []);

    const [isDeliveryFormValid, setIsDeliveryFormValid] = useState(true);

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

    const isMobileScreenSize = () => {
        return window.innerWidth <= window.innerHeight;
    };

    const [contentFlow, setContentFlow] = useState(0);

    function handleNextClick() {
        setContentFlow((prevContentFlow) => {
            // If the current value is greater than 2, reset to 0 otherwise, increment (Change 2 if you add more pages Guys)
            return prevContentFlow > 2 ? 0 : prevContentFlow + 1;
        });
        window.scrollTo(0, 0);
    }

    function renderContent() {
        switch (contentFlow) {
            case 0: //Basket
                return basketItems.length > 0 ? (
                    basketItems.map((item) => (
                        <CustomerItemCard
                            key={item.id}
                            item={item}
                            onQuantityChange={handleQuantityChange}
                            onGiftWrapChange={handleGiftWrapChange}
                            onRecurringOrderChange={handleRecurringOrderChange}
                            onRemove={() => handleRemove(item.id)}
                        />
                    ))
                ) : (
                    <div className="empty-basket-message">
                        Your basket is empty. <a href="/browse">Browse more items</a>
                    </div>
                );
            case 1: //Delivery Information
                return (
                    <DeliveryComponent onFormValidityChange={setIsDeliveryFormValid}/>
                );
            case 2: //Payment
                return <div>idk payment I suppose :b</div>;
            default: //Last Page - Receipt
                return <div>Receipt page</div>;
        }
    }


    if (isMobileScreenSize()) {
        //Phone View
        return (
            <div>

                <div className="phone-header">

                    <img src="src/images/BS_Logo.png" alt="Our Logo" className="phone-header_image"/>
                    <label>BUY STUFF</label>

                </div>
                <div className="phone-page-components">
                    <div className="phone-content-container">{renderContent()}</div>
                    <div className="promotion-box">
                        <div className="title-card">See Also</div>
                        <div className="promotion-container">
                            {basketItems.map((item) => (
                                <PromotionCard key={item.id} item={item}/>
                            ))}
                        </div>
                    </div>
                    <div className="phone-summary-container">
                        <OrderSummary items={basketItems}/>
                    </div>
                    <div className="continue">
                        <button
                            className="continue__button"
                            onClick={handleNextClick}
                            disabled={!isDeliveryFormValid}
                        >
                            Continue
                        </button>
                    </div>
                </div>
                <Footer creatorNames={creatorNames}/>
            </div>
        );
    } else {
        //Monitor View
        return (
            <div>
                <div className="header">

                    <img src="src/images/BS_Logo.png" alt="Our Logo" className="header_image"/>

                    <h1>BUY STUFF</h1>
                </div>
                <div className="page_components">
                <div className="page_and_summary_container">
                        <div className="content-container">{renderContent()}</div>
                        <div className="user-info-container">
                            <div className="summary-container">
                                <OrderSummary items={basketItems}/>
                            </div>
                        </div>
                    </div>
                    <div className="continue">
                        <button
                            className="continue__button"
                            onClick={handleNextClick}
                            disabled={!isDeliveryFormValid}
                        >
                            Continue
                        </button>
                    </div>
                    <div className="promotion-box">
                        <div className="title-card">See Also</div>
                        <div className="promotion-container">
                            {basketItems.map((item) => (
                                <PromotionCard key={item.id} item={item}/>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer creatorNames={creatorNames}/>
            </div>
        );
    }
}

export default App;
