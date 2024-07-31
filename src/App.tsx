import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import MainPage from "./pages/MainPage/MainPage";
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:taskId" element={<TaskPage />} />
      </Routes>
    </Router>
  );
}

export default App;
