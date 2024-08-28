import { create } from "zustand";
import { ICampItem } from "../type/camping";
import { useLocationStore } from "./location";

interface CampingStore {
  selectedItem: ICampItem | null;
  selectItem: (item: ICampItem) => void;
  resetItem: () => void;
}

export const useCampingStore = create<CampingStore>((set) => ({
  selectedItem: null,
  selectItem: (newItem: ICampItem) => {
    const currentMap = useLocationStore.getState().map;
    if (currentMap) {
      currentMap.setCenter(
        new naver.maps.LatLng(Number(newItem.mapY), Number(newItem.mapX))
      );
    }

    set({
      selectedItem: newItem,
    });
  },
  resetItem: () => set({ selectedItem: null }),
}));
