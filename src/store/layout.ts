import { create } from "zustand";

interface LayoutStore {
  isListOpen: boolean;
  isDetailPannelOpen: boolean;
  openList: () => void;
  closeList: () => void;
  openDetailPannel: () => void;
  closeDetailPannel: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isListOpen: false,
  isDetailPannelOpen: false,
  openList: () =>
    set({
      isListOpen: true,
    }),
  closeList: () =>
    set({
      isListOpen: false,
    }),
  openDetailPannel: () => set({ isDetailPannelOpen: true }),
  closeDetailPannel: () => set({ isDetailPannelOpen: false }),
}));
