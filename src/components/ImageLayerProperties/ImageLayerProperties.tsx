import { useEffect, useState } from "react";
import { ImageLayer } from "../../types/ImageLayer";
import { Dimension } from "../../types/Dimension";
import { Flow } from "../../types/Flow";
import { Style } from "../../types/Style";

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
      <div className="image-layer-props__property">
        <label className="image-layer-props__input-title">
          Select dimension
        </label>
        <select
          className="image-layer-props__input-field"
          name="dimension"
          value={layerState.dimension}
          onChange={(event) =>
            handleChange("dimension", event.target.value as Dimension)
          }
        >
          {Object.entries(Dimension).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="image-layer-props__property">
        <label className="image-layer-props__input-title">Select flow</label>
        <select
          className="image-layer-props__input-field"
          name="flow"
          value={layerState.flow}
          onChange={(event) => handleChange("flow", event.target.value as Flow)}
        >
          {Object.entries(Flow).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="image-layer-props__property">
        <label className="image-layer-props__input-title">Enter prompts</label>
        <input
          name="prompts"
          className="image-layer-props__input-field"
          type="text"
          value={layerState.prompts}
          onChange={(event) => handleChange("prompts", event.target.value)}
        />
      </div>
      <div className="image-layer-props__property">
        <label className="image-layer-props__input-title">
          Amount of generates
        </label>
        <input
          name="generatesPerRef"
          className="image-layer-props__input-field"
          type="number"
          value={layerState.generatesPerRef}
          onChange={(event) =>
            handleChange("generatesPerRef", Number(event.target.value))
          }
          required
        />
      </div>
      <div className="image-layer-props__property">
        <label className="image-layer-props__input-title">Select style</label>
        <select
          className="image-layer-props__input-field"
          name="style"
          value={layerState.style}
          onChange={(event) =>
            handleChange("style", event.target.value as Style)
          }
        >
          {Object.entries(Style).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ImageLayerProperties;
