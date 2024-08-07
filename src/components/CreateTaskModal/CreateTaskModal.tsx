import { Dispatch, SetStateAction, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import InputField from "../InputField";
import SelectField from "../SelectField";
import NumberInputField from "../NumberInputField";
import Button from "../Button";

import { useTasksStore } from "../../store/tasksStore";

import { TemplateId } from "../../types/TemplateId";
import { GenType } from "../../types/GenType";
import { Task } from "../../types/Task";
import { Dimension } from "../../types/Dimension";
import { TaskStatus } from "../../types/TaskStatus";

import "./createTaskModal.scss";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

function CreateTaskModal({ setModalOpen }: Props) {
  const { addTask } = useTasksStore();

  const [name, setName] = useState("");
  const [dimension, setDimension] = useState(Dimension["1x1"]);
  const [templateId, setTemplateId] = useState(TemplateId["0xdoscyowl50c"]);
  const [genType, setGenType] = useState(GenType.random_generation);
  const [amount, setAmount] = useState(1);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const id = uuidv4();

    const newTask: Task = {
      id,
      name,
      dimension,
      genType,
      templateId,
      amount,
      imageLayers: [],
      textLayers: [],
      status: TaskStatus.NotStarted,
    };

    addTask(newTask);

    setModalOpen(false);
  };

  const handleOnCancel = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setModalOpen(false);
  };

  return (
    <div className="task-modal">
      <h1 className="task-modal__title">Create new task</h1>

      <form className="form" onSubmit={handleOnSubmit} onReset={handleOnCancel}>
        <InputField
          label="Enter task name"
          name="taskName"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required={true}
        />

        <SelectField
          label="Select dimension"
          name="dimension"
          value={dimension}
          onChange={(event) => setDimension(event.target.value as Dimension)}
          options={Object.entries(Dimension).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />

        <SelectField
          label="Select template id"
          name="templateId"
          value={templateId}
          onChange={(event) => setTemplateId(event.target.value as TemplateId)}
          options={Object.entries(TemplateId).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />

        <SelectField
          label="Select gen type"
          name="genType"
          value={genType}
          onChange={(event) => setGenType(event.target.value as GenType)}
          options={Object.entries(GenType).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
        />

        <NumberInputField
          label="Amount"
          name="amount"
          value={amount}
          onChange={(event) => setAmount(Number(event.target.value))}
          min={1}
          required={true}
        />

        <div className="form__buttons">
          <Button buttonText="Cancel" type="reset" stretch />
          <Button buttonText="Submit" type="submit" variant="filled" stretch />
        </div>
      </form>
    </div>
  );
}

export default CreateTaskModal;
