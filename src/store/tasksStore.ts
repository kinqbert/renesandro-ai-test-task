import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task } from "../types/Task";
import { ImageLayer } from "../types/ImageLayer";

interface TasksState {
  tasks: Task[];
  imageLayers: ImageLayer[];
  addTask: (task: Task) => void;
  addImageLayerToTask: (taskId: string, imageLayer: ImageLayer) => void;
  getTaskById: (id: string) => Task | undefined;
  getImageLayerByName: (name: string) => ImageLayer | undefined;
  getImageLayersOfTask: (taskId: string) => ImageLayer[];
  updateImageLayer: (name: string, updatedImageLayer: ImageLayer) => void;
  reset: () => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      imageLayers: [],
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      addImageLayerToTask: (taskId: string, imageLayer: ImageLayer) => {
        set((state) => {
          const task = state.tasks.find((task) => task.id === taskId);
          if (task) {
            task.imageLayers = [...task.imageLayers, imageLayer.name];
            return { imageLayers: [...state.imageLayers, imageLayer] };
          }
          return state;
        });
      },
      getTaskById: (id: string) => get().tasks.find((task) => task.id === id),
      getImageLayerByName: (name: string) =>
        get().imageLayers.find((imageLayer) => imageLayer.name === name),
      getImageLayersOfTask: (taskId: string) => {
        const task = get().getTaskById(taskId);
        return get().imageLayers.filter(imageLayer => task?.imageLayers.includes(imageLayer.name)) 
      },
      updateImageLayer: (name: string, updatedImageLayer: ImageLayer) => {
        set((state) => ({
          imageLayers: state.imageLayers.map((layer) =>
            layer.name === name ? updatedImageLayer : layer
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
