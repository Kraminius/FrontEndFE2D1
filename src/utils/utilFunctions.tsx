import { BasketItem } from "../types/Types.ts";

export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@(?![.-])[^\s@]+\.[^\s@]+(?<!\.)$/;
  return regex.test(email);
};

export function calculateTotal(items: BasketItem[]) {
  const total = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const above300 = total > 300;
  if (above300) {
    return total * 0.9;
  } else return total;
}

export function calculatePrice(item: BasketItem) {
  const normalPrice = item.price * item.quantity;
  let discountedPrice = normalPrice;

  if (item.rebateQuantity > 0 && item.quantity >= item.rebateQuantity) {
    discountedPrice = normalPrice - (normalPrice * item.rebatePercent) / 100;
  }

  return {
    normalPrice,
    discountedPrice,
  };
}

export function calculateTotalWithBreakdown(items: BasketItem[]) {
  const subtotal = items.reduce(
    (sum, item) => sum + calculateItemTotal(item),
    0,
  );
  const discountThreshold = 300;
  const discountRate = 0.1; // 10%

  let discountApplied = 0;
  let total = subtotal;

  if (subtotal > discountThreshold) {
    discountApplied = subtotal * discountRate;
    total = subtotal - discountApplied;
  }

  return {
    subtotal: subtotal,
    discountApplied: discountApplied,
    total: total,
  };
}

export const calculateItemTotal = (item: BasketItem) => {
  let totalPrice = item.price * item.quantity;

  if (item.rebateQuantity && item.quantity >= item.rebateQuantity) {
    totalPrice = totalPrice - totalPrice * (item.rebatePercent / 100);
  } else {
    return totalPrice;
  }

  return totalPrice;
};
