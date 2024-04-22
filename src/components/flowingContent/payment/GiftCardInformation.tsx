import { useEffect } from "react";
import InputField from "./InputField.tsx";
import { calculateTotal } from "../../../utils/utilFunctions.tsx";
import { BasketItem } from "../../../types/Types.ts";
import {
  usePaymentDispatchContext,
  usePaymentContext,
} from "../../../context/PaymentContext.tsx";

function GiftCardInputs({ items }: { items: BasketItem[] }) {
  const { giftCardNumber, giftCardError, giftCardAmount, newTotal } =
    usePaymentContext();
  const dispatch = usePaymentDispatchContext();
  const total = calculateTotal(items);

  useEffect(() => {
    const regex = /^[A-Za-z0-9]{16}$/;
    const isValid = regex.test(giftCardNumber);
    dispatch({ type: "SET_IS_GIFT_CARD_VALID", payload: isValid });

    if (isValid) {
      const discount = getGiftCardAmount(giftCardNumber);
      if (discount === 0) {
        dispatch({ type: "SET_GIFT_CARD_AMOUNT", payload: "" });
        dispatch({
          type: "SET_GIFT_CARD_ERROR",
          payload: "Gift Card is Invalid",
        });
      } else {
        dispatch({
          type: "SET_GIFT_CARD_AMOUNT",
          payload: `Gift Card Amount: ${discount}`,
        });
        dispatch({ type: "SET_GIFT_CARD_ERROR", payload: "" });
        const newTotalValue = total - discount;
        dispatch({
          type: "SET_NEW_TOTAL",
          payload: `New Total: ${newTotalValue < 0 ? 0 : newTotalValue},-`,
        });
      }
    } else {
      if (giftCardNumber === "") {
        dispatch({ type: "SET_GIFT_CARD_AMOUNT", payload: "" });
        dispatch({ type: "SET_GIFT_CARD_ERROR", payload: "" });
      } else {
        dispatch({ type: "SET_GIFT_CARD_AMOUNT", payload: "" });
        dispatch({
          type: "SET_GIFT_CARD_ERROR",
          payload: "Gift Card Not Recognised",
        });
      }
    }
  }, [giftCardNumber, total, dispatch]);

  const handleNumberChange = (number: string) => {
    dispatch({ type: "SET_GIFT_CARD_NUMBER", payload: number });
  };

  return (
    <div>
      <InputField labelText="Gift Card Number" onChange={handleNumberChange} />
      {giftCardAmount && (
        <div>
          <p className="payment-paragraph-styling"> {giftCardAmount}</p>
          <p className="payment-paragraph-styling"> {newTotal}</p>
        </div>
      )}
      {!giftCardAmount && (
        <p className="error-paragraph-styling"> {giftCardError}</p>
      )}
    </div>
  );
}

export default GiftCardInputs;

function getGiftCardAmount(card: string): number {
  switch (card) {
    case "1234abcd5678efgh":
      return 500;
    case "iamaveryrichlady":
      return 30000;
    case "giveme9999rubies":
      return 9999;
    default:
      return 0;
  }
}
