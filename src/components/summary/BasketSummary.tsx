import { BasketSummaryProps } from "../../types/Types";
import { CalculateSubTotal } from "../flowingContent/CustomerItemCard";

function BasketSummary({ items }: BasketSummaryProps) {
	const subtotal = items.reduce((sum, item) => sum + CalculateSubTotal(item), 0);
	const largeOrderRebate = subtotal > 300;
	const percentRebateOver300 = 10;
	let discount = 0;
	let totalWithRebate = subtotal;

	// Check if the subtotal is above the threshold for a rebate
	if (largeOrderRebate) {
		discount = subtotal * (percentRebateOver300 / 100); // Calculate the discount
		totalWithRebate = subtotal - discount; // Subtract the discount from the subtotal
	}

	const amountUntilDiscount = 300 - subtotal; // Calculate the amount until discount

	return (
		<>
			<p className="summaryDiscount">Subtotal: {subtotal.toFixed(2)},-</p>
			{largeOrderRebate ? (
				<>
					<p className="summaryDiscount">Discount applied ({percentRebateOver300}%): -{discount.toFixed(2)},-</p>
					<p className="summaryTotal">Total: {totalWithRebate.toFixed(2)},-</p>
				</>
			) : (
				<>
					<p className="summaryDiscount">
						Add {amountUntilDiscount.toFixed(2)},- more to your basket to get a {percentRebateOver300}% discount.
					</p>
					<p className="summaryTotal">Total: {subtotal.toFixed(2)},-</p>
				</>
			)}
		</>
	);
}

export default BasketSummary;
