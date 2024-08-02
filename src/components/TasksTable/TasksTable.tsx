import { generateFormats } from "../../api/api";
import { useTasksStore } from "../../store/tasksStore";
import { Task } from "../../types/Task";
import { TaskStatus } from "../../types/TaskStatus";

import TableRow from "../TableRow";

import "./TasksTable.scss";

interface Props {
  tasks: Task[];
}

function TasksTable({ tasks }: Props) {
  const { setTaskStatus } = useTasksStore();

  const handleGenerateTask = (task: Task) => {
    setTaskStatus(task.id, TaskStatus.Loading);
    generateFormats(task)
      .then(() => setTaskStatus(task.id, TaskStatus.Completed))
      .catch(() => setTaskStatus(task.id, TaskStatus.NotStarted));
  };

  return (
    <table className="table">
      <thead className="table__thead">
        <tr>
          <th className="table__task-name">Task name</th>
          <th className="table__dimension">Dimension</th>
          <th className="table__template-id">Template ID</th>
          <th className="table__image-layers">Image layers</th>
          <th className="table__text-layers">Text layers</th>
          <th className="table__amount">Amount</th>
          <th className="table__gen-type">Gen type</th>
          <th className="table__gen-tasks">Gen tasks</th>
          <th className="table__result-ads">Result Ads</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TableRow
            key={task.id}
            task={task}
            handleGenerateTask={handleGenerateTask}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TasksTable;
