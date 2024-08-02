import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ImageLayer } from "../types/ImageLayer";

interface ImageLayersState {
  imageLayers: ImageLayer[];
  addImageLayer: (imageLayer: ImageLayer) => void;
  getImageLayerByName: (name: string) => ImageLayer | undefined;
  getImageLayersByNames: (names: string[]) => ImageLayer[];
  updateImageLayer: (name: string, updatedImageLayer: ImageLayer) => void;
  resetImageLayers: () => void;
}

export const useImageLayersStore = create<ImageLayersState>()(
  persist(
    (set, get) => ({
      imageLayers: [],
      addImageLayer: (imageLayer: ImageLayer) =>
        set((state) => ({ imageLayers: [...state.imageLayers, imageLayer] })),
      getImageLayerByName: (name: string) =>
        get().imageLayers.find((imageLayer) => imageLayer.name === name),
      getImageLayersByNames: (names: string[]) =>
        get().imageLayers.filter((imageLayer) =>
          names.includes(imageLayer.name)
        ),
      updateImageLayer: (name: string, updatedImageLayer: ImageLayer) => {
        set((state) => ({
          imageLayers: state.imageLayers.map((layer) =>
            layer.name === name ? updatedImageLayer : layer
          ),
        }));
      },
      resetImageLayers: () => set(() => ({ imageLayers: [] })),
    }),
    {
      name: "renesandro-image-layers-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
