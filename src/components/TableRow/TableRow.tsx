import { Link } from "react-router-dom";

import { Task } from "../../types/Task";

import { Badge, LinkBadge } from "../Badge";
import Button from "../Button";

import { getResultLink } from "../../utils/getResultLink";

import "./TableRow.scss";

interface Props {
  task: Task;
  handleGenerateTask: (task: Task) => void;
}

function TableRow({ task, handleGenerateTask }: Props) {
  const taskResultLink = getResultLink(task);

  return (
    <tr className="table-row">
      <td className="table-row__primary-column">
        <Link to={task.id}>{task.name}</Link>
      </td>
      <td>
        <Badge badgeText={task.dimension} />
      </td>
      <td>
        <Badge badgeText={task.templateId} />
      </td>
      <td>
        <div className="table-row__data">
          {task.imageLayers.map((imageLayer) => (
            <Badge key={imageLayer} badgeText={imageLayer} />
          ))}
        </div>
      </td>
      <td>
        {task.textLayers.map((textLayer) => (
          <Badge badgeText={textLayer} />
        ))}
      </td>
      <td>
        <Badge badgeText={task.amount.toString()} />
      </td>
      <td>
        <Badge badgeText={task.genType} />
      </td>
      <td>
        <Button
          buttonText="Generate"
          onClick={() => handleGenerateTask(task)}
          variant="filled"
          compact
        />
      </td>
      <td>
        <LinkBadge badgeText="Result" href={taskResultLink} />
      </td>
    </tr>
  );
}

export default TableRow;
