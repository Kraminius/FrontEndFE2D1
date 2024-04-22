import {createContext, Dispatch, ReactNode, useContext, useReducer} from 'react';

interface PaymentState {
  activeOption: string;
  isValid: boolean;
  isGiftCardValid: boolean;
  isMobilePayValid: boolean;
  isCardValid: boolean;
}

interface PaymentProviderProps {
  children: ReactNode;
}

const initialPaymentState = {
    activeOption: "Cards",
    isValid: false,
    isGiftCardValid: false,
    isMobilePayValid: false,
    isCardValid: false,
};

export const PaymentContext = createContext(initialPaymentState);
export const PaymentDispatchContext = createContext<Dispatch<Action>>(() => {});


export function PaymentProvider({children}: PaymentProviderProps) {
  const [tasks, dispatch] = useReducer(
      paymentReducer,
      initialPaymentState
  );

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
    | { type: 'SET_ACTIVE_OPTION', payload: string }
    | { type: 'SET_IS_VALID', payload: boolean }
    | { type: 'SET_IS_GIFT_CARD_VALID', payload: boolean }
    | { type: 'SET_IS_MOBILE_PAY_VALID', payload: boolean }
    | { type: 'SET_IS_CARD_VALID', payload: boolean };

function paymentReducer(state: PaymentState, action: Action) {
    switch (action.type) {
        case 'SET_ACTIVE_OPTION':
            return {...state, activeOption: action.payload};
        case 'SET_IS_VALID':
            return {...state, isValid: action.payload};
        case 'SET_IS_GIFT_CARD_VALID':
            return {...state, isGiftCardValid: action.payload};
        case 'SET_IS_MOBILE_PAY_VALID':
            return {...state, isMobilePayValid: action.payload};
        case 'SET_IS_CARD_VALID':
            return {...state, isCardValid: action.payload};
        default:
            throw new Error("Invalid action type.");
    }
}