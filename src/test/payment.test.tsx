import { describe, expect, vi, test } from "vitest";
import { render } from "@testing-library/react";
import PaymentPage from "../components/flowingContent/payment/PaymentPage";
import { PaymentProvider } from "../context/PaymentContext";

function PaymentTest() {
  const mockHandleNextClick = vi.fn();
  const mockHandleBackClick = vi.fn();

  return (
    <PaymentProvider>
      <PaymentPage
        handleNextClick={mockHandleNextClick}
        handleBackClick={mockHandleBackClick}
      />
    </PaymentProvider>
  );
}

describe("PaymentPage component", () => {
  test("should render correctly", () => {
    const { getByText } = render(<PaymentTest />);
    expect(getByText(/Choose a Payment Option/)).toBeInTheDocument();
  });
});
