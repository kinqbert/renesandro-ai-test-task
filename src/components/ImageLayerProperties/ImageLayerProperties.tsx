import { useEffect, useState } from "react";
import { ImageLayer } from "../../types/ImageLayer";
import { Dimension } from "../../types/Dimension";
import { Flow } from "../../types/Flow";
import { Style } from "../../types/Style";

import SelectField from "../SelectField";
import InputField from "../InputField";
import NumberInputField from "../NumberInputField";

interface Props {
  imageLayer: ImageLayer;
  onImageLayerChange: (updatedLayer: ImageLayer) => void;
}

function ImageLayerProperties({ imageLayer, onImageLayerChange }: Props) {
  const [layerState, setLayerState] = useState(imageLayer);

  useEffect(() => {
    onImageLayerChange(layerState);
  }, [layerState, onImageLayerChange]);

  const handleChange = (field: keyof ImageLayer, value: unknown) => {
    setLayerState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="image-layer-props">
      <SelectField
        label="Select dimension"
        name="dimension"
        value={layerState.dimension}
        options={Object.entries(Dimension).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(e) => handleChange("dimension", e.target.value)}
        required={true}
      />
      <SelectField
        label="Select flow"
        name="flow"
        value={layerState.flow}
        options={Object.entries(Flow).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(e) => handleChange("flow", e.target.value)}
        required={true}
      />
      <InputField
        label="Enter prompts"
        name="prompts"
        value={layerState.prompts}
        onChange={(event) => handleChange("prompts", event.target.value)}
      />

      <NumberInputField
        label="Amount of generates"
        name="generatesPerRef"
        value={layerState.generatesPerRef}
        onChange={(event) =>
          handleChange("generatesPerRef", event.target.value)
        }
        required={true}
      />

      <SelectField
        label="Select style"
        name="style"
        value={layerState.style}
        options={Object.entries(Style).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(event) => handleChange("style", event.target.value as Style)}
      />
    </div>
  );
}

export default ImageLayerProperties;
