import { useEffect } from "react";
import CardInputs from "./CardInformation.tsx";
import MobilePayInputs from "./MobilePayInformation.tsx";
import GiftCardInputs from "./GiftCardInformation.tsx";
import visa from "../../../images/visa.png";
import mastercard from "../../../images/mastercard.png";
import mobilepay from "../../../images/mobilepay.png";
import bslogo from "../../../images/BS_Logo.png";
import {
  usePaymentContext,
  usePaymentDispatchContext,
} from "../../../context/PaymentContext.tsx";

interface PaymentPageProps {
  isContinueDisabled: (isValid: boolean) => void;
}

function PaymentPage({ isContinueDisabled }: PaymentPageProps) {
  const paymentState = usePaymentContext();
  const paymentDispatch = usePaymentDispatchContext();

  const { activeOption, isGiftCardValid, isMobilePayValid, isCardValid } =
    paymentState;

  const handleOptionClick = (option: string) => {
    paymentDispatch({ type: "SET_ACTIVE_OPTION", payload: option });
  };

  const setIsCardValid = (isValid: boolean) => {
    paymentDispatch({ type: "SET_IS_CARD_VALID", payload: isValid });
  };

  const setIsMobilePayValid = (isValid: boolean) => {
    paymentDispatch({ type: "SET_IS_MOBILE_PAY_VALID", payload: isValid });
  };

  useEffect(() => {
    let valid = false;
    switch (activeOption) {
      case "MobilePay":
        valid = isMobilePayValid || isGiftCardValid;
        break;
      case "Cards":
        valid = isCardValid || isGiftCardValid;
        break;
      default:
        valid = isGiftCardValid;
    }
    paymentDispatch({ type: "SET_IS_VALID", payload: valid });
    isContinueDisabled(!valid);
  }, [
    activeOption,
    isGiftCardValid,
    isMobilePayValid,
    isCardValid,
    paymentDispatch,
    isContinueDisabled,
  ]);

  return (
    <div id="payment-container">
      <h2>Payment</h2>
      <h3>Choose a Payment Option</h3>
      <Cards
        open={activeOption === "Cards"}
        onClick={() => handleOptionClick("Cards")}
        onValidated={setIsCardValid}
      />
      <MobilePay
        open={activeOption === "MobilePay"}
        onClick={() => handleOptionClick("MobilePay")}
        onValidated={setIsMobilePayValid}
      />
      <h3>Add A Gift Card</h3>
      <GiftCard />
    </div>
  );
}

export default PaymentPage;

function GiftCard() {
  return (
    <div className={"payment-option-giftcards"}>
      <div className="payment-option-background">
        <div className="payment-option-aligner">
          <div className="payment-option-image">
            <img src={bslogo} alt="Payment Method" />
          </div>
          <div className="payment-option-title">BuyStuff Giftcard</div>
        </div>
        <div className="payment-card-container">
          <GiftCardInputs />
        </div>
      </div>
    </div>
  );
}
interface MobilePayProps {
  open: boolean;
  onClick: () => void;
  onValidated: (isValid: boolean) => void;
}
function MobilePay({ open, onClick }: MobilePayProps) {
  return (
    <div
      className={open ? "payment-option-mobilepay" : "payment-option-closed"}
      onClick={onClick}
    >
      <div className="payment-option-background">
        <div className="payment-option-aligner">
          <div className="payment-option-image">
            <img src={mobilepay} alt="Payment Method" />
          </div>
          <div className="payment-option-title">MobilePay</div>
          <div className="payment-option-toggle">
            {open && <div className="payment-option-toggled"></div>}
          </div>
        </div>
        {open && (
          <div className="payment-card-container">
            <MobilePayInputs />
          </div>
        )}
      </div>
    </div>
  );
}
interface CardsProps {
  open: boolean;
  onClick: () => void;
  onValidated: (isValid: boolean) => void;
}
function Cards({ open, onClick, onValidated }: CardsProps) {
  return (
    <div
      className={open ? "payment-option-cards" : "payment-option-closed"}
      onClick={onClick}
    >
      <div className="payment-option-background">
        <div className="payment-option-aligner">
          <div className="payment-option-image">
            <img src={visa} alt="Payment Method" />
            <img src={mastercard} alt="Payment Method" />
          </div>
          <div className="payment-option-title">Card</div>
          <div className="payment-option-toggle">
            {open && <div className="payment-option-toggled"></div>}
          </div>
        </div>
        {open && (
          <div className="payment-card-container">
            <CardInputs onValidated={onValidated} />
          </div>
        )}
      </div>
    </div>
  );
}
