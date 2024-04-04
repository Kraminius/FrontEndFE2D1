import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import Delivery from "../components/Delivery";

afterEach(cleanup);

describe(Delivery.name, () => {
	test("Renders Delivery component", () => {
		const mockOnFormValidityChange = vi.fn();
		const { getByText } = render(
			<Delivery onFormValidityChange={mockOnFormValidityChange} />
		);
		expect(getByText(/Delivery Information/i)).toBeInTheDocument();
	});

	test("Check that form is invalid without input", async () => {
		const mockOnFormValidityChange = vi.fn();
		const { getByText } = render(
			<Delivery onFormValidityChange={mockOnFormValidityChange} />
		);

		expect(mockOnFormValidityChange).toHaveBeenCalledWith(false);
	});

	test("updates state on input change", () => {
		const mockOnFormValidityChange = vi.fn();
		const { getByLabelText } = render(
			<Delivery onFormValidityChange={mockOnFormValidityChange} />
		);

		const firstNameInput = getByLabelText(/First Name \*/i);
		fireEvent.change(firstNameInput, { target: { value: "Jakob" } });

		expect(firstNameInput).toHaveValue("Jakob");
	});

	test("Update onFormValidityChange when form is valid and invalid", async () => {
		const mockOnFormValidityChange = vi.fn();
		const { getByLabelText, getByText } = render(
			<Delivery onFormValidityChange={mockOnFormValidityChange} />
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


		const termsOfServiceCheckbox = getByLabelText(/I agree to terms of service/i);
		fireEvent.click(termsOfServiceCheckbox);

		expect(mockOnFormValidityChange).toHaveBeenCalledWith(true);
		fireEvent.change(getByLabelText(/Email \*/i), {
			target: { value: "invalid" },
		});
		expect(mockOnFormValidityChange).toHaveBeenCalledWith(false);
	});

	test("disnables submit button when form is valid, but different billing address is chosen", async () => {
		const mockOnFormValidityChange = vi.fn();
		const { getByLabelText, getByText } = render(
			<Delivery onFormValidityChange={mockOnFormValidityChange} />
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
		const { getByLabelText, getByText } = render(
			<Delivery onFormValidityChange={mockOnFormValidityChange} />
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

		const termsOfServiceCheckbox = getByLabelText(/I agree to terms of service/i);
		fireEvent.click(termsOfServiceCheckbox);
		expect(mockOnFormValidityChange).toHaveBeenCalledWith(true);
	});
});
