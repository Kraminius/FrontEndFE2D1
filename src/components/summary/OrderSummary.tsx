import { BasketSummaryProps } from "../../types/Types.ts";
import BasketSummary from "./BasketSummary.tsx";
import SummaryItem from "./SummaryItem.tsx";

function OrderSummary({ items }: BasketSummaryProps) {
	return (
		<div id='summary-wrapper'>
			<div id="summary-container">
				<h2>Order Summary</h2>
				<ul className="item-list">
					{items.map((item, index) => (
						<SummaryItem key={index} item={item} /> // Use SummaryItem for each item
					))}
				</ul>
				<BasketSummary items={items} />

			</div>
		</div>
	);
}

export default OrderSummary;