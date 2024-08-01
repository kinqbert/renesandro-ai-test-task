import { useEffect, useState } from "react";
import { ImageLayer } from "../../types/ImageLayer";
import { Dimension } from "../../types/Dimension";
import { Flow } from "../../types/Flow";
import { Style } from "../../types/Style";

import SelectField from "../SelectField";
import InputField from "../InputField";
import NumberInputField from "../NumberInputField";
import ImageUploadField from "../ImageUploadField";
import Button from "../Button";

import { generateImages } from "../../api/api";

import './ImageLayerProperties.scss';

interface Props {
  imageLayer: ImageLayer;
  onImageLayerChange: (updatedLayer: ImageLayer) => void;
}

function ImageLayerProperties({ imageLayer, onImageLayerChange }: Props) {  
  const [dimension, setDimension] = useState<Dimension>(imageLayer.dimension);
  const [flow, setFlow] = useState<Flow>(imageLayer.flow);
  const [imageRefs, setImageRefs] = useState<string[]>(imageLayer.imageRefs);
  const [prompts, setPrompts] = useState(imageLayer.prompts);
  const [generatesPerRef, setGeneratesPerRef] = useState(
    imageLayer.generatesPerRef
  );
  const [style, setStyle] = useState<Style>(imageLayer.style);

  useEffect(() => {
    onImageLayerChange({
      ...imageLayer,
      dimension,
      flow,
      prompts,
      generatesPerRef,
      style,
    });
  }, [
    dimension,
    flow,
    prompts,
    generatesPerRef,
    style,
    onImageLayerChange,
    imageLayer,
  ]);

  const handleGenerateClick = (imageLayer: ImageLayer) => {
    generateImages(imageLayer).then((response) => console.log(response));
  };

  return (
    <div className="image-layer-props">
      <SelectField
        label="Select dimension"
        name="dimension"
        value={dimension}
        options={Object.entries(Dimension).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(e) => setDimension(e.target.value as Dimension)}
        required={true}
      />
      <SelectField
        label="Select flow"
        name="flow"
        value={flow}
        options={Object.entries(Flow).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(e) => setFlow(e.target.value as Flow)}
        required={true}
      />

      <ImageUploadField
        label="Image refs"
        images={imageRefs}
        setImages={setImageRefs}
      />

      <InputField
        label="Enter prompts"
        name="prompts"
        value={prompts}
        onChange={(event) => setPrompts(event.target.value)}
      />

      <NumberInputField
        label="Amount of generates"
        name="generatesPerRef"
        value={generatesPerRef}
        min={1}
        onChange={(event) => setGeneratesPerRef(Number(event.target.value))}
        required={true}
      />

      <SelectField
        label="Select style"
        name="style"
        value={style}
        options={Object.entries(Style).map(([key, value]) => ({
          value: key,
          label: value,
        }))}
        onChange={(event) => setStyle(event.target.value as Style)}
      />

      <Button buttonText="Generate" onClick={() => handleGenerateClick(imageLayer)} variant="filled"/>
    </div>
  );
}

export default ImageLayerProperties;
