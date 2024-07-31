import { useTasksStore } from "../../store/tasksStore";
import { Task } from "../../types/Task";

import { Link } from "react-router-dom";

interface Props {
  task: Task;
  handleGenerateTask: () => void;
}

function TableRow({ task, handleGenerateTask }: Props) {
  const { getImageLayersOfTask } = useTasksStore();

  return (
    <tr key={task.name}>
      <td>
        <Link to={task.id}>{task.name}</Link>
      </td>
      <td>{task.dimension}</td>
      <td>{task.templateId}</td>
      <td>{getImageLayersOfTask(task.id)?.map((layer) => layer.name).join(', ')}</td>
      <td>FUCK IT WE BALLIN</td>
      <td>
        {getImageLayersOfTask(task.id)?.reduce(
          (acc, { generatesPerRef }) => acc + generatesPerRef,
          0
        )}
      </td>
      <td>{task.genType}</td>
      <td>
        <button onClick={handleGenerateTask}>Generate</button>
      </td>
      <td>some result link</td>
    </tr>
  );
}

export default TableRow;
