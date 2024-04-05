import React from 'react';
import '../styles/promotion.css';
// @ts-ignore
import defaultImage from "../images/default-product.png";
import { BasketItem } from '../types/Types';

interface PromotionCardProps {
	item: BasketItem;
}

const PromotionCard = ({
	item,
}: PromotionCardProps) => {
	const imageUrl = item.imageUrl || defaultImage;
	return (
		<div className="promotion-card">
			<div className="promotion-image">
				<img src={imageUrl} alt={item.name} />
			</div>
			<div className="promotion-info">
				<div className="promotion-name">{item.name}</div>
				<div className="promotion-price">{`${item.price},-`}</div>
			</div>
		</div>
	);
};
interface PromotionBoxProps {
	basketItems: BasketItem[];
}
const PromotionBox = ({ basketItems }: PromotionBoxProps) => {

	return <div className="promotion-box">
		<div className="title-card">See Also</div>
		<div className="promotion-container">
			{basketItems.map((item) => (
				<PromotionCard key={item.id} item={item} />
			))}
		</div>
	</div>
}

export default PromotionBox;
