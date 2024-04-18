import BasketSummary from "./BasketSummary.tsx";
import SummaryItem from "./SummaryItem.tsx";
import {useBasketContext} from "../../context/BasketContext.tsx";
import { BasketItem } from "../../types/Types.ts";

function OrderSummary() {
    const items: BasketItem[] = useBasketContext();

    return (
        <div id="summary-wrapper">
            <div id="summary-container">
                <h2>Order Summary</h2>
                <ul className="item-list">
                    {items.map((item: BasketItem, index: number) => (
                        <SummaryItem key={index} item={item} />
                    ))}
                </ul>
                <BasketSummary items={items} />
            </div>
        </div>
    );
}

export default OrderSummary;