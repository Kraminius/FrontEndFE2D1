import React, { useEffect } from "react";
import { calculatePrice } from "../../utils/utilFunctions.tsx"; // Adjust the path according to your project structure
import defaultImage from "../../images/default-product.png";
import { BasketItem } from "../../types/Types.ts";
interface SummaryItemProps {
  item: BasketItem;
}

const SummaryItem = ({ item }: SummaryItemProps) => {
  const [imageSrc, setImageSrc] = React.useState(item.imageUrl || defaultImage);

  useEffect(() => {
    setImageSrc(item.imageUrl || defaultImage);
  }, [item]);

  const handleImageError = () => {
    setImageSrc(defaultImage);
  };

  const { normalPrice, discountedPrice } = calculatePrice(item);

  return (
    <div className="summary-item">
      <div className="summary-item-image">
        <img src={imageSrc} alt={item.name} onError={handleImageError} />
      </div>
      <div className="summary-item-amount">{item.quantity}</div>
      <div className="summary-item-name">{item.name}</div>
      <div className="summary-item-total">
        {normalPrice !== discountedPrice ? (
          <>
            <s style={{ color: "grey", textDecoration: "line-through" }}>
              {normalPrice.toFixed(2)},-
            </s>
            <div>{discountedPrice.toFixed(2)},-</div>
          </>
        ) : (
          <>{normalPrice.toFixed(2)},-</>
        )}
      </div>
    </div>
  );
};

export default SummaryItem;
