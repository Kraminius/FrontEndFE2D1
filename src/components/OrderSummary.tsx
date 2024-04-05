import { BasketSummaryProps } from "../types/Types";
import BasketSummary from "./BasketSummary.tsx";
import SummaryItem from "./SummaryItem.tsx";
import '../styles/summary.css';

function OrderSummary({ items }: BasketSummaryProps) {
	return (
		<div id='summary-wrapper'>
			<div id="summary-container">
				<h1>Order Summary</h1>
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