import { BasketSummaryProps } from "../types/Types";



function BasketSummary({ items }: BasketSummaryProps) {
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<p className="summary">Total: {total.toFixed(2)},-</p>
	);
}

export default BasketSummary;