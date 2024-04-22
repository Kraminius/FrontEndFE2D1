import React, { createContext, useContext, useState } from 'react';
import { BasketItem } from '../../types/Types.ts';
import { ContentFlow } from './FlowingContent.tsx';

interface BasketContextType {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[] | ((items: BasketItem[]) => BasketItem[])) => void;
    contentFlow: ContentFlow;
    setContentFlow: (flow: ContentFlow) => void;
    itemsStored: boolean;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

const localStorageKey = 'basketItems';

const saveToLocalStorage = (items: BasketItem[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
};

const loadFromLocalStorage = (): BasketItem[] => {
    const storedItems = localStorage.getItem(localStorageKey);
    return storedItems ? JSON.parse(storedItems) : [];
};

export const LocallyStoredOrNot = () => {
    const storedItems = localStorage.getItem(localStorageKey);
    return storedItems !== null;
}

export const RenditionProvider: React.FC = ({ children }) => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>(loadFromLocalStorage());
    const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);

    const handleSetBasketItems = (items: BasketItem[] | ((items: BasketItem[]) => BasketItem[])) => {
        if (typeof items === 'function') {
            setBasketItems(prevItems => {
                const newItems = items(prevItems);
                saveToLocalStorage(newItems);
                return newItems;
            });
        } else {
            setBasketItems(items);
            saveToLocalStorage(items);
        }
    };

    return (
        <BasketContext.Provider value={{ basketItems: basketItems, setBasketItems: handleSetBasketItems, contentFlow, setContentFlow }}>
            {children}
        </BasketContext.Provider>
    );
};

// use this function to retrieve items in basket and the contentFlow
export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};