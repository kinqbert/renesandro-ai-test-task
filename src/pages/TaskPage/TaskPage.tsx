import { Link, useParams } from "react-router-dom";
import { useTasksStore } from "../../store/tasksStore";
import { useCallback, useEffect, useState } from "react";
import { Task } from "../../types/Task";
import Accordion from "../../components/Accordion/Accordion";
import ImageLayerProperties from "../../components/ImageLayerProperties";
import CreateImageLayerModal from "../../components/CreateImageLayerModal";
import Breadcrumbs from "../../components/Breadcrumbs";
import Button from "../../components/Button";
import "./TaskPage.scss";
import { ImageLayer } from "../../types/ImageLayer";

function TaskPage() {
  const { taskId } = useParams();
  const { getTaskById, updateImageLayer, getImageLayersOfTask } =
    useTasksStore();

  const [creatingImageLayer, setCreatingImageLayer] = useState(false);
  const [task, setTask] = useState<Task>();
  const [imageLayers, setImageLayers] = useState<ImageLayer[]>();

  useEffect(() => {
    if (taskId) {
      const task = getTaskById(taskId);
      if (task) {
        setTask(task);
        setImageLayers(getImageLayersOfTask(taskId));
      }
    }
  }, [taskId, getTaskById, getImageLayersOfTask, creatingImageLayer]);

  const onImageLayerChange = useCallback((imageLayerState: ImageLayer) => {
    updateImageLayer(imageLayerState.name, imageLayerState);
  }, [updateImageLayer]);

  const handleCreateNewImageLayer = () => {
    setCreatingImageLayer(true);
  };

  if (!task) {
    return <h1>This task doesn't seem to exist...</h1>;
  }

  const breadcrumbsItems = [
    <Link to="..">Home page</Link>,
    <span>{task.name}</span>,
  ];

  return (
    <div className="task-page">
      <div className="task-page__container">
        <Breadcrumbs items={breadcrumbsItems} />
        <div className="task-page__content">
          <h2 className="task-page__title">{task.name}</h2>
          <div className="task-page__section">
            <div className="task-page__section-header">
              <h3 className="task-page__section-title">Image layers</h3>
              <Button
                buttonText="Create new image layer"
                onClick={handleCreateNewImageLayer}
                variant="filled"
              />
            </div>
            <div className="task-page__layers-wrapper">
              {imageLayers?.map((imageLayer, index) => {
                return (
                  <Accordion
                    key={imageLayer.name}
                    title={imageLayer.name}
                    isLast={index === imageLayers.length - 1}
                    item={
                      <ImageLayerProperties
                        imageLayer={imageLayer}
                        onImageLayerChange={onImageLayerChange}
                      />
                    }
                  />
                );
              })}
            </div>
            {creatingImageLayer && (
              <CreateImageLayerModal
                taskId={task.id}
                setCreatingImageLayer={setCreatingImageLayer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
