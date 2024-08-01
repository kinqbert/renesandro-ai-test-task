import { Dimension } from "./Dimension";
import { GenType } from "./GenType";
import { TemplateId } from "./TemplateId";

export interface Task {
  id: string;
  name: string;
  dimension: Dimension;
  amount: number;
  genType: GenType;
  templateId: TemplateId;
  imageLayers: string[];
  textLayers: string[];
}