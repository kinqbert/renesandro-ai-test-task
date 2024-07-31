import { useState } from "react";
import { CreateTaskModal } from "../../components/CreateTaskModal";
import { useTasksStore } from "../../store/tasksStore";

import "./MainPage.scss";
import { Link } from "react-router-dom";

function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { tasks, getImageLayersOfTask } = useTasksStore();

  const handleNewTask = () => {
    setModalOpen(true);
  };

  const handleGenerateTask = () => { };


  return (
    <>
      <header className="header">
        <h1>Renesandro AI Test Task</h1>
        <button onClick={handleNewTask}>New task</button>
      </header>
      <main>
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
      </main>
      {modalOpen && <CreateTaskModal setModalOpen={setModalOpen} />}
    </>
  );
}

export default MainPage;
