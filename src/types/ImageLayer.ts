import { Dimension } from "./Dimension";
import { Flow } from "./Flow";
import { Style } from "./Style";

export interface ImageLayer {
  name: string;
  dimension: Dimension;
  flow: Flow;
  imageRefs: string[] | null;
  prompts: string[] | null;
  generatesPerRef: number;
  styles: Style;
}