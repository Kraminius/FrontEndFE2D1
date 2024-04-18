import {createContext, Dispatch, ReactNode, useContext, useReducer} from 'react';
import {BasketItem, RecurringOrder} from "../types/Types.ts";

const initialBasketItems: BasketItem[] = [];

export const BasketContext = createContext(initialBasketItems);
export const BasketDispatchContext = createContext<Dispatch<Action>>(() => {
});

interface BasketProviderProps {
    children: ReactNode;
}

export function BasketProvider({children}: BasketProviderProps) {
    const [tasks, dispatch] = useReducer(
        basketReducer,
        initialBasketItems
    );

    return (
        <BasketContext.Provider value={tasks}>
            <BasketDispatchContext.Provider value={dispatch}>
                {children}
            </BasketDispatchContext.Provider>
        </BasketContext.Provider>
    );
}

export function useBasketContext() {
    return useContext(BasketContext);

}

export function useBasketDispatchContext() {
    return useContext(BasketDispatchContext);
}

type Action =
    | { type: 'ADD_ITEM', payload: BasketItem }
    | { type: 'REMOVE_ITEM', payload: { itemId: string } }
    | { type: 'UPDATE_QUANTITY', payload: { itemId: string, newQuantity: number } }
    | { type: 'TOGGLE_GIFT_WRAP', payload: { itemId: string } }
    | { type: 'UPDATE_RECURRING_ORDER', payload: { itemId: string, newRecurringOrder: RecurringOrder } }
    | { type: 'SET_ITEMS', payload: BasketItem[] }
    | { type: 'CLEAR_BASKET' };

function basketReducer(state: BasketItem[], action: Action): BasketItem[] {
    switch (action.type) {
        case 'ADD_ITEM':
            return [...state, action.payload];
        case 'REMOVE_ITEM':
            return state.filter(item => item.id !== action.payload.itemId);
        case 'UPDATE_QUANTITY':
            return state.map(item => item.id === action.payload.itemId ? {
                ...item,
                quantity: action.payload.newQuantity
            } : item);
        case 'TOGGLE_GIFT_WRAP':
            return state.map(item => item.id === action.payload.itemId ? {...item, giftWrap: !item.giftWrap} : item);
        case 'UPDATE_RECURRING_ORDER':
            return state.map(item => item.id === action.payload.itemId ? {
                ...item,
                recurringOrder: action.payload.newRecurringOrder
            } : item);
        case 'SET_ITEMS':
            return action.payload;
        case 'CLEAR_BASKET':
            return initialBasketItems;
        default:
            throw new Error(`Unknown action: ${(action as any).type}`);
    }
}