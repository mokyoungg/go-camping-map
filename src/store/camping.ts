import { create } from "zustand";
import { ICampItem } from "../type/camping";

interface CampingStore {
  selectedItem: ICampItem | null;
  selectItem: (item: ICampItem) => void;
  resetItem: () => void;
}

export const useCampingStore = create<CampingStore>((set) => ({
  selectedItem: null,
  selectItem: (newItem: ICampItem) =>
    set({
      selectedItem: newItem,
    }),
  resetItem: () => set({ selectedItem: null }),
}));
