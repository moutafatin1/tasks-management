import { Dispatch, SetStateAction } from "react";
import { BiTask } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { ModalType } from "../pages/app";
import { Button } from "./Button";

import InputField from "./Form/InputField";

type TaskModalProps = {
  setOpenModal: Dispatch<SetStateAction<ModalType>>;
  addNewTask: () => void;
  view: "update" | "create";
  taskText: string;
  setTaskText: Dispatch<SetStateAction<string>>;
  updateTask: () => void;
};

const TaskModal = ({
  setOpenModal,
  addNewTask,
  taskText,
  setTaskText,
  updateTask,
  view,
}: TaskModalProps) => {
  console.log("🚀 ~ file: TaskModal.tsx ~ line 23 ~ taskText", taskText);

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
              onClick={addNewTask}
            >
              Add
            </Button>
          )}
          {view === "update" && (
            <Button
              className="self-end mt-3
          "
              onClick={updateTask}
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
