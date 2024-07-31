import { Link, useParams } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";
import { useEffect, useState } from "react";
import { Task } from "../../types/Task";
import Accordion from "../../components/Accordion/Accordion";
import ImageLayerProperties from "../../components/ImageLayerProperties";
import { ImageLayer } from "../../types/ImageLayer";
import CreateImageLayerModal from "../../components/CreateImageLayerModal";

function TaskPage() {
  const { taskId } = useParams();
  const { getTaskById, updateImageLayer, getImageLayersOfTask } =
    useTasksStore();

  const [creatingImageLayer, setCreatingImageLayer] = useState(false);

  const [task, setTask] = useState<Task>();
  const [imageLayers, setImageLayers] = useState<ImageLayer[] | undefined>();

  useEffect(() => {
    if (taskId) {
      const task = getTaskById(taskId);
      if (task) {
        setTask(task);
      }

      setImageLayers(getImageLayersOfTask(taskId));
    }
  }, [taskId, getTaskById, getImageLayersOfTask, creatingImageLayer]);

  const onImageLayerChange = (ImageLayerState: ImageLayer) => {
    updateImageLayer(ImageLayerState.name, ImageLayerState);
  };

  const handleCreateNewImageLayer = () => {
    setCreatingImageLayer(true);
  };

  if (!task) {
    return <h1>This task doesn't seem to exist...</h1>;
  }

  return (
    <>
      <Link to="..">Home page</Link>
      <h1>This is a task page for {task?.name}</h1>
      <h2>Image layers:</h2>
      <button onClick={handleCreateNewImageLayer}>
        Create new image layer
      </button>
      {imageLayers?.map((imageLayer) => (
        <Accordion
          key={imageLayer.name}
          title={imageLayer.name}
          item={
            <ImageLayerProperties
              imageLayer={imageLayer}
              onImageLayerChange={onImageLayerChange}
            />
          }
        />
      ))}
      {creatingImageLayer && (
        <CreateImageLayerModal
          taskId={task.id}
          setCreatingImageLayer={setCreatingImageLayer}
        />
      )}
    </>
  );
}

export default TaskPage;
