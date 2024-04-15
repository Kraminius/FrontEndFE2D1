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

export const calculateItemTotal = (item: BasketItem) => {
  let totalPrice = item.price * item.quantity;

  if (item.rebateQuantity && item.quantity >= item.rebateQuantity) {
    totalPrice = totalPrice - totalPrice * (item.rebatePercent / 100);
  } else {
    return totalPrice;
  }

  return totalPrice;
};
