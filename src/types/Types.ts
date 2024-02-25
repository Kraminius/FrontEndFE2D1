export interface BasketItemProps {
	item: BasketItem;
	onQuantityChange: (itemId: number, newQuantity: number) => void;
	onGiftWrapChange: (itemId: number) => void;
	onRecurringOrderChange: (itemId: number, newRecurringOrder: RecurringOrder) => void;
	onRemove: () => void;
}

export interface BasketSummaryProps {
	items: BasketItem[];
}

/* Recurring Order enum, add more for different options */
export enum RecurringOrder {
	Once,
	Daily,
	Weekly,
	Biweekly,
}



export interface BasketItem {
	id: number;
	name: string;
	price: number;
	quantity: number;
	giftWrap: boolean;
	recurringOrder: RecurringOrder;
	unit: string;
}
export type BasketItems = BasketItem[];