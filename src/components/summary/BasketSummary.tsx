import { BasketSummaryProps } from "../../types/Types";
import {calculateItemTotal} from "../../utils/utilfunctions.tsx";

function BasketSummary({ items }: BasketSummaryProps) {
	const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
	const above300 = total - 300;
	const percentRebateOver300 = 10;
	if (above300 >= 0) {
		const totalWithRebate = total * 0.9;
		return (
			<><p className="summaryDiscount">10% discount added,- </p><p
				className="summary">Total: {totalWithRebate.toFixed(2)},-</p></>
		);
	} else return (
		<><p className="summaryDiscount"> Order for {Math.abs(above300)},- more to get {percentRebateOver300}%
			discount.</p><p className="summary">Total: {total.toFixed(2)},-</p></>
	);
}

export default BasketSummary;