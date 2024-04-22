import React from "react";
import defaultImage from "../../images/default-product.png";
import { BasketItem, RecurringOrder } from "../../types/Types";
import { calculateItemTotal } from "../../utils/utilFunctions.tsx";
import { useBasketDispatchContext } from "../../context/BasketContext.tsx";

interface CustomerItemCardProps {
  item: BasketItem;
}

const CustomerItemCard: React.FC<CustomerItemCardProps> = ({ item }) => {
  const [imageSrc, setImageSrc] = React.useState(item.imageUrl || defaultImage);
  const basketDispatch = useBasketDispatchContext();

  const handleImageError = () => {
    setImageSrc(defaultImage);
  };

  // onChange={() => useBasketDispContext({ type: "TOGGLE_GIFT_WRAP", payload: { itemId: item.id } })}
  // <button className="item-remover" onClick={() => useBasketDispContext({ type: "REMOVE_ITEM", payload: { itemId: item.id } })}></button>
  // useBasketDispContext({ type: "UPDATE_RECURRING_ORDER", payload: { itemId: item.id, newRecurringOrder: e.target.value as RecurringOrder } })
  const normalPrice = item.price * item.quantity;
  const isPriceDiscounted =
    item.rebateQuantity > 0 && item.quantity >= item.rebateQuantity;

  // if the item is a single item, then we only show the single item price.
  // if the item is more than one, then we show the total price and the single item price is grayed out, but still showing
  const isSingleItem = item.quantity === 1;
  const itemPriceClassesSingle: string = `item-price__cost ${isSingleItem ? "" : "item-price__cost--gray"}`;
  const itemPriceClassesTotal: string = `item-price__cost ${isSingleItem ? "item-price__cost--hidden" : ""}`;
  return (
    <div className="item">
      <div className="item__pane item__pane--left">
        <div className="item__image">
          <img src={imageSrc} alt={item.name} onError={handleImageError} />
        </div>

        <div className="item__options">
          <button
            className="item-remover"
            onClick={() =>
              basketDispatch({
                type: "REMOVE_ITEM",
                payload: { itemId: item.id },
              })
            }
          >
            Remove
          </button>
          <div>
            <input
              type="checkbox"
              checked={item.giftWrap}
              onChange={() =>
                basketDispatch({
                  type: "TOGGLE_GIFT_WRAP",
                  payload: { itemId: item.id },
                })
              }
              id={`gift-wrap-${item.id}`}
            />
            <label className="item-label" htmlFor={`gift-wrap-${item.id}`}>
              Gift Wrap
            </label>
          </div>
        </div>
      </div>
      <div className="item__pane">
        <div className="item-name">{item.name}</div>
        <div className="item-price">
          <span className="item-price__currency">DKK </span>
          <span
            className={itemPriceClassesSingle}
          >{`${item.price.toFixed(2)},-`}</span>
          {isPriceDiscounted && (
            <div
              style={{ color: "grey", textDecoration: "line-through" }}
            >{`${normalPrice.toFixed(2)},-`}</div>
          )}
          <div
            className={itemPriceClassesTotal}
          >{`${calculateItemTotal(item).toFixed(2)},-`}</div>
        </div>
        <Quantity item={item} />
        <div className="item-discount">
          {item.rebateQuantity
            ? `Buy ${item.rebateQuantity} to get a discount of ${item.rebatePercent}%`
            : ""}
        </div>
        <div className="item-id">{`ID: ${item.id}`}</div>

        <select
          value={item.recurringOrder}
          onChange={(e) =>
            basketDispatch({
              type: "UPDATE_RECURRING_ORDER",
              payload: {
                itemId: item.id,
                newRecurringOrder: e.target.value as RecurringOrder,
              },
            })
          }
          id={item.id + "-recurring-order-" + item.recurringOrder.toLowerCase()}
        >
          {Object.values(RecurringOrder).map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

interface QuantityProps {
  item: BasketItem;
}

const Quantity = ({ item }: QuantityProps) => {
  const basketDispatch = useBasketDispatchContext();
  return (
    <div className="quantity">
      <button
        className="quantity__button quantity__button--left"
        aria-label={`Decrease quantity for item ${item.id}`}
        onClick={() =>
          basketDispatch({
            type: "UPDATE_QUANTITY",
            payload: { itemId: item.id, newQuantity: item.quantity - 1 },
          })
        }
      >
        -
      </button>
      <div className="quantity-text">{item.quantity}</div>
      <button
        className="quantity__button quantity__button--right"
        aria-label={`Increase quantity for item ${item.id}`}
        onClick={() =>
          basketDispatch({
            type: "UPDATE_QUANTITY",
            payload: { itemId: item.id, newQuantity: item.quantity + 1 },
          })
        }
      >
        +
      </button>
    </div>
  );
};

export default CustomerItemCard;
