import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task } from "../types/Task";

interface TasksState {
  tasks: Task[];
  addTask: (task: Task) => void;
  reset: () => void;
}

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task: Task) =>
        set((state) => ({ tasks: [...state.tasks, task] })),
      reset: () => set(() => ({ tasks: [] })),
    }),
    {
      name: "renesandro-tasks-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
