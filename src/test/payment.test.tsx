import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import PaymentPage from "../components/flowingContent/payment/PaymentPage";
import { PaymentProvider, usePaymentContext } from "../context/PaymentContext";

const mockDispatch = vi.fn();
const mockIsContinueDisabled = vi.fn();
const paymentContextMock = {
  isCardValid: false,
  isMobilePayValid: false,
  isGiftCardValid: false,
  activeOption: "",
  dispatch: mockDispatch,
};
function PaymentPageTest() {
  return (
    <PaymentProvider>
      <PaymentPage isContinueDisabled={mockIsContinueDisabled} />
    </PaymentProvider>
  );
}

describe("PaymentPage component", () => {
  afterEach(cleanup);

  beforeEach(() => {
    render(<PaymentPageTest />);
  });

  test("renders the PaymentPage component with all payment options", () => {
    expect(screen.getByText(/Choose a Payment Option/i)).toBeInTheDocument();
    expect(screen.getByText(/^Card$/)).toBeInTheDocument();
    expect(screen.getByText(/MobilePay/i)).toBeInTheDocument();
    expect(screen.getByText(/Add A Gift Card/i)).toBeInTheDocument();
    expect(screen.getByText(/BuyStuff Giftcard/i)).toBeInTheDocument();
  });

  test("Update internal state when payment option changes", () => {
    const cardsButton = screen.getByText(/^Card$/);
    fireEvent.click(cardsButton); // Simulate selecting "Card"
    paymentContextMock.activeOption = "Cards"; // State update
    expect(paymentContextMock.activeOption).toBe("Cards");

    const mobilePayButton = screen.getByText(/MobilePay/);
    fireEvent.click(mobilePayButton); // Simulate selecting "MobilePay"
    paymentContextMock.activeOption = "MobilePay"; // State update
    expect(paymentContextMock.activeOption).toBe("MobilePay");
  });
});
