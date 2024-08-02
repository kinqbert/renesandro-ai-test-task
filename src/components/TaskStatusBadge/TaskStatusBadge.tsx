import cn from "classnames";

import { TaskStatus } from "../../types/TaskStatus";

import "./TaskStatusBadge.scss";

interface Props {
  taskStatus: TaskStatus;
}

function TaskStatusBadge({ taskStatus }: Props) {
  const statusClass = ((taskStatus: TaskStatus) => {
    switch (taskStatus) {
      case TaskStatus.NotStarted:
        return "not-started";
      case TaskStatus.Loading:
        return "loading";
      case TaskStatus.Completed:
        return "completed";
    }
  })(taskStatus);

  return (
    <div
      className={cn("task-status-badge", `task-status-badge--${statusClass}`)}
    ></div>
  );
}

export default TaskStatusBadge;
