import {BasketItem, BasketItemProps, RecurringOrder} from "../types/Types";
import {GiftSvg} from "../assets/GiftSvg";
import "../index.css";

export default function CustomerItem({
                                       item,
                                       onGiftWrapChange,
                                       onRecurringOrderChange,
                                       onQuantityChange,
                                       onRemove,
                                     }: BasketItemProps) {

  return (
    <tr key={item.id}>
      <td align="right">{item.name}</td>
      <td>{item.price},-</td>
	  <Quantity onQuantityChange={onQuantityChange} item={item} />
      <td>{item.price * item.quantity},-</td>
      <td>
	  <div className="options-cell">
        <label htmlFor={"gift-" + item.id}>
          <GiftSvg isToggled={item.giftWrap}/>
        </label>
          <input
            id={"gift-" + item.id}
            type="checkbox"
            onClick={() => onGiftWrapChange(item.id)}
          />

<hr />
        <select
          value={item.recurringOrder}
          onChange={(e) =>
            onRecurringOrderChange(
              item.id,
              e.target.value as RecurringOrder
            )
          }
        >
          {Object.values(RecurringOrder).map((order) => (
            <option key={order} value={order}>
              {order}
            </option>
          ))}
        </select>
<hr />
        <button onClick={onRemove}>x</button>
	  </div>
      </td>
    </tr>
  );
}

interface QuantityProps {
  item: BasketItem;
  onQuantityChange: (itemId: number, newQuantity: number) => void;
}

const Quantity = ({onQuantityChange, item}: QuantityProps) => (
  <td >
	  <div className="quantity-cell">
		<button
			  className="quantity-btn"
			  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
			>
			  -
			</button>
			<div className="quantity-text">{item.quantity}</div>
			<button
			  className="quantity-btn"
			  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
			>
			  +
		</button>
	</div>
  </td>
)
