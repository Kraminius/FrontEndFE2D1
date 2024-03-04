import { BasketSummaryProps } from "../types/Types";
import BasketSummary from "./BasketSummary.tsx";
import SummaryItem from "./SummaryItem.tsx";
import '../Styles/summary.css';

function OrderSummary({ items }: BasketSummaryProps) {
    return (
        <div>
            <h1>Order Summary</h1>
            <ul className="item-list">
                {items.map((item, index) => (
                    <SummaryItem key={index} item={item} /> // Use SummaryItem for each item
                ))}
            </ul>
            <BasketSummary items={items}/>
        </div>
    );
}

export default OrderSummary;