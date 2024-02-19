export interface BasketItemProps {
	item: BasketItem;
	onQuantityChange: (itemId: number, newQuantity: number) => void;
	onGiftWrapChange: (itemId: number, newGiftWrap: boolean) => void;
	onRecurringOrderChange: (itemId: number, newRecurringOrder: string) => void;
	onRemove: () => void;
}

export interface BasketSummaryProps {
	items: BasketItem[];
}

/* Recurring Order enum, add more for different options */
export enum RecurringOrder {
	None = 'none',
	Daily = 'daily',
	Weekly = 'weekly',
	Biweekly = 'biweekly',
}

interface BasketItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	giftWrap: boolean;
	recurringOrder: RecurringOrder;
	unit: string;
}
export type BasketItems = BasketItem[];