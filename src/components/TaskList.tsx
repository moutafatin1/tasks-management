import { Task } from "./Task";

export const TaskList = () => {
  return (
    <div className="mt-5">
      <ul className="bg-gray-400 rounded-md p-3 space-y-4">
        <Task>Task 1</Task>
        <Task>Task 2</Task>
      </ul>
    </div>
  );
};
