import { Dispatch, SetStateAction, useState } from "react";
import "./createTaskModal.scss";

import { TemplateId } from "../../types/TemplateId";
import { GenType } from "../../types/GenType";
import { useTasksStore } from "../../store/tasksStore";
import { Task } from "../../types/Task";
import { Dimension } from "../../types/Dimension";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateTaskModal({ setModalOpen }: Props) {
  const addTask = useTasksStore((state) => state.addTask);

  const [name, setName] = useState("");
  const [dimension, setDimension] = useState(Dimension["1x1"]);
  const [templateId, setTemplateId] = useState(TemplateId["0xdoscyowl50c"]);
  const [genType, setGenType] = useState(GenType.Cycle);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTask: Task = {
      name,
      dimension,
      genType,
      templateId,
      imageLayers: [],
    };

    addTask(newTask);

    setModalOpen(false);
  };

  const handleOnCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setModalOpen(false);
  };

  return (
    <div className="modal">
      <h1 className="modal__title">Create new task</h1>
      <form className="form" onSubmit={handleOnSubmit} onReset={handleOnCancel}>
        <div className="form__input">
          <label className="form__input-title">Enter task name</label>
          <input
            name="taskName"
            className="form__input-field"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form__input">
          <label className="form__input-title">Select dimension</label>
          <select
            className="form__input-field"
            name="dimension"
            value={dimension}
            onChange={(event) => setDimension(event.target.value as Dimension)}
          >
            {Object.entries(Dimension).map((entry) => (
              <option value={entry[0]}>{entry[1]}</option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label className="form__input-title">Select template id</label>
          <select
            className="form__input-field"
            name="templateId"
            value={templateId}
            onChange={(event) =>
              setTemplateId(event.target.value as TemplateId)
            }
          >
            {Object.entries(TemplateId).map((entry) => (
              <option value={entry[0]}>{entry[1]}</option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label className="form__input-title">Select gen type</label>
          <select
            className="form__input-field"
            name="genType"
            value={genType}
            onChange={(event) =>
              setGenType(event.target.value as GenType)
            }
          >
            {Object.entries(GenType).map((entry) => (
              <option value={entry[0]}>{entry[1]}</option>
            ))}
          </select>
        </div>
        <div className="form__buttons">
          <button className="form__button form__button--cancel" type="reset">
            Cancel
          </button>

          <button className="form__button form__button-submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
