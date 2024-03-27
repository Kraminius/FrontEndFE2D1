import {BasketItem, BasketItems, RecurringOrder} from "../types/Types.ts";

const BASKET_URL = 'https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json'
export async function fetchBasketItems(): Promise<BasketItem[]> {
    const response = await fetch(BASKET_URL);
    if (!response.ok) {
        throw new Error(`Error fetching basket items: ${response.status}`);
    }

    const items: BasketItems = await response.json();
    return items.map((item) => ({
        ...item,
        quantity: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
        giftWrap: false,
        recurringOrder: RecurringOrder.Once,
    }));
}