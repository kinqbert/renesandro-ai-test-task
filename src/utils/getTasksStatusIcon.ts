import Icon from "../components/icons";
import { Task } from "../types/Task";
import { TaskStatus } from "../types/TaskStatus";

export function getTaskStatusIcon(task: Task) {
  switch (task.taskStatus) {
    case TaskStatus.NotStarted:
      return (<Icon icon="cross" />);
  }
}