import { create } from "zustand";
import { useCampingStore } from "./camping";

interface LayoutStore {
  isListOpen: boolean;
  isDetailPannelOpen: boolean;
  openList: () => void;
  closeList: () => void;
  openDetailPannel: () => void;
  closeDetailPannel: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isListOpen: true,
  isDetailPannelOpen: false,
  openList: () =>
    set({
      isListOpen: true,
    }),
  closeList: () => {
    const resetItem = useCampingStore.getState().resetItem;
    resetItem();

    set({
      isDetailPannelOpen: false,
      isListOpen: false,
    });
  },
  openDetailPannel: () => {
    set({ isDetailPannelOpen: true });
  },
  closeDetailPannel: () => {
    const resetItem = useCampingStore.getState().resetItem;
    resetItem();

    set({ isDetailPannelOpen: false });
  },
}));
