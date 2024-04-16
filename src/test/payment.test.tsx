import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentPage from "../components/flowingContent/payment/PaymentPage";
import { BasketItem, RecurringOrder } from "../types/Types";

const ignoredValues = {
  imageUrl: "",
  id: "",
  name: "",
  currency: "",
  giftWrap: false,
  upsellProductId: "",
  recurringOrder: RecurringOrder.Once,
};
const sampleBasketItems: BasketItem[] = [
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

const mockIsContinueDisabled = vi.fn();

describe("PaymentPage component", () => {
  beforeEach(() => {
    render(
      <PaymentPage
        items={sampleBasketItems}
        isContinueDisabled={mockIsContinueDisabled}
      />,
    );
  });

  it("should toggle payment options correctly", () => {
    const cardOption = screen.getByText(/^Card$/);
    const mobilePayOption = screen.getByText(/MobilePay/);
    fireEvent.click(cardOption);
    fireEvent.click(mobilePayOption);

    expect(screen.getByText(/BuyStuff GiftCard/i)).toBeInTheDocument();
  });

  it("should enable continue button when a valid payment option is selected", () => {
    fireEvent.click(screen.getByText(/mobilepay/i)); // Assuming this triggers validation
    expect(mockIsContinueDisabled).toHaveBeenCalledWith(true);
  });
});
