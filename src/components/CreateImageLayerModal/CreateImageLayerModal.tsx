import { Dispatch, SetStateAction, useState } from "react";

import InputField from "../InputField";
import SelectField from "../SelectField";
import ImageUploadField from "../ImageUploadField";
import NumberInputField from "../NumberInputField";

import { TemplateId } from "../../types/TemplateId";
import { GenType } from "../../types/GenType";
import { useTasksStore } from "../../store/tasksStore";
import { Dimension } from "../../types/Dimension";
import { ImageLayer } from "../../types/ImageLayer";
import { Flow } from "../../types/Flow";
import { Style } from "../../types/Style";

// import "./CreateImageLayerModal.scss";

interface Props {
  taskId: string;
  setCreatingImageLayer: Dispatch<SetStateAction<boolean>>;
}

function CreateImageLayerModal({ taskId, setCreatingImageLayer }: Props) {
  const { addImageLayerToTask } = useTasksStore();

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
  const [imageRefs, setImageRefs] = useState<string[]>([]);

  const handleOnSubmit = (event: React.FormEvent) => {
    // todo -- add check for unique names
    event.preventDefault();

    const newImageLayer: ImageLayer = {
      name,
      dimension,
      flow,
      imageRefs,
      prompts,
      generatesPerRef,
      style,
    };

    addImageLayerToTask(taskId, newImageLayer);
    setCreatingImageLayer(false);
  };

  const handleOnReset = () => {
    setCreatingImageLayer(false);
  };

  return (
    <div className="modal">
      <h1 className="modal__title">Create New Image Layer</h1>
      <form className="form" onSubmit={handleOnSubmit} onReset={handleOnReset}>
        <InputField
          label="Enter Layer Name"
          name="layerName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <SelectField
          label="Select Dimension"
          name="dimension"
          value={dimension}
          options={Object.entries(Dimension).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          onChange={(e) => setDimension(e.target.value as Dimension)}
          required
        />
        <SelectField
          label="Select Template ID"
          name="templateId"
          value={templateId}
          options={Object.entries(TemplateId).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          onChange={(e) => setTemplateId(e.target.value as TemplateId)}
          required
        />
        <SelectField
          label="Select Gen Type"
          name="genType"
          value={genType}
          options={Object.entries(GenType).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          onChange={(e) => setGenType(e.target.value as GenType)}
          required
        />
        <SelectField
          label="Select Flow"
          name="flow"
          value={flow}
          options={Object.entries(Flow).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          onChange={(e) => setFlow(e.target.value as Flow)}
          required
        />
        <SelectField
          label="Select Style"
          name="style"
          value={style}
          options={Object.entries(Style).map(([key, value]) => ({
            value: key,
            label: value,
          }))}
          onChange={(e) => setStyle(e.target.value as Style)}
          required
        />
        <ImageUploadField
          label="Upload Image References"
          images={imageRefs}
          setImages={setImageRefs}
        />
        <InputField
          label="Enter Prompts"
          name="prompts"
          value={prompts}
          onChange={(e) => setPrompts(e.target.value)}
        />
        <NumberInputField
          label="Generates Per Ref"
          name="generatesPerRef"
          value={generatesPerRef}
          onChange={(e) => setGeneratesPerRef(Number(e.target.value))}
          min={1}
          required
        />
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

export default CreateImageLayerModal;
