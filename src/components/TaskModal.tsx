import { Dispatch, SetStateAction, useState } from "react";
import { BiTask } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { ModalType, TaskType } from "../pages/app";
import { Action, ActionKind } from "../utils";
import { Button } from "./Button";

import InputField from "./Form/InputField";

type TaskModalProps = {
  setOpenModal: Dispatch<SetStateAction<ModalType>>;
  dispatch: Dispatch<Action>;
  view: "update" | "create";
  taskToUpdate?: TaskType;
};

const TaskModal = ({
  setOpenModal,
  dispatch,
  view,
  taskToUpdate,
}: TaskModalProps) => {
  const [taskText, setTaskText] = useState(
    view === "update" && taskToUpdate ? taskToUpdate.task : ""
  );

  return (
    <div className="absolute bg-black/50 inset-0 flex justify-center items-center ">
      <div className="bg-slate-100 p-5 rounded-md relative max-w-lg  w-full  ">
        <button
          onClick={() => setOpenModal({ isOpen: false, view: "create" })}
          className="p-2 rounded-md bg-gray-300 absolute top-0 right-0 -translate-y-12 group transition-all hover:bg-red-500  "
        >
          <HiX className="text-2xl group-hover:text-gray-300" />
        </button>
        <p className="text-gray-600 font-bold text-xl">
          {view == "create" ? "Add New Task" : "Update Task"}
        </p>
        <div className="mt-3 w-full  flex flex-col justify-between">
          <InputField
            label="Task"
            leftIcon={<BiTask />}
            type="text"
            placeholder="New task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          {view === "create" && (
            <Button
              className="self-end mt-3
          "
              onClick={() => {
                dispatch({ type: ActionKind.ADD, payload: { task: taskText } });
                setOpenModal({ isOpen: false, view: "create" });
              }}
            >
              Add
            </Button>
          )}
          {view === "update" && (
            <Button
              className="self-end mt-3
          "
              onClick={() => {
                dispatch({
                  type: ActionKind.UPDATE,
                  payload: {
                    id: taskToUpdate?.id,
                    task: taskText,
                  },
                });
                setOpenModal((prevState) => ({ ...prevState, isOpen: false }));
              }}
            >
              Update
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
