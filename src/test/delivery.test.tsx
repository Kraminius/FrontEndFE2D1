import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import {
  Delivery,
  validateForm,
} from "../components/flowingContent/delivery/Delivery";
import { DeliveryProvider } from "../context/DeliveryContext";

let formData = {
  deliveryCountry: "DK",
  deliveryZipCode: "",
  deliveryCity: "",
  deliveryAddressLine: "",
  deliveryAddressLine2: "",
  firstName: "",
  lastName: "",
  phoneCode: "+45",
  phone: "",
  email: "",
  companyName: "",
  companyVat: "",
  billingAddressDifferent: false,
  billingCountry: "DK",
  billingZipCode: "",
  billingCity: "",
  billingAddressLine: "",
  billingAddressLine2: "",
  agreeToTerms: false,
  agreeToMarketing: true,
  deliveryMessage: "",
};
afterEach(cleanup);
beforeEach(() => {
  formData = {
    deliveryCountry: "DK",
    deliveryZipCode: "",
    deliveryCity: "",
    deliveryAddressLine: "",
    deliveryAddressLine2: "",
    firstName: "",
    lastName: "",
    phoneCode: "+45",
    phone: "",
    email: "",
    companyName: "",
    companyVat: "",
    billingAddressDifferent: false,
    billingCountry: "DK",
    billingZipCode: "",
    billingCity: "",
    billingAddressLine: "",
    billingAddressLine2: "",
    agreeToTerms: false,
    agreeToMarketing: true,
    deliveryMessage: "",
  };
});

function DeliveryTest() {
  const mockHandleNextClick = vi.fn();
  const mockHandleBackClick = vi.fn();

  return (
    <DeliveryProvider>
      <Delivery
        handleNextClick={mockHandleNextClick}
        handleBackClick={mockHandleBackClick}
      />
    </DeliveryProvider>
  );
}

describe(Delivery.name, () => {
  test("Renders Delivery component", () => {
    const { getByText } = render(<DeliveryTest />);
    expect(getByText(/Delivery Information/)).toBeInTheDocument();
  });

  test("Check that form is invalid without input", async () => {
    const isValid = validateForm(formData);
    expect(isValid).toBe(false);
  });

  test("updates state on input change", () => {
    const { getByLabelText } = render(<DeliveryTest />);
    const firstNameInput = getByLabelText(/First Name \*/i);
    fireEvent.change(firstNameInput, { target: { value: "Jakob" } });
    expect(firstNameInput).toHaveValue("Jakob");
  });

  test("Update onFormValidityChange when form is valid and invalid", async () => {
    formData.firstName = "Jakob";
    formData.lastName = "Hansen";
    formData.email = "Jakob@example.com";
    formData.phone = "12345679";
    formData.deliveryAddressLine = "Test Street 69";
    formData.deliveryCity = "København Ø";
    formData.deliveryZipCode = "2100";
    formData.agreeToTerms = true;

    expect(validateForm(formData)).toBe(true);
    formData.email = "";
    expect(validateForm(formData)).toBe(false);
  });

  test("disables submit button when form is valid, but different billing address is chosen", async () => {
    formData.firstName = "Jakob";
    formData.lastName = "Hansen";
    formData.email = "Jakob@example.com";
    formData.phone = "12345678";
    formData.deliveryAddressLine = "Test Street 69";
    formData.deliveryCity = "København Ø";
    formData.deliveryZipCode = "2100";
    formData.agreeToTerms = true;
    expect(validateForm(formData)).toBe(true);
    formData.billingAddressDifferent = true;
    expect(validateForm(formData)).toBe(false);
  });

  test("Enables submit button when form is valid, different billing address is chosen and form filled", async () => {
    formData.firstName = "Jakob";
    formData.lastName = "Hansen";
    formData.email = "Jakob@example.com";
    formData.phone = "12345678";
    formData.deliveryAddressLine = "Test Street 69";
    formData.deliveryCity = "København Ø";
    formData.deliveryZipCode = "2100";
    formData.agreeToTerms = true;
    formData.billingAddressDifferent = false;
    formData.billingCity = "Askeby";
    formData.billingZipCode = "4792";
    formData.billingAddressLine = "Test Street 420";

    expect(validateForm(formData)).toBe(true);
  });
});
