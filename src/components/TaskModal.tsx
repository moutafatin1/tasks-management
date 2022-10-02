import { BiTask } from "react-icons/bi";
import { HiX } from "react-icons/hi";
import { Button } from "./Button";

import InputField from "./Form/InputField";

type TaskModalProps = {
  setOpenModal: (openModal: boolean) => void;
};

const TaskModal = ({ setOpenModal }: TaskModalProps) => {
  return (
    <div className="absolute bg-black/50 inset-0 flex justify-center items-center ">
      <div className="bg-slate-100 p-5 rounded-md relative max-w-lg h-96 w-full  ">
        <button
          onClick={() => setOpenModal(false)}
          className="p-2 rounded-md bg-gray-300 absolute top-0 right-0 -translate-y-12 group transition-all hover:bg-red-500  "
        >
          <HiX className="text-2xl group-hover:text-gray-300" />
        </button>
        <p className="text-gray-600 font-bold text-xl">Add New Task</p>
        <form className="mt-3 w-full h-[90%] flex flex-col justify-between">
          <InputField
            label="Task"
            leftIcon={<BiTask />}
            placeholder="New task..."
          />
          <Button
            className="self-end 
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
