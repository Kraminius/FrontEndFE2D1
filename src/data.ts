import { BasketItems, RecurringOrder } from "./types/Types";

const initialBasketItems: BasketItems = [
	{ id: 1, name: 'Gulerødder', price: 3, quantity: 3, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." },
	{ id: 2, name: 'Ærter', price: 1, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "pose" },
	{ id: 3, name: 'Kartofler', price: 2, quantity: 2, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." },
	{ id: 4, name: 'Løg', price: 1, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." },
	{ id: 5, name: 'Hvidløg', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "bundt" },
	{ id: 6, name: 'Ingefær', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." },
	{ id: 7, name: 'Gurkemeje', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." },
	{ id: 8, name: 'Karry', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "glas." },
	{ id: 9, name: 'Kokosmælk', price: 5, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "dåse" },
	{ id: 10, name: 'Ris', price: 3, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "pose" },
];

export default initialBasketItems;