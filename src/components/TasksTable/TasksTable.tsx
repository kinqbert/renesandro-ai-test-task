import { Task } from "../../types/Task";

import TableRow from "../TableRow";

interface Props {
  tasks: Task[];
}

function TasksTable({ tasks }: Props) {

  const handleGenerateTask = () => { };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Task name</th>
          <th>Dimension</th>
          <th>Template ID</th>
          <th>Image layers</th>
          <th>Text layers</th>
          <th>Amount</th>
          <th>Gen type</th>
          <th>Gen_tasks</th>
          <th>Result Ads</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <TableRow task={task} handleGenerateTask={handleGenerateTask} />
        ))}
      </tbody>
    </table>
  );
}

export default TasksTable;
