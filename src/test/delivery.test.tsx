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
});
