import clsx from "clsx";
import { HiPencil, HiTrash } from "react-icons/hi";
import { TaskType } from "../pages/app";
import IconButton from "./IconButton";

type TaskProps = {
  task: TaskType;
};

export const Task = ({ task }: TaskProps) => {
  return (
    <li className="bg-white p-4 rounded-md  flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={task.isCompleted}
          className="text-indigo-500 p-3 rounded-md transition-all duration-200 focus:ring-0"
        />
        <div className="flex flex-col">
          <span
            className={clsx(
              "font-semibold text-gray-600",
              task.isCompleted && "line-through text-gray-400"
            )}
          >
            {task.task}
          </span>
          <span className="text-sm text-gray-500">{task.createdAt}</span>
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <IconButton>
          <HiTrash className="text-gray-600" />
        </IconButton>
        <IconButton>
          <HiPencil className="text-gray-600" />
        </IconButton>
      </div>
    </li>
  );
};
