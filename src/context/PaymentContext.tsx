import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

interface PaymentState {
  activeOption: string;
  isValid: boolean;
  isGiftCardValid: boolean;
  isMobilePayValid: boolean;
  isCardValid: boolean;
  giftCardNumber: string;
  giftCardAmount: string;
  giftCardError: string;
  newTotal: string;
  mobilePayNumber: string;
  mobilePayError: string;
}

interface PaymentProviderProps {
  children: ReactNode;
}

const initialPaymentState: PaymentState = {
  activeOption: "Cards",
  isValid: false,
  isGiftCardValid: false,
  isMobilePayValid: false,
  isCardValid: false,
  giftCardNumber: "",
  giftCardAmount: "",
  giftCardError: "",
  newTotal: "",
  mobilePayNumber: "",
  mobilePayError: "",
};

export const PaymentContext = createContext(initialPaymentState);
export const PaymentDispatchContext = createContext<Dispatch<Action>>(() => {});

export function PaymentProvider({ children }: PaymentProviderProps) {
  const [tasks, dispatch] = useReducer(paymentReducer, initialPaymentState);

  return (
    <PaymentContext.Provider value={tasks}>
      <PaymentDispatchContext.Provider value={dispatch}>
        {children}
      </PaymentDispatchContext.Provider>
    </PaymentContext.Provider>
  );
}

export function usePaymentContext() {
  return useContext(PaymentContext);
}

export function usePaymentDispatchContext() {
  return useContext(PaymentDispatchContext);
}

type Action =
  | { type: "SET_ACTIVE_OPTION"; payload: string }
  | { type: "SET_IS_VALID"; payload: boolean }
  | { type: "SET_IS_GIFT_CARD_VALID"; payload: boolean }
  | { type: "SET_IS_MOBILE_PAY_VALID"; payload: boolean }
  | { type: "SET_IS_CARD_VALID"; payload: boolean }
  | { type: "SET_GIFT_CARD_NUMBER"; payload: string }
  | { type: "SET_GIFT_CARD_AMOUNT"; payload: string }
  | { type: "SET_GIFT_CARD_ERROR"; payload: string }
  | { type: "SET_NEW_TOTAL"; payload: string }
  | { type: "SET_MOBILE_PAY_NUMBER"; payload: string }
  | { type: "SET_MOBILE_PAY_ERROR"; payload: string };

function paymentReducer(state: PaymentState, action: Action) {
  switch (action.type) {
    case "SET_ACTIVE_OPTION":
      return { ...state, activeOption: action.payload };
    case "SET_IS_VALID":
      return { ...state, isValid: action.payload };
    case "SET_IS_GIFT_CARD_VALID":
      return {
        ...state,
        isGiftCardValid: action.payload,
        giftCardNumber: action.payload ? state.giftCardNumber : "",
      };
    case "SET_IS_CARD_VALID":
      return { ...state, isCardValid: action.payload };
    case "SET_GIFT_CARD_NUMBER":
      return { ...state, giftCardNumber: action.payload };
    case "SET_GIFT_CARD_AMOUNT":
      return { ...state, giftCardAmount: action.payload };
    case "SET_GIFT_CARD_ERROR":
      return { ...state, giftCardError: action.payload };
    case "SET_NEW_TOTAL":
      return { ...state, newTotal: action.payload };
    case "SET_MOBILE_PAY_NUMBER":
      return { ...state, mobilePayNumber: action.payload };
    case "SET_MOBILE_PAY_ERROR":
      return { ...state, mobilePayError: action.payload };
    case "SET_IS_MOBILE_PAY_VALID": {
      const isNumberValid = /^(?!.* {2})\d(?: ?\d){7}$/.test(
        state.mobilePayNumber,
      );
      return {
        ...state,
        isMobilePayValid: isNumberValid,
        mobilePayError: isNumberValid ? "" : "Number is invalid",
      };
    }
    default:
      throw new Error("Invalid action type.");
  }
}
