import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Delivery } from "../components/flowingContent/delivery/Delivery";
import { renderWithRouter } from "./helper";

afterEach(cleanup);
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual("react-router-dom");
  return {
    ...mod,
    useParams: () => ({}),
  };
});
describe(Delivery.name, () => {
  const mockHandleNextClick = vi.fn();

  test("Renders Delivery component", () => {
    const mockOnFormValidityChange = vi.fn();
    const { getByText } = render(
      renderWithRouter(
        <Delivery
          setIsDeliveryFormValid={mockOnFormValidityChange}
          handleNextClick={mockHandleNextClick}
        />,
      ),
    );
    expect(getByText(/Delivery Information/)).toBeInTheDocument();
  });

  test("Check that form is invalid without input", async () => {
    const mockOnFormValidityChange = vi.fn();
    render(
      renderWithRouter(
        <Delivery
          setIsDeliveryFormValid={mockOnFormValidityChange}
          handleNextClick={mockHandleNextClick}
        />,
      ),
    );

    expect(mockOnFormValidityChange).toHaveBeenCalledWith(false);
  });

  test("updates state on input change", () => {
    const mockOnFormValidityChange = vi.fn();
    const { getByLabelText } = render(
      renderWithRouter(
        <Delivery
          setIsDeliveryFormValid={mockOnFormValidityChange}
          handleNextClick={mockHandleNextClick}
        />,
      ),
    );

    const firstNameInput = getByLabelText(/First Name \*/i);
    fireEvent.change(firstNameInput, { target: { value: "Jakob" } });

    expect(firstNameInput).toHaveValue("Jakob");
  });

  test("Update onFormValidityChange when form is valid and invalid", async () => {
    const mockOnFormValidityChange = vi.fn();
    const { getByLabelText } = render(
      renderWithRouter(
        <Delivery
          setIsDeliveryFormValid={mockOnFormValidityChange}
          handleNextClick={mockHandleNextClick}
        />,
      ),
    );

    fireEvent.change(getByLabelText(/First Name \*/i), {
      target: { value: "Jakob" },
    });
    fireEvent.change(getByLabelText(/Last Name \*/i), {
      target: { value: "Hansen" },
    });
    fireEvent.change(getByLabelText(/Email \*/i), {
      target: { value: "Jakob@example.com" },
    });
    fireEvent.change(getByLabelText(/Phone \*/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(getByLabelText(/Address \*/i), {
      target: { value: "Test Street 69" },
    });
    fireEvent.change(getByLabelText(/City \*/i), {
      target: { value: "København Ø" },
    });
    fireEvent.change(getByLabelText(/Zip Code \*/i), {
      target: { value: "2100" },
    });

    const termsOfServiceCheckbox = getByLabelText(
      /I agree to terms of service/i,
    );
    fireEvent.click(termsOfServiceCheckbox);

    expect(mockOnFormValidityChange).toHaveBeenCalledWith(true);
    fireEvent.change(getByLabelText(/Email \*/i), {
      target: { value: "invalid" },
    });
    expect(mockOnFormValidityChange).toHaveBeenCalledWith(false);
  });

  test("disables submit button when form is valid, but different billing address is chosen", async () => {
    const mockOnFormValidityChange = vi.fn();
    const { getByLabelText } = render(
      renderWithRouter(
        <Delivery
          setIsDeliveryFormValid={mockOnFormValidityChange}
          handleNextClick={mockHandleNextClick}
        />,
      ),
    );

    fireEvent.change(getByLabelText(/First Name \*/i), {
      target: { value: "Jakob" },
    });
    fireEvent.change(getByLabelText(/Last Name \*/i), {
      target: { value: "Hansen" },
    });
    fireEvent.change(getByLabelText(/Email \*/i), {
      target: { value: "Jakob@example.com" },
    });
    fireEvent.change(getByLabelText(/Phone \*/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(getByLabelText(/Address \*/i), {
      target: { value: "Test Street 69" },
    });
    fireEvent.change(getByLabelText(/City \*/i), {
      target: { value: "København Ø" },
    });
    fireEvent.change(getByLabelText(/Zip Code \*/i), {
      target: { value: "2100" },
    });
    const billingAddressCheckbox = getByLabelText(/Different billing address/);
    fireEvent.click(billingAddressCheckbox);

    expect(mockOnFormValidityChange).toHaveBeenCalledWith(false);
  });

  test("Enables submit button when form is valid, different billing address is chosen and form filled", async () => {
    const mockOnFormValidityChange = vi.fn();
    const { getByLabelText } = render(
      renderWithRouter(
        <Delivery
          setIsDeliveryFormValid={mockOnFormValidityChange}
          handleNextClick={mockHandleNextClick}
        />,
      ),
    );

    fireEvent.change(getByLabelText(/First Name \*/i), {
      target: { value: "Jakob" },
    });
    fireEvent.change(getByLabelText(/Last Name \*/i), {
      target: { value: "Hansen" },
    });
    fireEvent.change(getByLabelText(/Email \*/i), {
      target: { value: "Jakob@example.com" },
    });
    fireEvent.change(getByLabelText(/Phone \*/i), {
      target: { value: "12345678" },
    });
    fireEvent.change(getByLabelText(/Address \*/i), {
      target: { value: "Test Street 69" },
    });
    fireEvent.change(getByLabelText(/City \*/i), {
      target: { value: "København Ø" },
    });
    fireEvent.change(getByLabelText(/Zip Code \*/i), {
      target: { value: "2100" },
    });
    const billingAddressCheckbox = getByLabelText(/Different billing address/);
    fireEvent.click(billingAddressCheckbox);
    fireEvent.change(getByLabelText(/Billing Address \*/i), {
      target: { value: "Test Street 420" },
    });
    fireEvent.change(getByLabelText(/Billing City \*/i), {
      target: { value: "Askeby" },
    });
    fireEvent.change(getByLabelText(/Billing Zip Code \*/i), {
      target: { value: "4792" },
    });

    const termsOfServiceCheckbox = getByLabelText(
      /I agree to terms of service/i,
    );
    fireEvent.click(termsOfServiceCheckbox);
    expect(mockOnFormValidityChange).toHaveBeenCalledWith(true);
  });
});
