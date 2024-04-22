import { createContext, useContext, useReducer } from "react";
import { DeliveryFormData } from "../types/Types";

interface DeliveryProviderProps {
  children: React.ReactNode;
}

const initialFormData = {
  deliveryCountry: "DK",
  deliveryZipCode: "",
  deliveryCity: "",
  deliveryAddressLine: "",
  deliveryAddressLine2: "",
  firstName: "",
  lastName: "",
  phoneCode: "+45",
  phone: "",
  email: "",
  companyName: "",
  companyVat: "",
  billingAddressDifferent: false,
  billingCountry: "DK",
  billingZipCode: "",
  billingCity: "",
  billingAddressLine: "",
  billingAddressLine2: "",
  agreeToTerms: false,
  agreeToMarketing: true,
  deliveryMessage: "",
};

export const DeliveryContext = createContext<DeliveryFormData>(initialFormData);
export const DeliveryDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

export function DeliveryProvider({ children }: DeliveryProviderProps) {
  const [tasks, dispatch] = useReducer(deliveryReducer, initialFormData);

  return (
    <DeliveryContext.Provider value={tasks}>
      <DeliveryDispatchContext.Provider value={dispatch}>
        {children}
      </DeliveryDispatchContext.Provider>
    </DeliveryContext.Provider>
  );
}

export function useDeliveryContext() {
  return useContext(DeliveryContext);
}

export function useDeliveryDispatchContext() {
  return useContext(DeliveryDispatchContext);
}

type Action =
  | { type: "SET_FORM_DATA"; payload: DeliveryFormData }
  | { type: "RESET_FORM_DATA" };

function deliveryReducer(
  state: DeliveryFormData,
  action: Action,
): DeliveryFormData {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { ...state, ...action.payload };
    case "RESET_FORM_DATA":
      return initialFormData;
    default:
      throw new Error(`Unknown action in reducer: ${action}`);
  }
}
