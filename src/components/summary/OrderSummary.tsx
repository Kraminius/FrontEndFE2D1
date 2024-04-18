import BasketSummary from "./BasketSummary.tsx";
import SummaryItem from "./SummaryItem.tsx";
import {useBasketContext} from "../../context/BasketContext.tsx";

function OrderSummary() {
    const { items } = useBasketContext();

    return (
        <div id="summary-wrapper">
            <div id="summary-container">
                <h2>Order Summary</h2>
                <ul className="item-list">
                    {items.map((item, index) => (
                        <SummaryItem key={index} item={item} />
                    ))}
                </ul>
                <BasketSummary items={items} />
            </div>
        </div>
    );
}

export default OrderSummary;