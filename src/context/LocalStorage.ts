import { BasketItem } from "../types/Types";
const LOCAL_STORAGE_KEY = "frontend_project_basketItems";

export const saveToLocalStorage = (items: BasketItem[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
};

export const loadFromLocalStorage = (): BasketItem[] => {
  const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedItems ? JSON.parse(storedItems) : [];
};

export const isLocallyStored = () => {
  const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedItems !== null;
};
