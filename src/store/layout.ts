import { create } from "zustand";

interface LayoutStore {
  isListOpen: boolean;
  openList: () => void;
  closeList: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isListOpen: false,
  openList: () =>
    set({
      isListOpen: true,
    }),
  closeList: () =>
    set({
      isListOpen: false,
    }),
}));
