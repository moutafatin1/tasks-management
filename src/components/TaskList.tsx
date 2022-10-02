import { Task } from ".";
import { TaskAction, TaskType } from "../pages/app";

type TasksListProps = {
  tasks: TaskType[];
} & TaskAction;

export const TaskList = ({ tasks, actions }: TasksListProps) => {
  return (
    <div className="mt-5">
      <ul className="bg-gray-300 rounded-xl p-6 space-y-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} actions={actions} />
        ))}
      </ul>
    </div>
  );
};
