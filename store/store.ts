import { create } from "zustand";

interface Item {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Store {
  items: Item | {};
  storeDetails: (item: Item) => void;
  removeDetails: () => void;
}

export const useRecipeDetailsStore = create<Store>((set) => ({
  items: {},
  storeDetails: (item: Item) => set(() => ({ items: { ...item } })),
  removeDetails: () => set({ items: {} }),
}));
