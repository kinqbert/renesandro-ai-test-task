import { Dimension } from "./Dimension";
import { Flow } from "./Flow";
import { Style } from "./Style";

export interface ImageLayer {
  id: string;
  taskId: string;
  name: string;
  dimension: Dimension;
  flow: Flow;
  imageRefs: File[];
  prompts: string;
  generatesPerRef: number;
  style: Style;
}
