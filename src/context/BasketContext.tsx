import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { BasketItem, RecurringOrder } from "../types/Types.ts";
import { loadFromLocalStorage, saveToLocalStorage } from "./LocalStorage.ts";

const initialBasketItems: BasketItem[] = loadFromLocalStorage();

export const BasketContext = createContext(initialBasketItems);
export const BasketDispatchContext = createContext<Dispatch<Action>>(() => {});

interface BasketProviderProps {
  children: ReactNode;
}

export function BasketProvider({ children }: BasketProviderProps) {
  const [tasks, dispatch] = useReducer(basketReducer, initialBasketItems);

  return (
    <BasketContext.Provider value={tasks}>
      <BasketDispatchContext.Provider value={dispatch}>
        {children}
      </BasketDispatchContext.Provider>
    </BasketContext.Provider>
  );
}

export function useBasketContext(): BasketItem[] {
  return useContext(BasketContext);
}

export function useBasketDispatchContext() {
  return useContext(BasketDispatchContext);
}

export type Action =
  | { type: "ADD_ITEM"; payload: BasketItem }
  | { type: "REMOVE_ITEM"; payload: { itemId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { itemId: string; newQuantity: number };
    }
  | { type: "TOGGLE_GIFT_WRAP"; payload: { itemId: string } }
  | {
      type: "UPDATE_RECURRING_ORDER";
      payload: { itemId: string; newRecurringOrder: RecurringOrder };
    }
  | { type: "SET_ITEMS"; payload: BasketItem[] }
  | { type: "CLEAR_BASKET" };

export function basketReducer(
  state: BasketItem[],
  action: Action,
): BasketItem[] {
  let newState: BasketItem[] = [];
  switch (action.type) {
    case "ADD_ITEM":
      newState = [...state, action.payload];
      break;
    case "REMOVE_ITEM":
      newState = state.filter((item) => item.id !== action.payload.itemId);
      break;
    case "UPDATE_QUANTITY":
      newState = state.map((item) =>
        item.id === action.payload.itemId && action.payload.newQuantity > 0
          ? {
              ...item,
              quantity: action.payload.newQuantity,
            }
          : item,
      );
      break;
    case "TOGGLE_GIFT_WRAP":
      newState = state.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, giftWrap: !item.giftWrap }
          : item,
      );
      break;
    case "UPDATE_RECURRING_ORDER":
      newState = state.map((item) =>
        item.id === action.payload.itemId
          ? {
              ...item,
              recurringOrder: action.payload.newRecurringOrder,
            }
          : item,
      );
      break;
    case "SET_ITEMS":
      newState = action.payload;
      break;
    case "CLEAR_BASKET":
      newState = initialBasketItems;
      console.log(newState);
      break;
    default:
      throw new Error(`Unknown action in reducer: ${action}`);
  }
  saveToLocalStorage(newState);
  return newState;
}
