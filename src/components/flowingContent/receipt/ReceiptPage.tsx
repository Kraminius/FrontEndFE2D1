import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BasketItem } from "../../../types/Types.ts";
import {
  calculatePrice,
  calculateTotalWithBreakdown,
} from "../../../utils/utilFunctions.tsx";
import { UsePaymentContext } from "../../../context/PaymentContext.tsx";

interface ReceiptPageProps {
  items: BasketItem[];
}

const ReceiptPage = ({ items }: ReceiptPageProps) => {
  const navigate = useNavigate();
  const { giftCardAmount, isGiftCardValid, newTotal } = UsePaymentContext();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/"); // Error handling, redirect to home if basket is empty.
    }
  }, [items, navigate]);

  const orderNumber = Math.floor(Math.random() * 1000000); // Integrate with backend for proper order number maybe
  const { subtotal, discountApplied, total } =
    calculateTotalWithBreakdown(items);

  return (
    <div className="receipt-page">
      <h1>Order Confirmation</h1>
      <p>Thank you for your purchase!</p>
      <p>Order Number: {orderNumber}</p>
      <ul className="basket-items-list-receipt">
        {items.map((item) => {
          const { normalPrice, discountedPrice } = calculatePrice(item);
          const isGiftWrapped = item.giftWrap;
          return (
            <li key={item.id} className="basket-item-receipt">
              <span
                className={`item-name-receipt ${isGiftWrapped ? "item-gift-wrapped" : ""}`}
              >
                {item.name}
              </span>
              <span className="item-quantity-receipt">
                Qty: {item.quantity}
              </span>
              <span className="item-price-receipt">
                {normalPrice !== discountedPrice ? (
                  <>
                    <s>{normalPrice.toFixed(2)}</s> {discountedPrice.toFixed(2)}
                  </>
                ) : (
                  normalPrice.toFixed(2)
                )}
              </span>
            </li>
          );
        })}
      </ul>
      <p>Subtotal: {subtotal.toFixed(2)} kr</p>
      {discountApplied > 0 && (
        <>
          <p>Discount applied (10%): -{discountApplied.toFixed(2)} kr</p>
          {!isGiftCardValid && <p>Total: {total.toFixed(2)} kr</p>}
          {isGiftCardValid && (
            <>
              <p>Gift card: -{giftCardAmount} kr</p>
              <p>
                <strong>Total: {newTotal.toFixed(2)} kr</strong>
              </p>
            </>
          )}
        </>
      )}
      <button onClick={() => navigate("/")}>Return to Home</button>
    </div>
  );
};

export default ReceiptPage;
