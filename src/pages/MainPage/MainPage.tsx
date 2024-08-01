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
        <div className="header__left">
          <img className="header__logo" src="src\assets\images\logo.png" alt="Renesandro AI Logo" />
          <h1 className="header__title">Renesandro AI Test Task</h1>
        </div>
        <div className="header__right">
          <Button
            buttonText="New task"
            variant="filled"
            onClick={handleNewTask}
          />
        </div>
      </header>
      <main>
        <TasksTable tasks={tasks} />
      </main>
      {modalOpen && <CreateTaskModal setModalOpen={setModalOpen} />}
    </>
  );
}

export default MainPage;
