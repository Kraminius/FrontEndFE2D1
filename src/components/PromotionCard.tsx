import React, {useState} from 'react'; // Ensure useState is imported
import defaultImage from '../images/default-product.png';
import { BasketItem } from '../types/Types';

interface PromotionCardProps {
	item: BasketItem;
}

const PromotionCard = ({ item }: PromotionCardProps) => {
	const [imageSrc, setImageSrc] = useState(item.imageUrl || defaultImage);
	const [imgKey, setImgKey] = useState(Date.now());

	const handleImageError = () => {
		console.log("Error loading image at: ", imageSrc);
		console.log("Link to default image", defaultImage);
		if (imageSrc !== defaultImage) {
			setImageSrc(defaultImage);
			setImgKey(Date.now());
		}
	};

	return (
		<div className="promotion-card">
			<div className="promotion-image">
				{}
				<img key={imgKey} src={imageSrc} alt={item.name} onError={handleImageError}/>
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
