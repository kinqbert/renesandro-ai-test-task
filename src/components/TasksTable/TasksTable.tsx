import { generateFormats } from "../../api/api";
import { Task } from "../../types/Task";

import TableRow from "../TableRow";

import "./TasksTable.scss";

interface Props {
  tasks: Task[];
}

function TasksTable({ tasks }: Props) {
  const handleGenerateTask = (task: Task) => {
    generateFormats(task).then((response) => console.log(response));
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
