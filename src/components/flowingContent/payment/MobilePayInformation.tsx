import { useEffect } from "react";
import InputField from "./InputField.tsx";
import {
  usePaymentDispatchContext,
  usePaymentContext,
} from "../../../context/PaymentContext.tsx";

function MobilePayInputs() {
  const { mobilePayNumber, mobilePayError, isMobilePayValid } =
    usePaymentContext();
  const dispatch = usePaymentDispatchContext();

  useEffect(() => {
    dispatch({ type: "SET_IS_MOBILE_PAY_VALID", payload: isMobilePayValid });
  }, [mobilePayNumber, dispatch]);

  const handleNumberChange = (number: string) => {
    dispatch({ type: "SET_MOBILE_PAY_NUMBER", payload: number });
  };

  return (
    <div>
      <div className="row-container">
        <p className="payment-paragraph-styling">+45</p>
        <InputField labelText="Phone Number" onChange={handleNumberChange} />
      </div>
      <p className="error-paragraph-styling">{mobilePayError}</p>
    </div>
  );
}

export default MobilePayInputs;
