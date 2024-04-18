import React, { createContext, useContext, useState } from 'react';
import { BasketItem } from './types/Types'; // Adjust path as necessary
import { ContentFlow } from './components/flowingContent/FlowingContent'; // Adjust path as necessary

interface BasketContextType {
    basketItems: BasketItem[];
    setBasketItems: (items: BasketItem[]) => void;
    contentFlow: ContentFlow;
    setContentFlow: (flow: ContentFlow) => void;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const RenditionProvider: React.FC = ({ children }) => {
    const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
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
