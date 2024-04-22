import { useState } from "react";
import defaultImage from "../images/default-product.png";
import { BasketItem } from "../types/Types";
import {useBasketContext} from "../context/BasketContext.tsx";

interface PromotionCardProps {
  item: BasketItem;
}

const PromotionCard = ({ item }: PromotionCardProps) => {
  const [imageSrc, setImageSrc] = useState(item.imageUrl || defaultImage);
  const handleImageError = () => {
    if (imageSrc !== defaultImage) {
      setImageSrc(defaultImage);
    }
  };

  return (
    <div className="promotion-card">
      <div className="promotion-image">
        {}
        <img src={imageSrc} alt={item.name} onError={handleImageError} />
      </div>
      <div className="promotion-info">
        <div className="promotion-name">{item.name}</div>
        <div className="promotion-price">{`${item.price},-`}</div>
      </div>
    </div>
  );
};


const PromotionBox = () => {

    const basketItems = useBasketContext()

  return (
    <div className="promotion-box">
      <div className="title-card">See Also</div>
      <div className="promotion-container">
        {basketItems.map((item) => (
          <PromotionCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PromotionBox;
