import { Dispatch, SetStateAction, useState } from "react";
import "./createImageLayerModal.scss";

import { v4 as uuidv4 } from "uuid";

import { TemplateId } from "../../types/TemplateId";
import { GenType } from "../../types/GenType";
import { useTasksStore } from "../../store/tasksStore";
import { Dimension } from "../../types/Dimension";
import { ImageLayer } from "../../types/ImageLayer";
import { Flow } from "../../types/Flow";
import { Style } from "../../types/Style";

interface Props {
  taskId: string;
  setCreatingImageLayer: Dispatch<SetStateAction<boolean>>;
}

export function CreateImageLayerModal({
  taskId,
  setCreatingImageLayer,
}: Props) {
  const { addImageLayer } = useTasksStore();

  const [name, setName] = useState("");
  const [dimension, setDimension] = useState<Dimension>(Dimension["1x1"]);
  const [templateId, setTemplateId] = useState<TemplateId>(
    TemplateId["0xdoscyowl50c"]
  );
  const [genType, setGenType] = useState<GenType>(GenType.random_generation);
  const [flow, setFlow] = useState<Flow>(Flow.mjModel);
  const [prompts, setPrompts] = useState("");
  const [generatesPerRef, setGeneratesPerRef] = useState(1);
  const [style, setStyle] = useState<Style>(Style.animeStyle);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newImageLayer: ImageLayer = {
      id: uuidv4(),
      taskId: taskId,
      name,
      dimension,
      flow,
      imageRefs: null,
      prompts,
      generatesPerRef,
      style,
    };

    addImageLayer(newImageLayer);
    setCreatingImageLayer(false);
  };

  const handleOnReset = () => {
    setCreatingImageLayer(false);
  };

  return (
    <div className="modal">
      <h1 className="modal__title">Create New Image Layer</h1>
      <form className="form" onSubmit={handleOnSubmit} onReset={handleOnReset}>
        <div className="form__input">
          <label className="form__input-title">Enter Layer Name</label>
          <input
            name="layerName"
            className="form__input-field"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form__input">
          <label className="form__input-title">Select Dimension</label>
          <select
            className="form__input-field"
            name="dimension"
            value={dimension}
            onChange={(event) => setDimension(event.target.value as Dimension)}
          >
            {Object.entries(Dimension).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label className="form__input-title">Select Template ID</label>
          <select
            className="form__input-field"
            name="templateId"
            value={templateId}
            onChange={(event) =>
              setTemplateId(event.target.value as TemplateId)
            }
          >
            {Object.entries(TemplateId).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label className="form__input-title">Select Gen Type</label>
          <select
            className="form__input-field"
            name="genType"
            value={genType}
            onChange={(event) => setGenType(event.target.value as GenType)}
          >
            {Object.entries(GenType).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label className="form__input-title">Select Flow</label>
          <select
            className="form__input-field"
            name="flow"
            value={flow}
            onChange={(event) => setFlow(event.target.value as Flow)}
          >
            {Object.entries(Flow).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="form__input">
          <label className="form__input-title">Enter Prompts</label>
          <input
            name="prompts"
            className="form__input-field"
            type="text"
            value={prompts}
            onChange={(event) => setPrompts(event.target.value)}
          />
        </div>
        <div className="form__input">
          <label className="form__input-title">Generates Per Ref</label>
          <input
            name="generatesPerRef"
            className="form__input-field"
            type="number"
            value={generatesPerRef}
            onChange={(event) => setGeneratesPerRef(Number(event.target.value))}
            min={1}
            required
          />
        </div>
        <div className="form__input">
          <label className="form__input-title">Select Style</label>
          <select
            className="form__input-field"
            name="style"
            value={style}
            onChange={(event) => setStyle(event.target.value as Style)}
          >
            {Object.entries(Style).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
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
