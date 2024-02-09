import { create } from "zustand";

interface Item {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface Store {
  items: Item | undefined;
  storeDetails: (item: Item) => void;
  removeDetails: () => void;
}

export const useRecipeDetailsStore = create<Store>((set) => ({
  items: undefined,
  storeDetails: (item: Item) => set(() => ({ items: { ...item } })),
  removeDetails: () => set({ items: undefined }),
}));
