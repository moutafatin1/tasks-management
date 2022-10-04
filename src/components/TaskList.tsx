import { Dispatch, SetStateAction } from "react";
import { Task } from ".";
import { ModalType, TaskType } from "../pages/app";
import { Action } from "../utils";

type TasksListProps = {
  tasks: TaskType[];
  setOpenModal: Dispatch<SetStateAction<ModalType>>;
  dispatch: Dispatch<Action>;
};

export const TaskList = ({ tasks, dispatch,setOpenModal }: TasksListProps) => {
  return (
    <div className="mt-5">
      {tasks.length == 0 ? (
        <p className="text-center font-bold text-3xl text-red-500">No Tasks </p>
      ) : (
        <ul className="bg-gray-300 rounded-xl p-6 space-y-4">
          {tasks.map((task) => (
            <Task key={task.id} task={task} dispatch={dispatch} setOpenModal={setOpenModal} />
          ))}
        </ul>
      )}
    </div>
  );
};
