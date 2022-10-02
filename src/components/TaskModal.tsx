import { FormEvent, useState } from "react";
import { BiTask } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { Button } from "./Button";

import InputField from "./Form/InputField";

type TaskModalProps = {
  setOpenModal: (openModal: boolean) => void;
  addNewTask: (task: string) => void;
};

const TaskModal = ({ setOpenModal, addNewTask }: TaskModalProps) => {
  const [taskText, setTaskText] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewTask(taskText);
    setOpenModal(false);
  };
  return (
    <div className="absolute bg-black/50 inset-0 flex justify-center items-center ">
      <div className="bg-slate-100 p-5 rounded-md relative max-w-lg  w-full  ">
        <button
          onClick={() => setOpenModal(false)}
          className="p-2 rounded-md bg-gray-300 absolute top-0 right-0 -translate-y-12 group transition-all hover:bg-red-500  "
        >
          <HiX className="text-2xl group-hover:text-gray-300" />
        </button>
        <p className="text-gray-600 font-bold text-xl">Add New Task</p>
        <form
          onSubmit={onSubmit}
          className="mt-3 w-full  flex flex-col justify-between"
        >
          <InputField
            label="Task"
            leftIcon={<BiTask />}
            type="text"
            placeholder="New task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button
            className="self-end mt-3
          "
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
