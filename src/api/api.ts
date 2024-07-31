import { ImageLayer } from "../types/ImageLayer";
import { Task } from "../types/Task";

import apiClient from "./apiClient";

export async function generateImages(imageLayer: ImageLayer): Promise<string> {
  const body = {
    dimension: imageLayer.dimension,
    style: imageLayer.style,
    manual_prompts: imageLayer.prompts,
    gen_per_ref: imageLayer.generatesPerRef,
    flow: imageLayer.flow,
    images: imageLayer.imageRefs
  }

  try {
    const response = await apiClient.post('/generate_images', body);

    return response.data;
  } catch (error) {
    console.error('Error generating images:', error);
    throw error;
  }
}

export async function generateFormats(task: Task): Promise<string> {
  const body = {
    task_name: task.name,
    dimension: task.dimension,
    template_id: task.templateId,
    amount: task.amount,
    gen_type: task.genType,
    image_layers: task.imageLayers,
    text_layers: task.textLayers,
  }

  try {
    const response = await apiClient.post('/generate_formats', body);

    return response.data;
  } catch (error) {
    console.error("Error generating formats", error);
    throw error;
  }
}
