import { BasketSummaryProps } from "../types/Types";
import { calculateItemTotal } from "../components/CustomerItemCard";

function BasketSummary({ items }: BasketSummaryProps) {
	const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);

	return (
		<p className="summary">Total: {total.toFixed(2)},-</p>
	);
}

export default BasketSummary;