import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task } from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";
import { ImageLayer } from "../types/ImageLayer";
import { useImageLayersStore } from "./imageLayersStore";

interface TasksState {
  tasks: Task[];
  addTask: (task: Task) => void;
  addImageLayerToTask: (taskId: string, imageLayer: ImageLayer) => void;
  getTaskById: (id: string) => Task | undefined;
  setTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  resetTasks: () => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      addImageLayerToTask: (taskId: string, imageLayer: ImageLayer) => {
        const { addImageLayer } = useImageLayersStore.getState();
        addImageLayer(imageLayer);
        set((state) => {
          const task = state.tasks.find((task) => task.id === taskId);
          if (task) {
            task.imageLayers = [...task.imageLayers, imageLayer.name];
          }
          return { tasks: [...state.tasks] };
        });
      },
      getTaskById: (id: string) => get().tasks.find((task) => task.id === id),
      setTaskStatus: (taskId: string, newStatus: TaskStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        }));
      },
      resetTasks: () => set(() => ({ tasks: [] })),
    }),
    {
      name: "renesandro-tasks-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
