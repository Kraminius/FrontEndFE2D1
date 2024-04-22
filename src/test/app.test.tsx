import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../App";
import { BasketItem, RecurringOrder } from "../types/Types";
import BasketSummary from "../components/summary/BasketSummary.tsx";
import { calculateItemTotal, isValidEmail } from "../utils/utilFunctions.tsx";
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import BasketRender from "../components/flowingContent/ContentRendition/BasketRender.tsx";
import { BasketContext, BasketProvider } from "../context/BasketContext.tsx";
import { DeliveryProvider } from "../context/DeliveryContext.tsx";
import { PaymentProvider } from "../context/PaymentContext.tsx";

// Tests for discount calculation
describe(App.name, () => {
  test("calculates the total price without discount", () => {
    const item: BasketItem = {
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
    };

    const total = calculateItemTotal(item);
    expect(total).toBe(20);
  });

  test("calculates the total price with discount", () => {
    const item: BasketItem = {
      id: "1",
      name: "Test Item",
      price: 10,
      quantity: 2,
      currency: "DKK",
      imageUrl: "",
      recurringOrder: RecurringOrder.Once,
      giftWrap: false,
      rebateQuantity: 2,
      rebatePercent: 25,
      upsellProductId: null,
    };

    const total = calculateItemTotal(item);

    expect(total).toBe(15);
  });

  test("does not apply discount if quantity is less than required", () => {
    const item: BasketItem = {
      id: "1",
      name: "Test Item",
      price: 10,
      quantity: 2,
      currency: "DKK",
      imageUrl: "",
      recurringOrder: RecurringOrder.Once,
      giftWrap: false,
      rebateQuantity: 3,
      rebatePercent: 25,
      upsellProductId: null,
    };

    const total = calculateItemTotal(item);

    expect(total).toBe(20);
  });

  test("applies discount to total price summary", () => {
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
        rebateQuantity: 3,
        rebatePercent: 25,
        upsellProductId: null,
      },
      {
        id: "2",
        name: "Test Item 2",
        price: 10,
        quantity: 3,
        currency: "DKK",
        imageUrl: "",
        recurringOrder: RecurringOrder.Once,
        giftWrap: false,
        rebateQuantity: 3,
        rebatePercent: 25,
        upsellProductId: null,
      },
      {
        id: "3",
        name: "Test Item 3",
        price: 5,
        quantity: 2,
        currency: "DKK",
        imageUrl: "",
        recurringOrder: RecurringOrder.Once,
        giftWrap: false,
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: null,
      },
    ];

    const { getByText } = render(
      <BasketContext.Provider value={items}>
        <BasketSummary />
      </BasketContext.Provider>,
    );

    expect(getByText(/Total:/).textContent).toBe("Total: 52.50,-");
  });

  test("applies discount if purchase amount is above 300", async () => {
    const items = [
      {
        id: "test1",
        name: "Test Item 1",
        price: 299,
        quantity: 1,
        imageUrl: undefined,
        currency: "DKK",
        recurringOrder: RecurringOrder.Once,
        giftWrap: false,
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: null,
      },
    ];
    const { getByText } = render(
      <BasketContext.Provider value={items}>
        <BasketSummary />
      </BasketContext.Provider>,
    );

    const testRoutes: RouteObject[] = [
      {
        path: "/",
        element: <App basketItems={items} />,
        children: [
          {
            path: "",
            element: <Navigate to="/basket" replace={true} />, //replace makes sure we can't go back to this page
          },
          {
            path: "/basket",
            element: <BasketRender />,
          },
        ],
      },
    ];

    expect(getByText(/Total:/).textContent).toBe("Total: 299.00,-");
    //Toying
    const router = createBrowserRouter(testRoutes);
    render(
      <BasketProvider>
        <DeliveryProvider>
          <PaymentProvider>
            <RouterProvider router={router} />
          </PaymentProvider>
        </DeliveryProvider>
      </BasketProvider>,
    );

    const increaseButton = await screen.findByLabelText(
      `Increase quantity for item ${items[0].id}`,
    );
    fireEvent.click(increaseButton);

    const totalTexts = await screen.findAllByText(/Total:/);

    const lastTotalText = totalTexts[totalTexts.length - 1];

    expect(lastTotalText.textContent).toContain("538.20,-");
  });

  test("calculates total price", () => {
    const ignoredValues = {
      imageUrl: "",
      id: "",
      name: "",
      currency: "",
      giftWrap: false,
      upsellProductId: "",
      recurringOrder: RecurringOrder.Once,
    };
    const items: BasketItem[] = [
      {
        price: 10,
        quantity: 3,
        rebateQuantity: 2,
        rebatePercent: 50,
        ...ignoredValues,
      },
      {
        price: 1,
        quantity: 2,
        rebateQuantity: 2,
        rebatePercent: 50,
        ...ignoredValues,
      },
      {
        price: 100,
        quantity: 2,
        rebateQuantity: 3,
        rebatePercent: 100,
        ...ignoredValues,
      },
    ];

    // TODO should we rethink the rebate strategy?
    const itemPrices = [15, 1, 200];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      expect(calculateItemTotal(item)).toBe(itemPrices[i]);
    }
  });

  test("validates email correctly", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("invalid-email")).toBe(false);
    expect(isValidEmail("user.name+tag+sorting@example.com")).toBe(true);
    expect(isValidEmail("user.name@student.dtu.dk")).toBe(true);
    expect(isValidEmail("user.name@example.com.co")).toBe(true);
    expect(isValidEmail("user.name@example")).toBe(false);
    expect(isValidEmail("user@localhost")).toBe(false);
    expect(isValidEmail("@no-local-part.com")).toBe(false);
    expect(isValidEmail("no-at-sign")).toBe(false);
    expect(isValidEmail("no-tld@domain")).toBe(false);
    expect(isValidEmail("overscore_in@domain.com")).toBe(true);
    expect(isValidEmail("numbers1234@numbers.com")).toBe(true);
    expect(isValidEmail("")).toBe(false);
    expect(isValidEmail("space in@domain.com")).toBe(false);
    expect(isValidEmail("email@domain.com.")).toBe(false);
    expect(isValidEmail("email@-domain.com")).toBe(false);
  });
});
