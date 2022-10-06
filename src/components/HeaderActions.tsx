import { Dispatch, SetStateAction } from "react";
import { Button } from ".";
import { ModalType } from "../pages/app";

type HeaderActionsProps = {
  setOpenModal: Dispatch<SetStateAction<ModalType>>;
  setIsKanban: Dispatch<SetStateAction<boolean>>;
  isKanban: boolean;
  openModal: boolean;
};

const HeaderActions = ({
  setOpenModal,
  openModal,
  setIsKanban,
  isKanban,
}: HeaderActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <Button onClick={() => setOpenModal({ isOpen: true, view: "create" })}>
        Add Task
      </Button>
      {/* <select
        name=""
        id=""
        className="border-none py-3 bg-indigo-500 text-slate-50 font-semibold rounded-md cursor-pointer hover:bg-indigo-600 focus:ring-indigo-500"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select> */}
      <Button
        className="bg-pink-600 hover:bg-pink-700"
        onClick={() => setIsKanban(!isKanban)}
      >
        {isKanban ? "Default" : "Kanban"}
      </Button>
    </div>
  );
};

export default HeaderActions;
