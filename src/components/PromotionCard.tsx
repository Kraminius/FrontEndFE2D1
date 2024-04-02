import React from 'react';
import '../Styles/promotion.css';
// @ts-ignore
import defaultImage from "../images/default-product.png";
import { BasketItem } from '../types/Types';

interface PromotionCard {
	item: BasketItem;
}

const PromotionCard: React.FC<PromotionCard> = ({
	item,
}) => {
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

export default PromotionCard;
