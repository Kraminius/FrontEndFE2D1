import { BasketItems, RecurringOrder } from "./types/Types";

const initialBasketItems: BasketItems = [
	{ id: 10001, name: 'Gulerødder', price: 3, quantity: 3, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk.", imageUrl: "src/images/BasketItems/Gulerødder.jpg" },
	{ id: 10002, name: 'Ærter', price: 1, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "pose" , imageUrl: "src/images/BasketItems/Ærter.png"},
	{ id: 10003, name: 'Kartofler', price: 2, quantity: 2, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." , imageUrl: "src/images/BasketItems/Kartofler.jpg", discount: { itemAmountForDiscount: 3, discountAmount: 1 } },
	{ id: 10004, name: 'Løg', price: 1, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." , imageUrl: "src/images/BasketItems/Løg.jpg"},
	{ id: 10005, name: 'Hvidløg', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "bundt" , imageUrl: "src/images/BasketItems/Hvidløg.jpg"},
	{ id: 10006, name: 'Ingefær', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." , imageUrl: "src/images/BasketItems/Ingefær.png"},
	{ id: 10007, name: 'Gurkemeje', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "stk." , imageUrl: "src/images/BasketItems/Gurkemeje.jpg"},
	{ id: 10008, name: 'Karry', price: 2, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "glas." , imageUrl: "src/images/BasketItems/Karry.jpg"},
	{ id: 10009, name: 'Kokosmælk', price: 5, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "dåse" , imageUrl: "src/images/BasketItems/Kokosmælk.jpeg", discount: { itemAmountForDiscount: 3, discountAmount: 1 } },
	{ id: 10010, name: 'Ris', price: 3, quantity: 1, giftWrap: false, recurringOrder: RecurringOrder.Once, unit: "pose" , imageUrl: "src/images/BasketItems/Ris.png"},
];

export default initialBasketItems;