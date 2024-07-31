import { Task } from "../../types/Task";

import { Link } from "react-router-dom";

import './TableRow.scss';

interface Props {
  task: Task;
  handleGenerateTask: (task: Task) => void;
}

function TableRow({ task, handleGenerateTask }: Props) {
  return (
    <tr key={task.name}>
      <td>
        <Link to={task.id}>{task.name}</Link>
      </td>
      <td>{task.dimension}</td>
      <td>{task.templateId}</td>
      <td>{task.imageLayers.join(", ")}</td>
      <td>{task.textLayers.join(", ")}</td>
      <td>{task.amount}</td>
      <td>{task.genType}</td>
      <td>
        <button onClick={() => handleGenerateTask(task)}>Generate</button>
      </td>
      <td>some result link</td>
    </tr>
  );
}

export default TableRow;
