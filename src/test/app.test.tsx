import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import App from "../App";
import { calculateItemTotal } from '../components/flowingContent/CustomerItemCard.tsx';
import { BasketItem, RecurringOrder } from '../types/Types';
import BasketSummary from "../components/summary/BasketSummary.tsx";
import { isValidEmail } from "../utils/utilfunctions.tsx";

// describe(App.name, () => {
//   test('should display "Shopping Basket" title', () => {
//     render(<App />);
//     const titleElement = screen.getByText("Shopping Basket");
//     expect(titleElement).toBeInTheDocument();
//   });
// });
//
// describe(App.name, () => {
//   test("should display 'Gulerødder'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Gulerødder");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//
//   test("should display 'Ærter'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Ærter");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Kartofler'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Kartofler");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Hvidløg'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Hvidløg");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Ingefær'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Ingefær");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Gurkemeje'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Gurkemeje");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Karry'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Karry");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Kokosmælk'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Kokosmælk");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
//   test("should display 'Ris'", async () => {
//     render(<App />);
//     const elements = await screen.getAllByText("Ris");
//     elements.forEach((element) => {
//       expect(element).toBeInTheDocument();
//     });
//   });
// });

// Tests for discount calculation
describe(App.name, () => {
	test('calculates the total price without discount', () => {
		const item: BasketItem = {
			id: '1',
			name: 'Test Item',
			price: 10,
			quantity: 2,
			currency: 'DKK',
			imageUrl: '',
			recurringOrder: RecurringOrder.Once,
			giftWrap: false,
			rebateQuantity: 0,
			rebatePercent: 0,
			upsellProductId: null,
		};

		const total = calculateItemTotal(item);
		expect(total).toBe(20);

	});

	test('calculates the total price with discount', () => {
		const item: BasketItem = {
			id: '1',
			name: 'Test Item',
			price: 10,
			quantity: 2,
			currency: 'DKK',
			imageUrl: '',
			recurringOrder: RecurringOrder.Once,
			giftWrap: false,
			rebateQuantity: 2,
			rebatePercent: 25,
			upsellProductId: null,
		};

		const total = calculateItemTotal(item);

		expect(total).toBe(15);
	});

	test('does not apply discount if quantity is less than required', () => {
		const item: BasketItem = {
			id: '1',
			name: 'Test Item',
			price: 10,
			quantity: 2,
			currency: 'DKK',
			imageUrl: '',
			recurringOrder: RecurringOrder.Once,
			giftWrap: false,
			rebateQuantity: 3,
			rebatePercent: 25,
			upsellProductId: null,
		};

		const total = calculateItemTotal(item);

		expect(total).toBe(20);
	});

	test('applies discount to total price summary', () => {
		const items: BasketItem[] = [
			{
				id: '1',
				name: 'Test Item',
				price: 10,
				quantity: 2,
				currency: 'DKK',
				imageUrl: '',
				recurringOrder: RecurringOrder.Once,
				giftWrap: false,
				rebateQuantity: 3,
				rebatePercent: 25,
				upsellProductId: null,
			},
			{
				id: '2',
				name: 'Test Item 2',
				price: 10,
				quantity: 3,
				currency: 'DKK',
				imageUrl: '',
				recurringOrder: RecurringOrder.Once,
				giftWrap: false,
				rebateQuantity: 3,
				rebatePercent: 25,
				upsellProductId: null,
			},
			{
				id: '3',
				name: 'Test Item 3',
				price: 5,
				quantity: 2,
				currency: 'DKK',
				imageUrl: '',
				recurringOrder: RecurringOrder.Once,
				giftWrap: false,
				rebateQuantity: 3,
				rebatePercent: 10,
				upsellProductId: null,
			},
		];

		const { getByText } = render(<BasketSummary items={items} />);

		expect(getByText(/Total:/i).textContent).toBe('Total: 52.50,-');

	});

	test('applies discount if purchase amount is above 300', async () => {
		const items = [
			{
				id: 'test1',
				name: 'Test Item 1',
				price: 299,
				quantity: 1,
				imageUrl: undefined,
				currency: 'DKK',
				recurringOrder: RecurringOrder.Once,
				giftWrap: false,
				rebateQuantity: 3,
				rebatePercent: 10,
				upsellProductId: null,
			},
		];
		const { getByText } = render(<BasketSummary items={items} />);


		expect(getByText(/Total:/i).textContent).toBe('Total: 299.00,-');
		render(<App basketItems={items} />);

		const increaseButton = await screen.findByLabelText(`Increase quantity for item ${items[0].id}`);
		fireEvent.click(increaseButton);

		const totalTexts = await screen.findAllByText(/Total:/i);

		const lastTotalText = totalTexts[totalTexts.length - 1];

		expect(lastTotalText.textContent).toContain('538.20,-');
	});


	test('validates email correctly', () => {
		expect(isValidEmail('test@example.com')).toBe(true);
		expect(isValidEmail('invalid-email')).toBe(false);
		expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true);
		expect(isValidEmail('user.name@student.dtu.dk')).toBe(true);
		expect(isValidEmail('user.name@example.com.co')).toBe(true);
		expect(isValidEmail('user.name@example')).toBe(false);
		expect(isValidEmail('user@localhost')).toBe(false);
		expect(isValidEmail('@no-local-part.com')).toBe(false);
		expect(isValidEmail('no-at-sign')).toBe(false);
		expect(isValidEmail('no-tld@domain')).toBe(false);
		expect(isValidEmail('overscore_in@domain.com')).toBe(true);
		expect(isValidEmail('numbers1234@numbers.com')).toBe(true);
		expect(isValidEmail('')).toBe(false);
		expect(isValidEmail('space in@domain.com')).toBe(false);
		expect(isValidEmail('email@domain.com.')).toBe(false);
		expect(isValidEmail('email@-domain.com')).toBe(false);
	});
})
	;