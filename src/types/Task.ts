import { Dimension } from "./Dimension";
import { GenType } from "./GenType";
import { ImageLayer } from "./ImageLayer";
import { TemplateId } from "./TemplateId";

export interface Task {
  name: string;
  dimension: Dimension;
  genType: GenType;
  templateId: TemplateId;
  imageLayers: ImageLayer[];
}
