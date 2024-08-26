import { create } from "zustand";
import { IZoomLevel } from "../type/camping";

interface LocationStore {
  lat: number;
  lng: number;
  locationKeyword: string;
  zoomLevel: IZoomLevel;
  setLat: (newLat: number) => void;
  setLng: (newLng: number) => void;
  setLocationKeyword: (newKeyword: string) => void;
  setZoomLevel: (newZoomLevel: IZoomLevel) => void;
}

export const useLocationStore = create<LocationStore>((set) => ({
  lat: 37.5665,
  lng: 126.978,
  locationKeyword: "",
  zoomLevel: 13,
  setLat: (newLat: number) => set({ lat: newLat }),
  setLng: (newLng: number) =>
    set({
      lng: newLng,
    }),
  setLocationKeyword: (newKeyword: string) =>
    set({
      locationKeyword: newKeyword,
    }),
  setZoomLevel: (newZoomLevel: IZoomLevel) =>
    set({
      zoomLevel: newZoomLevel,
    }),
}));
