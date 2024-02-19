export interface BasketItemProps {
    item: BasketItems;
    onQuantityChange: (itemId: number, newQuantity: number) => void;
    onGiftWrapChange: (itemId: number, newGiftWrap: boolean) => void;
    onRecurringOrderChange: (itemId: number, newRecurringOrder: string) => void;
    onRemove: (itemId: number) => void;
}

export interface BasketSummaryProps {
    items: BasketItems[];
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
    unit: string;
}