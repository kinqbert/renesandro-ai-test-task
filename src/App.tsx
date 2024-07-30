import { useState } from "react";
import "./App.scss";
import { CreateTaskModal } from "./components/CreateTaskModal";
import { useTasksStore } from "./store/tasksStore";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const tasks = useTasksStore((state) => state.tasks);

  const handleNewTask = () => {
    setModalOpen(true);
  };

  const handleGenerateTask = () => {};

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
                <td><a href="#">{task.name}</a></td>
                <td>{task.dimension}</td>
                <td>{task.templateId}</td>
                <td>{task.imageLayers?.map((layer) => layer.name)}</td>
                <td>FUCK IT WE BALLIN</td>
                <td>{task.imageLayers?.length}</td>
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

export default App;
