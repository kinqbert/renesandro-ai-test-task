import { Task } from "../types/Task";

export function getResultLink(task: Task) {
  const { name, dimension } = task;

  return `https://testapi-jvqis72guq-lm.a.run.app/test_vidro/${name}_${dimension}/format_validation`;
}
