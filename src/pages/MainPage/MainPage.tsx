import { useState } from "react";
import CreateTaskModal from "../../components/CreateTaskModal";
import { useTasksStore } from "../../store/tasksStore";

import TasksTable from "../../components/TasksTable";
import Button from "../../components/Button";

import "./MainPage.scss";

function MainPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { tasks } = useTasksStore();

  const handleNewTask = () => {
    setModalOpen(true);
  };

  return (
    <>
      <header className="header">
        <h1>Renesandro AI Test Task</h1>
        <Button buttonText="New task" variant="filled" onClick={handleNewTask} />
      </header>
      <main>
        <TasksTable tasks={tasks} />
      </main>
      {modalOpen && <CreateTaskModal setModalOpen={setModalOpen} />}
    </>
  );
}

export default MainPage;
