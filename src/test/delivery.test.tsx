import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(cleanup);

import { describe, expect, test } from "vitest";
import Delivery from "../components/Delivery";
import { fireEvent, render } from "@testing-library/react";

describe(Delivery.name, () => {
  test("Renders Delivery component", () => {
    const { getByText } = render(<Delivery />);
    expect(getByText(/Delivery Information/i)).toBeInTheDocument();
  });

  test("Validates form fields before allowing submission", async () => {
    const { getByText } = render(<Delivery />);

    fireEvent.click(getByText("Submit"));

    expect(getByText("Submit")).toBeDisabled();
  });

  test("updates state on input change", () => {
    const { getByLabelText } = render(<Delivery />);

    const firstNameInput = getByLabelText(/First Name \*/i);
    fireEvent.change(firstNameInput, { target: { value: "Jakob" } });

    expect(firstNameInput).toHaveValue("Jakob");
  });

  test("Enables submit button when form is valid", async () => {
    const { getByLabelText, getByText } = render(<Delivery />);

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

    expect(getByText("Submit")).toBeEnabled();
  });

  test("disnables submit button when form is valid, but different billing address is chosen", async () => {
    const { getByLabelText, getByText } = render(<Delivery />);

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

    expect(getByText("Submit")).toBeDisabled();
  });

  test("Enables submit button when form is valid, different billing address is chosen and form filled", async () => {
    const { getByLabelText, getByText } = render(<Delivery />);

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

    expect(getByText("Submit")).toBeEnabled();
  });
});
