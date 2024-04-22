// tests/basketReducer.test.ts
import { describe, it, expect } from "vitest";
import { Action, basketReducer } from "../context/BasketContext";
import { BasketItem, RecurringOrder } from "../types/Types";

const items: BasketItem[] = [
  {
    id: "1",
    name: "Test Item",
    price: 10,
    quantity: 2,
    currency: "DKK",
    imageUrl: "",
    recurringOrder: RecurringOrder.Once,
    giftWrap: false,
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
  },
  {
    id: "2",
    name: "Test Item",
    price: 15,
    quantity: 5,
    currency: "DKK",
    imageUrl: "",
    recurringOrder: RecurringOrder.Once,
    giftWrap: false,
    rebateQuantity: 0,
    rebatePercent: 0,
    upsellProductId: null,
  },
];
describe("basketReducer", () => {
  it("handles ADD_ITEM action", () => {
    let state: BasketItem[] = [];
    const item = items[0];
    const action: Action = { type: "ADD_ITEM", payload: { ...item } };
    state = basketReducer(state, action);
    expect(state).toEqual([item]);
    state = basketReducer(state, action);
    expect(state).toEqual([item, item]);
  });

  it("handles REMOVE_ITEM action", () => {
    let state: BasketItem[] = items;
    let action: Action = { type: "REMOVE_ITEM", payload: { itemId: "1" } };
    state = basketReducer(state, action);
    expect(state).toEqual(items.slice(1, items.length));

    action = { type: "REMOVE_ITEM", payload: { itemId: "999" } };
    state = basketReducer(state, action);
    expect(state).toEqual(items.slice(1, items.length));

    action = { type: "REMOVE_ITEM", payload: { itemId: "2" } };
    state = basketReducer(state, action);
    expect(state).toEqual([]);
  });

  it("handles UPDATE_QUANTITY action", () => {
    let state: BasketItem[] = items;
    let action: Action = {
      type: "UPDATE_QUANTITY",
      payload: { itemId: "1", newQuantity: 2 },
    };
    state = basketReducer(state, action);
    expect(state[0].quantity).toEqual(2);
    expect(state[1].quantity).toEqual(5);

    action = {
      type: "UPDATE_QUANTITY",
      payload: { itemId: "999", newQuantity: 2 },
    };
    state = basketReducer(state, action);
    expect(state[0].quantity).toEqual(2);
    expect(state[1].quantity).toEqual(5);
  });

  it("handles TOGGLE_GIFT_WRAP action", () => {
    let state: BasketItem[] = items;
    let action: Action = { type: "TOGGLE_GIFT_WRAP", payload: { itemId: "1" } };
    state = basketReducer(state, action);
    expect(state[0]).toEqual({ ...items[0], giftWrap: true });
    expect(state[1]).toEqual({ ...items[1] });

    action = { type: "TOGGLE_GIFT_WRAP", payload: { itemId: "2" } };
    state = basketReducer(state, action);

    expect(state[0]).toEqual({ ...items[0], giftWrap: true });
    expect(state[1]).toEqual({ ...items[1], giftWrap: true });

    action = { type: "TOGGLE_GIFT_WRAP", payload: { itemId: "3" } };
    state = basketReducer(state, action);
    expect(state[0]).toEqual({ ...items[0], giftWrap: true });
    expect(state[1]).toEqual({ ...items[1], giftWrap: true });
  });

  it("handles UPDATE_RECURRING_ORDER action", () => {
    let state: BasketItem[] = items;
    let action: Action = {
      type: "UPDATE_RECURRING_ORDER",
      payload: { itemId: "1", newRecurringOrder: RecurringOrder.Daily },
    };
    state = basketReducer(state, action);
    expect(state[0]).toEqual({
      ...items[0],
      recurringOrder: RecurringOrder.Daily,
    });
    expect(state[1]).toEqual(items[1]);
    state = basketReducer(state, action);
    expect(state[0]).toEqual({
      ...items[0],
      recurringOrder: RecurringOrder.Daily,
    });
    expect(state[1]).toEqual(items[1]);

    action = {
      type: "UPDATE_RECURRING_ORDER",
      payload: { itemId: "999", newRecurringOrder: RecurringOrder.Weekly },
    };
    state = basketReducer(state, action);
    expect(state[0]).toEqual({
      ...items[0],
      recurringOrder: RecurringOrder.Daily,
    });
    expect(state[1]).toEqual(items[1]);
  });

  it("handles SET_ITEMS action", () => {
    let state: BasketItem[] = [];
    let action: Action = { type: "SET_ITEMS", payload: items };
    state = basketReducer(state, action);
    expect(state).toEqual(items);

    action = { type: "SET_ITEMS", payload: [] };
    state = basketReducer(state, action);
    expect(state).toEqual([]);
  });

  it("handles CLEAR_BASKET action", () => {
    let state: BasketItem[] = items;
    const action: Action = { type: "CLEAR_BASKET" };
    state = basketReducer(state, action);
    expect(state).toEqual([]);
    localStorage.setItem("frontend_project_basketItems", JSON.stringify(items));
  });
});
