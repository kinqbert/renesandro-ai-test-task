import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task } from "../types/Task";
import { ImageLayer } from "../types/ImageLayer";

interface TasksState {
  tasks: Task[];
  imageLayers: ImageLayer[];
  addTask: (task: Task) => void;
  addImageLayer: (imageLayer: ImageLayer) => void;
  getTaskById: (id: string) => Task | undefined;
  getImageLayerById: (id: string) => ImageLayer | undefined;
  getImageLayersOfTask: (taskId: string) => ImageLayer[] | undefined;
  updateImageLayer: (
    imageLayerId: string,
    updatedImageLayer: ImageLayer
  ) => void;
  reset: () => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      imageLayers: [],
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      addImageLayer: (imageLayer: ImageLayer) =>
        set((state) => ({ imageLayers: [...state.imageLayers, imageLayer] })),
      getTaskById: (id: string) => get().tasks.find((task) => task.id === id),
      getImageLayerById: (id: string) =>
        get().imageLayers.find((imageLayer) => imageLayer.id === id),
      getImageLayersOfTask: (taskId: string) =>
        get().imageLayers.filter((imageLayer) => imageLayer.taskId === taskId),
      updateImageLayer: (
        imageLayerId: string,
        updatedImageLayer: ImageLayer
      ) => {
        set((state) => ({
          imageLayers: state.imageLayers.map((layer) =>
            layer.id === imageLayerId ? updatedImageLayer : layer
          ),
        }));
      },
      reset: () => set(() => ({ tasks: [], imageLayers: [] })),
    }),
    {
      name: "renesandro-tasks-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
