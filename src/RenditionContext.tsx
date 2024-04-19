/*
import React, { createContext, useContext, useState } from 'react';
import { BasketItem } from './types/Types'; // Adjust path as necessary
import { ContentFlow } from './components/flowingContent/FlowingContent';

interface BasketContextType {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[]) => void;
    contentFlow: ContentFlow;
    setContentFlow: (flow: ContentFlow) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

//NEW
const saveToLocalStorage = (items) => {
    localStorage.setItem('basketItems', JSON.stringify(items));
};

const loadFromLocalStorage = () => {
    const storedItems = localStorage.getItem('basketItems');
    return storedItems ? JSON.parse(storedItems) : [];
};

const handleSetBasketItems = (items) => {
    RenditionProvider(items);
    saveToLocalStorage(items);
};

//GOOD

export const RenditionProvider: React.FC = ({ children }) => {

    const [basketItems, setBasketItems] = useState(loadFromLocalStorage());
    // const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
    const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);

    return (
        <BasketContext.Provider value={{ basketItems, setBasketItems, contentFlow, setContentFlow }}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};

*/

//Work
import React, { createContext, useContext, useState, useEffect } from 'react';
import { BasketItem } from './types/Types';
import { ContentFlow } from './components/flowingContent/FlowingContent';

interface BasketContextType {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[] | ((items: BasketItem[]) => BasketItem[])) => void;
    contentFlow: ContentFlow;
    setContentFlow: (flow: ContentFlow) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

// Helper functions for localStorage management
const localStorageKey = 'basketItems';

const saveToLocalStorage = (items: BasketItem[]) => {
    localStorage.setItem(localStorageKey, JSON.stringify(items));
};

const loadFromLocalStorage = (): BasketItem[] => {
    const storedItems = localStorage.getItem(localStorageKey);
    return storedItems ? JSON.parse(storedItems) : [];
};

export const RenditionProvider: React.FC = ({ children }) => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>(loadFromLocalStorage());
    const [contentFlow, setContentFlow] = useState(ContentFlow.Basket);

    const handleSetBasketItems = (items: BasketItem[] | ((items: BasketItem[]) => BasketItem[])) => {
        if (typeof items === 'function') {
            // If items is a function, we use it to set the new state based on the old state
            setBasketItems(prevItems => {
                const newItems = items(prevItems);
                saveToLocalStorage(newItems);
                return newItems;
            });
        } else {
            // If items is not a function, set it directly
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

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (!context) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};

