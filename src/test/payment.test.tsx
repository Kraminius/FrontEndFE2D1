import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentPage from "../components/flowingContent/payment/PaymentPage";

const mockIsContinueDisabled = vi.fn();

describe("PaymentPage component", () => {
  beforeEach(() => {
    render(<PaymentPage isContinueDisabled={mockIsContinueDisabled} />);
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
