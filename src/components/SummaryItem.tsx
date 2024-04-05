import { BasketItem } from "../types/Types.ts";
import '../styles/summary.css';
// @ts-ignore
import defaultImage from "../images/default-product.png";
interface SummaryItemProps {
	item: BasketItem;
}

const SummaryItem = ({ item }: SummaryItemProps) => {
	const imageUrl = item.imageUrl || defaultImage;
	let normalPrice = item.price * item.quantity;
	let discountedPrice;

	if ((item.rebateQuantity > 0) && item.quantity >= item.rebateQuantity) {
		discountedPrice = (item.price * item.quantity) - ((item.price * item.quantity) * item.rebatePercent / 100);
	}

	return (
		<div className="summary-item">
			<div className="summary-item-image">
				<img src={imageUrl} alt={item.name} />
			</div>
			<div className="summary-item-amount">{item.quantity}</div>
			<div className="summary-item-name">{item.name}</div>
			<div className="summary-item-total">
				{discountedPrice ?
					<><s style={{ color: 'grey', textDecoration: 'line-through' }}>{normalPrice.toFixed(2)},-</s> <span>{discountedPrice.toFixed(2)},-</span></>
					:
					<>{normalPrice},-</>
				}
			</div>
		</div>
	);
}

export default SummaryItem;