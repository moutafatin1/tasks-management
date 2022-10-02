import { Task } from ".";
import { TaskType } from "../pages/app";

type TasksListProps = {
  tasks: TaskType[];
};

export const TaskList = ({ tasks }: TasksListProps) => {
  return (
    <div className="mt-5">
      <ul className="bg-gray-300 rounded-xl p-6 space-y-4">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};
