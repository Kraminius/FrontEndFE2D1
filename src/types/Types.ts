export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    giftWrap: boolean;
    recurringOrder: string;
}

export interface BasketItemProps {
    item: Item;
    onQuantityChange: (itemId: number, newQuantity: number) => void;
    onGiftWrapChange: (itemId: number, newGiftWrap: boolean) => void;
    onRecurringOrderChange: (itemId: number, newRecurringOrder: string) => void;
    onRemove: (itemId: number) => void;
}

export interface BasketSummaryProps {
    items: Item[];
}

/* Recurring Order enum, add more for different options */
export enum RecurringOrder {
    None = 'none',
    Daily = 'daily',
    Weekly = 'weekly',
    Biweekly = 'biweekly',
}

export interface BasketItems {
    id: number;
    name: string;
    price: number;
    quantity: number;
    giftWrap: boolean;
    recurringOrder: RecurringOrder;
}