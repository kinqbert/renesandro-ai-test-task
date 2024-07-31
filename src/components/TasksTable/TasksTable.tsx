import { Link } from "react-router-dom";
import { Task } from "../../types/Task";
import { useTasksStore } from "../../store/tasksStore";

interface Props {
  tasks: Task[];
}

function TasksTable({ tasks }: Props) {
  const { getImageLayersOfTask } = useTasksStore();

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
          <tr key={task.name}>
            <td>
              <Link to={task.id}>{task.name}</Link>
            </td>
            <td>{task.dimension}</td>
            <td>{task.templateId}</td>
            <td>{getImageLayersOfTask(task.id)?.map((layer) => layer.name)}</td>
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
        ))}
      </tbody>
    </table>
  );
}

export default TasksTable;
