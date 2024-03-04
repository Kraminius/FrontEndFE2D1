import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import React from "react";
import App from "../App";
import initialBasketItems from "../data";
import { calculateItemTotal } from '../components/CustomerItemCard';
import { BasketItem, RecurringOrder } from '../types/Types';
import BasketSummary from "../components/BasketSummary";

describe(App.name, () => {
  test('should display "Shopping Basket" title', () => {
    render(<App />);
    const titleElement = screen.getByText("Shopping Basket");
    expect(titleElement).toBeInTheDocument();
  });
});

describe(App.name, () => {
  test("should display 'Gulerødder'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Gulerødder");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("should display 'Ærter'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Ærter");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Kartofler'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Kartofler");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Hvidløg'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Hvidløg");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Ingefær'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Ingefær");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Gurkemeje'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Gurkemeje");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Karry'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Karry");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Kokosmælk'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Kokosmælk");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Ris'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Ris");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});

// Tests for discount calculation
describe(App.name, () => {
  test('calculates the total price without discount', () => {
    const item: BasketItem = {
      id: 1,
      name: 'Test Item',
      price: 10,
      quantity: 2,
      imageUrl: '',
      unit: 'stk',
      recurringOrder: RecurringOrder.Once,
      giftWrap: false,
    };

    const total = calculateItemTotal(item);

    expect(total).toBe(20);
  });

  test('calculates the total price with discount', () => {
    const item: BasketItem = {
      id: 1,
      name: 'Test Item',
      price: 10,
      quantity: 3,
      imageUrl: '',
      unit: 'stk',
      recurringOrder: RecurringOrder.Once,
      giftWrap: false,
      discount: {
        itemAmountForDiscount: 3,
        discountAmount: 5,
      },
    };

    const total = calculateItemTotal(item);

    expect(total).toBe(25);
  });

  test('does not apply discount if quantity is less than required', () => {
    const item: BasketItem = {
      id: 1,
      name: 'Test Item',
      price: 10,
      quantity: 2,
      imageUrl: '',
      unit: 'stk',
      recurringOrder: RecurringOrder.Once,
      giftWrap: false,
      discount: {
        itemAmountForDiscount: 3,
        discountAmount: 5,
      },
    };

    const total = calculateItemTotal(item);

    expect(total).toBe(20);
  });

  test('applies discount to total price summary', () => {
    const items: BasketItem[] = [
      {
        id: 1,
        name: 'Test Item',
        price: 10,
        quantity: 2,
        imageUrl: '',
        unit: 'stk',
        recurringOrder: RecurringOrder.Once,
        giftWrap: false,
        discount: {
          itemAmountForDiscount: 3,
          discountAmount: 5,
        },
      },
      {
        id: 2,
        name: 'Test Item 2',
        price: 10,
        quantity: 2,
        imageUrl: '',
        unit: 'stk',
        recurringOrder: RecurringOrder.Once,
        giftWrap: false,
      },
      {
        id: 3,
        name: 'Test Item 3',
        price: 10,
        quantity: 1,
        imageUrl: '',
        unit: 'stk',
        recurringOrder: RecurringOrder.Once,
        giftWrap: false,
        discount: {
          itemAmountForDiscount: 1,
          discountAmount: 1,
        },
      },
    ];

    const { getByText } = render(<BasketSummary items={items} />);

    expect(getByText(/Total:/i).textContent).toBe('Total: 49.00,-');

  });


});