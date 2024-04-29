import { useEffect, useState } from "react";
import PaymentPage from "../payment/PaymentPage.tsx";
import { useNavigate } from "react-router-dom";
import { usePaymentDispatchContext } from "../../../context/PaymentContext.tsx";

export function PaymentRender() {
  const navigate = useNavigate();
  const paymentDispatch = usePaymentDispatchContext();

  function handleNextClick() {
    paymentDispatch({ type: "SET_PAYMENT_COMPLETED", payload: true });
    navigate("/receipt");
    window.scrollTo(0, 0);
  }
  function handleBackClick() {
    paymentDispatch({ type: "SET_IS_MOBILE_PAY_VALID", payload: false });
    paymentDispatch({ type: "SET_IS_CARD_VALID", payload: false });
    paymentDispatch({ type: "SET_IS_GIFT_CARD_VALID", payload: false });
    paymentDispatch({ type: "SET_IS_VALID", payload: false });
    navigate("/delivery");
    window.scrollTo(0, 0);
  }
  const resetValidationStates = () => {
    paymentDispatch({ type: "SET_IS_CARD_VALID", payload: false });
    paymentDispatch({ type: "SET_IS_MOBILE_PAY_VALID", payload: false });
    paymentDispatch({ type: "SET_IS_GIFT_CARD_VALID", payload: false });
    paymentDispatch({ type: "SET_IS_VALID", payload: false });
  };

  useEffect(() => {
    resetValidationStates();
  }, []);

  return (
    <PaymentPage
      handleNextClick={handleNextClick}
      handleBackClick={handleBackClick}
    />
  );
}

export default PaymentRender;
