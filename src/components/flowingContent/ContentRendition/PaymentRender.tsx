import { useState } from "react";
import { BackButton, ContinueButton } from "../Buttons.tsx";
import PaymentPage from "../payment/PaymentPage.tsx";
import { useNavigate } from "react-router-dom";
import { usePaymentDispatchContext } from "../../../context/PaymentContext.tsx";

export function PaymentRender() {
  const navigate = useNavigate();
  const [isContinueDisabled, setIsContinueDisabled] = useState(false);
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
    navigate("/delivery");
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <PaymentPage isContinueDisabled={setIsContinueDisabled} />
      <ContinueButton
        onClick={handleNextClick}
        isDisabled={isContinueDisabled}
      />
      <BackButton onClick={handleBackClick} />
    </div>
  );
}

export default PaymentRender;
